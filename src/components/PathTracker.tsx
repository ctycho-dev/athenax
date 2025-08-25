// components/PathTracker.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { storeLastPath } from '@/utils/storage';

const PathTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    storeLastPath(location.pathname + location.search);
  }, [location]);

  return null;
};

export default PathTracker