import * as wn from "webnative";
import * as walletauth from "webnative-walletauth";

import { filesystemStore, sessionStore } from "../stores";
import { ACCOUNT_SETTINGS_DIR } from "../lib/account-settings";
import { addNotification } from "../lib/notifications";
import { initializeFilesystem } from "../routes/gallery/lib/gallery";
import { getRecoil, setRecoil } from "recoil-nexus";

export type SESSION = {
  address: string;
  authed: boolean;
  loading: boolean;
  error: boolean;
};

export const initialize = async (): Promise<void> => {
  const session = getRecoil(sessionStore);

  try {
    setRecoil(sessionStore, {
      ...session,
      loading: true,
    });

    // Get the initial WNFS appState
    const program = await walletauth.program({
      namespace: { creator: "Fission", name: "Walletauth Template" },

      onAccountChange: (p) => handleProgram(p),
      onDisconnect: () => disconnect(),
    });

    // Populate session and filesystem stores
    handleProgram(program);
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
const handleProgram = async (program: wn.Program) => {
  // Update FS store
  setRecoil(filesystemStore, program.session?.fs);

  // Create directories for the gallery
  await initializeFilesystem(program.session?.fs);

  const session = getRecoil(sessionStore);

  if (program.session) {
    // Create directory for Account Settings
    await program.session.fs.mkdir(wn.path.directory(...ACCOUNT_SETTINGS_DIR));

    // ✅ Authenticated
    setRecoil(sessionStore, {
      ...session,
      address: program.session.username,
      authed: true,
      loading: false,
    });

    addNotification({
      msg: "Wallet connected. You can now access your Webnative File System.",
    })
  } else {
    // Failed to authenticate with wallet
    setRecoil(sessionStore, {
      ...session,
      address: null,
      authed: false,
      error: true,
      loading: false,
    });
  }
}

/**
 * Disconnect the user from their webnative session, reset the sessionStore and go to homepage
 */
export const disconnect: () => Promise<void> = async () => {
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
