import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from "recoil";

import { sessionStore, themeStore } from '../stores';
import { DEFAULT_THEME_KEY, storeTheme, ThemeOptions } from "../lib/theme";
import Avatar from "./settings/Avatar";
import BrandLogo from './icons/BrandLogo';
import DarkMode from './icons/DarkMode';
import Hamburger from './icons/Hamburger';
import LightMode from './icons/LightMode';

const Header = () => {
  const navigate = useNavigate();
  const session = useRecoilValue(sessionStore);
  const [theme, setTheme] = useRecoilState(themeStore);

  const handleUpdateTheme = () => {
    localStorage.setItem(DEFAULT_THEME_KEY, "false");
    const newTheme = Object.values(ThemeOptions).filter(
      (val) => val !== theme.selectedTheme
    )[0];
    setTheme({
      selectedTheme: newTheme,
      useDefault: false,
    });
    storeTheme(newTheme);
  };

  return (
    <header className="navbar flex bg-base-100 pt-4">
      <div className="lg:hidden">
        {session.authed ? (
          <label
            htmlFor="sidebar-nav"
            className="drawer-button cursor-pointer -translate-x-2"
          >
            <Hamburger />
          </label>
        ) : (
          <div
            className="flex items-center cursor-pointer gap-3"
            onClick={() => navigate("/")}
          >
            <BrandLogo />
          </div>
        )}
      </div>

      {/* Even if the user is not authed, render this header in the connection flow */}
      {!session.authed && (
        <div
          className="hidden lg:flex flex-1 items-center cursor-pointer gap-3"
          onClick={() => navigate("/")}
        >
          <BrandLogo />
        </div>
      )}

      <div className="ml-auto">
        {session.authed && (
          <Link to="/settings/" className="ml-2 cursor-pointer">
            <Avatar size="small" />
          </Link>
        )}

        <span className="ml-2 cursor-pointer">
          <span onClick={handleUpdateTheme}>
            {theme.selectedTheme === ThemeOptions.LIGHT ? <LightMode /> : <DarkMode />}
          </span>
        </span>
      </div>
    </header>
  );
};

export default Header;
