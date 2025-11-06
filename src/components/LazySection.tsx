import React, { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

interface LazySectionProps {
  children: ReactNode;
  rootMargin?: string;
  className?: string;
  minHeight?: string;
}

export const LazySection: React.FC<LazySectionProps> = ({
  children,
  rootMargin = '200px', // Start loading 200px before entering viewport
  className = '',
  minHeight = '400px', // Prevent layout shift
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only load once
    rootMargin, // Preload before visible
  });

  return (
    <div ref={ref} className={className} style={{ minHeight: inView ? 'auto' : minHeight }}>
      {inView ? children : null}
    </div>
  );
};
