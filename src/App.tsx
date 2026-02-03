
import { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import AppBar from './components/AppBar';
import Home from './pages/Home';
import Signature from './pages/Signature';
import History from './pages/History';
import Settings from './pages/Settings';
import About from './pages/About';


function getRoute() {
  const hash = window.location.hash.replace('#', '').toLowerCase();
  if (!hash || hash === '' || hash === '/') return 'home';
  return hash;
}

export default function App() {
  const [route, setRoute] = useState(getRoute());
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleNavigate = (key: string) => {
    window.location.hash = key;
    setRoute(key);
  };

  let Page;
  switch (route) {
    case 'signature':
      Page = Signature;
      break;
    case 'history':
      Page = History;
      break;
    case 'settings':
      Page = Settings;
      break;
    case 'about':
      Page = About;
      break;
    case 'home':
    default:
      Page = Home;
      break;
  }

  return (
    <div className="dashboard-layout">
      <Sidebar current={route} onNavigate={handleNavigate} open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="dashboard-main">
        <AppBar onSidebarOpen={() => setSidebarOpen(true)} />
        <div className="dashboard-content">
          <Page />
        </div>
      </div>
    </div>
  );
}