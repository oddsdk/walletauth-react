import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useRecoilValue } from 'recoil';

import initialize from "./lib/session";
import { themeStore } from './stores';
import Header from './components/Header';
import Notifications from './components/notifications/Notifications';
import Home from './routes/HomeRoute';
import Gallery from './routes/gallery/GalleryRoute';

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
    <div data-theme={theme} className="App min-h-screen">
      <Router>
        <Header />
        <Notifications />

        <Routes>
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
