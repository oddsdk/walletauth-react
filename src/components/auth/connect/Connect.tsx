import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { disconnect, copyAddressToClipboard, initialize } from '../../../lib/session'
import { sessionStore } from '../../../stores'
import ConnectIcon from '../../icons/Connect'

const Connect = () => {
  const navigate = useNavigate();
  const session = useRecoilValue(sessionStore);

  const handleDisconnect: () => Promise<void> = async () => {
    await disconnect();
    navigate('/');
  }

  if (session.authed) {
    return (
      <div className="dropdown dropdown-end">
        <label
          tabIndex={0}
          htmlFor="connectDropdown"
          className="m-1 hidden md:flex w-max max-w-[150px] cursor-pointer justify-between items-center rounded-full border dark:text-gray-50 dark:border-gray-50 border-slate-900 bg-gray-50 dark:bg-slate-900 hover:text-gray-50 hover:bg-slate-900 dark:hover:text-slate-900 dark:hover:bg-gray-50 transition-colors duration-250ms ease-in-out group text-sm py-2 pr-2 pl-3"
        >
          <span className="overflow-hidden text-ellipsis w-full inline-block">
            {session?.address}
          </span>
        </label>
        <ul
          tabIndex={0}
          id="connectDropdown"
          className="dropdown-content card card-bordered border-gray-900 dark:border-gray-50 menu p-2 shadow bg-base-100 rounded-box text-sm w-[150px]"
        >
          <li>
            <button
              onClick={copyAddressToClipboard}
              className="inline-block text-right"
            >
              Copy Address
            </button>
          </li>
          <li>
            <button
              onClick={handleDisconnect}
              className="inline-block text-right"
            >
              Disconnect
            </button>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <button
      className="btn btn-primary !btn-lg !h-10 gap-2"
      onClick={initialize}
    >
      <ConnectIcon /> Connect this device
    </button>
  );
};

export default Connect;
