import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { trackPageView } from '@/lib/pixel';

export type RoutePath = '/' | '/services' | '/about' | '/contact' | '/reviews' | '/blog';

type RouterContextType = {
  path: RoutePath;
  navigate: (to: RoutePath) => void;
};

const RouterContext = createContext<RouterContextType>({
  path: '/',
  navigate: () => {},
});

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState<RoutePath>(() => {
    const p = window.location.pathname as RoutePath;
    return p === '/services' || p === '/about' || p === '/contact' || p === '/reviews' || p === '/blog' ? p : '/';
  });

  useEffect(() => {
    trackPageView();
  }, [path]);

  useEffect(() => {
    const onPop = () => {
      const nextPath = window.location.pathname as RoutePath;
      setPath(nextPath === '/services' || nextPath === '/about' || nextPath === '/contact' || nextPath === '/reviews' || nextPath === '/blog' ? nextPath : '/');
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (to: RoutePath) => {
    if (to !== window.location.pathname) {
      window.history.pushState({}, '', to);
      setPath(to);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  return useContext(RouterContext);
}
