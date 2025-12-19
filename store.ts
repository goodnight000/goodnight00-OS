
import { useState, useCallback, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { WindowId, WindowState, WindowChromeStyle } from './types';
import { APPS } from './constants';

export function useWindowManager() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [focusedId, setFocusedId] = useState<WindowId | null>(null);
  const [zCounter, setZCounter] = useState(10);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const hasAutoOpened = useRef(false);

  const focusWindow = useCallback((id: WindowId) => {
    setFocusedId(id);
    setZCounter(prev => {
      const newZ = prev + 1;
      setWindows(currentWindows => currentWindows.map(w =>
        w.id === id ? { ...w, zIndex: newZ, minimized: false, lastFocusedAt: Date.now() } : w
      ));
      return newZ;
    });
  }, []);

  const openWindow = useCallback((route: string) => {
    const app = APPS.find(a => a.route === route);
    if (!app) return;

    setWindows(prev => {
      const existing = prev.find(w => w.route === route);
      if (existing) {
        setTimeout(() => setFocusedId(existing.id), 0);
        return prev;
      }

      const newId = `${app.id}-${Math.random().toString(36).substr(2, 9)}`;
      const newWindow: WindowState = {
        id: newId,
        route: app.route,
        title: app.title,
        iconKey: app.icon,
        position: {
          x: 100 + (prev.length * 30),
          y: 100 + (prev.length * 30)
        },
        size: app.defaultSize || { w: 600, h: 400 },
        zIndex: zCounter + 1,
        minimized: false,
        maximized: false,
        lastFocusedAt: Date.now(),
        chromeStyle: app.chromeStyle,
      };

      setZCounter(z => z + 1);
      setFocusedId(newId);
      return [...prev, newWindow];
    });
  }, [zCounter]);

  const closeWindow = useCallback((id: WindowId) => {
    setWindows(prev => {
      const windowToClose = prev.find(w => w.id === id);
      if (windowToClose && location.pathname === windowToClose.route) {
        navigate('/');
      }
      return prev.filter(w => w.id !== id);
    });
    if (focusedId === id) setFocusedId(null);
  }, [focusedId, location.pathname, navigate]);

  const minimizeWindow = useCallback((id: WindowId) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, minimized: true } : w
    ));
    setFocusedId(null);
  }, []);

  const maximizeWindow = useCallback((id: WindowId) => {
    setWindows(prev => prev.map(w => {
      if (w.id !== id) return w;

      if (w.maximized) {
        // Restore
        return {
          ...w,
          maximized: false,
          position: w.preMaximizePosition || w.position,
          size: w.preMaximizeSize || w.size,
        };
      } else {
        // Maximize - cover the entire viewport
        return {
          ...w,
          maximized: true,
          preMaximizePosition: { ...w.position },
          preMaximizeSize: { ...w.size },
          position: { x: 0, y: 0 },
          size: { w: window.innerWidth, h: window.innerHeight }
        };
      }
    }));
  }, []);

  const restoreWindow = useCallback((id: WindowId) => {
    focusWindow(id);
  }, [focusWindow]);

  const moveWindow = useCallback((id: WindowId, pos: { x: number, y: number }) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, position: pos, maximized: false } : w
    ));
  }, []);

  const resizeWindow = useCallback((id: WindowId, size: { w: number, h: number }) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, size: size, maximized: false } : w
    ));
  }, []);

  // Sync route with window
  useEffect(() => {
    if (location.pathname !== '/') {
      openWindow(location.pathname);
    }
  }, [location.pathname, openWindow]);

  // Initial window
  useEffect(() => {
    if (!hasAutoOpened.current && location.pathname === '/') {
      openWindow('/about');
      hasAutoOpened.current = true;
    }
  }, [location.pathname, openWindow]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  return {
    windows,
    focusedId,
    isDarkMode,
    toggleDarkMode,
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    moveWindow,
    resizeWindow,
  };
}
