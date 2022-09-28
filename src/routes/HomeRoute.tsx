import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";

import { appName } from '../lib/app-info';
import { copyAddressToClipboard } from "../lib/session";
import { sessionStore } from '../stores';

const HomeRoute = () => {
  const session = useRecoilValue(sessionStore);

  return (
    <>
      <div className="grid grid-flow-row auto-rows-max gap-5 justify-items-center py-4">
        <h1 className="text-2xl">Welcome to {appName}!</h1>

        {session?.authed && (
          <>
            <div className="card card-bordered w-96 dark:border-slate-600">
              <div className="card-body text-left">
                <h2 className="card-title">👋 Account</h2>
                <p>
                  Your address is:
                  <span
                    onClick={copyAddressToClipboard}
                    className="inline-block px-2 mt-2 cursor-pointer font-mono bg-slate-300 dark:bg-slate-700 rounded-md overflow-hidden text-ellipsis w-[calc(100%-20px)]"
                  >
                    {session.address}
                  </span>
                </p>
              </div>
            </div>

            <div className="card w-96 card-bordered dark:border-slate-600">
              <div className="card-body text-left">
                <h2 className="card-title">📷 Photo Gallery Demo</h2>
                <p>
                  Try out the Webnative File System by storing your photos in
                  public and private storage.
                </p>
                <div className="card-actions justify-center">
                  <Link to="/gallery" className="btn btn-primary">
                    Go to Photos
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="card card-bordered w-96 dark:border-slate-600">
          <div className="card-body text-left">
            <h2 className="card-title">About</h2>
            <p>
              This app is a template for building apps with the
              <a
                className="link link-primary whitespace-nowrap px-1"
                href="https://github.com/fission-codes/webnative"
                target="_blank"
                rel="noreferrer"
              >
                Webnative SDK
                <span className="-scale-x-100 scale-y-100 inline-block px-1">
                  ⎋
                </span>
              </a>
            </p>
            <p>
              Get started
              <a
                className="link link-primary pl-1"
                href="https://github.com/webnative-examples/walletauth"
                target="_blank"
                rel="noreferrer"
              >
                using this template
                <span className="-scale-x-100 scale-y-100 inline-block px-1">
                  ⎋
                </span>
              </a>
              and learn more in the
              <a
                className="link link-primary pl-1"
                href="https://guide.fission.codes/developers/webnative"
                target="_blank"
                rel="noreferrer"
              >
                Webnative Guide
                <span className="-scale-x-100 scale-y-100 inline-block px-1">
                  ⎋
                </span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeRoute;
