// hooks/usePreloginPath.ts
import { useLocation } from 'react-router-dom';

const KEY = 'preLoginPath';

export function usePreloginPath() {
  const location = useLocation();

  function ensureStored() {
    const path = location?.pathname || '/';
    if (!path.startsWith('/login')) {
      localStorage.setItem(KEY, path);
    }
  }

  function resolve(defaultRedirect = '/submit_materials') {
    const pre = localStorage.getItem(KEY);
    localStorage.removeItem(KEY);
    if (pre && !pre.startsWith('/login')) return pre;
    return defaultRedirect;
  }

  return { ensureStored, resolve };
}
