const R2_BASE_URL = import.meta.env.VITE_R2_BASE_URL || 'https://scholarx.mypinx.store';
// const PROXY_URL = import.meta.env.VITE_PROXY_URL || 'http://localhost:8000/api/v1/proxy';
const PROXY_URL = import.meta.env.VITE_PROXY_URL || 'http://45.88.175.82/api/v1/proxy';


export const s3 = (path: string): string => {
  const cleanPath = path.replace(/^\//, "");
  return `/r2/${cleanPath}`;
};

