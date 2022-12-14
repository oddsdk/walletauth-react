import { useRecoilValue } from 'recoil'

import { sessionStore } from '../../stores'
import { copyAddressToClipboard, } from '../../lib/session'
import ClipboardIcon from '../icons/ClipboardIcon'

const Address = () => {
  const session = useRecoilValue(sessionStore)

  return (
    <div>
      <h3 className="text-lg mb-4">Address</h3>
      <div className="flex items-center">
        <p>{session.address}</p>
        <button
          className="pl-2 hover:text-neutral-500 transition-colors"
          onClick={copyAddressToClipboard}
        >
          <ClipboardIcon />
        </button>
      </div>
    </div>
  );
}

export default Address
