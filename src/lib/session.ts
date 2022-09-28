import * as walletauth from "webnative-walletauth";
import { AppScenario, leave, setup } from "webnative";
import { filesystemStore, sessionStore } from "../stores";
import { addNotification } from "../lib/notifications";
import { getRecoil, setRecoil } from "recoil-nexus";

export type SESSION = {
  address: string;
  authed: boolean;
  loading: boolean;
  error: boolean;
};

// TODO: Add a flag or script to turn debugging on/off
setup.debug({ enabled: false });

export const initialize = async (): Promise<void> => {
  const session = getRecoil(sessionStore);

  try {
    setRecoil(sessionStore, {
      ...session,
      loading: true,
    });

    // Point to staging instance
    walletauth.setup.debug({ enabled: true });
    walletauth.setup.endpoints({
      api: "https://runfission.net",
      lobby: "https://auth.runfission.net",
      user: "fissionuser.net",
    });

    // Get the initial WNFS appState
    const initialAppState = await walletauth.app({
      onAccountChange: (newAppState) => handleAppState(newAppState),
      onDisconnect: () => disconnect(),
    });

    // Populate session and filesystem stores
    handleAppState(initialAppState);
  } catch (error) {
    console.error(error);
    setRecoil(sessionStore, {
      ...session,
      loading: false,
      error: true,
    });

    addNotification({
      msg: error.message,
      type: "error",
    });
  }
};

/**
 * Handle updates to the WNFS appState by setting the session and filesystem stores
 * @param appState
 */
const handleAppState = (appState) => {
  // Update FS store
  setRecoil(filesystemStore, appState.fs);
  const session = getRecoil(sessionStore);

  switch (appState.scenario) {
    case AppScenario.Authed:
      // ✅ Authenticated
      setRecoil(sessionStore, {
        ...session,
        address: appState.username,
        authed: true,
        loading: false,
      });

      addNotification({
        msg: "Wallet connected. You can now access your Webnative File System.",
      });
      break;

    case AppScenario.NotAuthed:
      // Failed to authenticate with wallet
      setRecoil(sessionStore, {
        ...session,
        address: null,
        authed: false,
        error: true,
        loading: false,
      });
      break;
  }
};

/**
 * Disconnect the user from their webnative session, reset the sessionStore and go to homepage
 */
export const disconnect: () => Promise<void> = async () => {
  await leave({ withoutRedirect: true });

  const session = getRecoil(sessionStore);

  setRecoil(sessionStore, {
    ...session,
    address: null,
    authed: false,
    loading: false,
    error: false,
  });
};

/**
 * Copy the user's address to the clipboard
 */
export const copyAddressToClipboard: () => Promise<void> = async () => {
  try {
    const session = getRecoil(sessionStore);
    await navigator.clipboard.writeText(session.address);
    addNotification({
      msg: "Address copied to clipboard",
    });
  } catch (error) {
    console.error(error);
    addNotification({
      msg: "Failed to copy address to clipboard",
      type: "error",
    });
  }
};

export default initialize;

