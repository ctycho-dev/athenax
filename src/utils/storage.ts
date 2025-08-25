// utils/storage.ts
export const STORAGE_KEYS = {
  LAST_PATH: 'lastPath',
};

const DEFAULT_REDIRECT = '/profile';
const BLOCKED = ['/welcome', '/login'];

export const storeLastPath = (path: string) => {
  // Don't store auth-related or welcome paths
  if (path.startsWith('/login') || path.startsWith('/welcome')) {
    return;
  }
  localStorage.setItem(STORAGE_KEYS.LAST_PATH, path);
};

export const getLastPath = (): string => {
  const path = localStorage.getItem(STORAGE_KEYS.LAST_PATH)
  if (!path || path.startsWith('/login') || path.startsWith('/welcome')) {
    return DEFAULT_REDIRECT
  }
  return path;
};

export const clearLastPath = () => {
  localStorage.removeItem(STORAGE_KEYS.LAST_PATH);
};