import React, { useState, useEffect } from 'react';
import Home from '../pages/Home';
import Signature from '../pages/Signature';
import History from '../pages/History';
import Settings from '../pages/Settings';
import About from '../pages/About';

export type RouteKey = 'home' | 'signature' | 'history' | 'settings' | 'about';

export const routeComponents: Record<RouteKey, React.ComponentType> = {
  home: Home,
  signature: Signature,
  history: History,
  settings: Settings,
  about: About,
};

export function getRouteFromHash(): RouteKey {
  const hash = window.location.hash.replace('#', '').toLowerCase();
  if (!hash || hash === '' || hash === '/') return 'home';
  if (Object.keys(routeComponents).includes(hash)) return hash as RouteKey;
  return 'home';
}

export function useRoute(): [RouteKey, (key: RouteKey) => void] {
  const [route, setRoute] = useState<RouteKey>(getRouteFromHash());

  useEffect(() => {
    const onHashChange = () => setRoute(getRouteFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (key: RouteKey) => {
    window.location.hash = key;
    setRoute(key);
  };

  return [route, navigate];
}

export function RenderRoute({ route }: { route: RouteKey }) {
  const Page = routeComponents[route] || Home;
  return <Page />;
}
