import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import initialize from './lib/session';
import { themeStore } from './stores';
import About from './routes/AboutRoute';
import Header from './components/Header';
import Notifications from './components/notifications/Notifications';
import Footer from './components/Footer';
import Home from './routes/HomeRoute';
import Gallery from './routes/gallery/GalleryRoute';
import Settings from './routes/SettingsRoute';
import NotFound from './routes/NotFoundRoute';
import SidebarNav from './components/nav/SidebarNav';

let appInitialized = false;

const App = () => {
  const theme = useRecoilValue(themeStore);

  const useMountEffect = () =>
    useEffect(() => {
      if (!appInitialized) {
        initialize();
        appInitialized = true;
      }
    }, []);

  useMountEffect()

  return (
    <div data-theme={theme.selectedTheme} className="App min-h-screen">
      <Router>
        <Notifications />

        <SidebarNav>
          <Header />

          <div className="px-4">
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </SidebarNav>

        <Footer />
      </Router>
    </div>
  );
};

export default App;
