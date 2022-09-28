import { useNavigate } from 'react-router-dom';
import { useRecoilState } from "recoil";

import { themeStore } from '../stores';
import { THEME } from '../lib/theme';
import { appName } from '../lib/app-info';
import Brand from './icons/Brand';
import DarkMode from './icons/DarkMode';
import LightMode from './icons/LightMode';
import Connect from "./auth/connect/Connect";

const Header = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useRecoilState(themeStore);

  const handleUpdateTheme = () => {
    const newTheme = Object.values(THEME).filter((val) => val !== theme)[0];
    setTheme(newTheme);
  }

  return (
    <header className="navbar bg-base-100 pt-0">
      <div className="flex-1 cursor-pointer hover:underline" onClick={() => navigate('/')}>
        <Brand />
        <span className="text-xl ml-2">{appName}</span>
      </div>

      <div className="flex-none">
        <Connect />
      </div>

      <span className="ml-2">
        <span onClick={handleUpdateTheme}>
          {theme === THEME.LIGHT ? <LightMode /> : <DarkMode />}
        </span>
      </span>
    </header>
  );
};

export default Header;
