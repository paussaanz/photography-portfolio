import React, { createContext, useContext, useState, useEffect } from 'react';

const MediaQueryContext = createContext();

export const MediaQueryProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 720);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 720);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <MediaQueryContext.Provider value={{ isMobile }}>
      {children}
    </MediaQueryContext.Provider>
  );
};

export const useMediaQuery = () => useContext(MediaQueryContext);
