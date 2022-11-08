import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { sessionStore } from "../stores";
import { copyAddressToClipboard, disconnect } from "../lib/session";
import AvatarUpload from "../components/settings/AvatarUpload";
import ThemePreferences from "../components/settings/ThemePreferences";

const SettingsRoute = () => {
  const session = useRecoilValue(sessionStore)

  if (!session.authed) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-[calc(100vh-128px)] md:min-h-[calc(100vh-160px)] pt-8 md:pt-16 flex flex-col items-start max-w-[690px] m-auto gap-10 pb-5 text-sm">
      <h1 className="text-xl">Account Settings</h1>

      <div className="flex flex-col items-start justify-center gap-6">
        <div>
          <AvatarUpload />
        </div>

        <div>
          <h3 className="text-lg mb-4">Address</h3>
          <p
            className="cursor-pointer transition-colors hover:text-orange-300"
            onClick={copyAddressToClipboard}
          >
            {session.address}
          </p>
        </div>

        <div>
          <ThemePreferences />
        </div>

        <div>
          <h3 className="text-lg mb-4">Disconnect Account</h3>
          <button className="btn btn-primary" onClick={disconnect}>
            Disconnect
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsRoute;
