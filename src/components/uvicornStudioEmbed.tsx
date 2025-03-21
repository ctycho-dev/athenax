import React, { useEffect } from 'react';

// Extend the Window interface to include UnicornStudio
declare global {
  interface Window {
    UnicornStudio: {
      isInitialized: boolean;
      init: () => void;
    };
  }
}

const UnicornStudioEmbed: React.FC = () => {
  useEffect(() => {
    // Ensure UnicornStudio is initialized only once
    if (!window.UnicornStudio) {
      window.UnicornStudio = { isInitialized: false, init: () => {} };

      const script = document.createElement('script');
      script.src = 'https://cdn.unicorn.studio/v1.4.4/unicornStudio.umd.js';
      script.onload = () => {
        if (!window.UnicornStudio.isInitialized) {
          window.UnicornStudio.init();
          window.UnicornStudio.isInitialized = true;
        }
      };

      // Append the script to the document
      (document.head || document.body).appendChild(script);
    }
  }, []);

  return (
    <div
      data-us-project="ogeen1Qu7P7Q9noHiKtg"
      style={{ width: '1200px', height: '675px' }}
    />
  );
};

export default UnicornStudioEmbed;