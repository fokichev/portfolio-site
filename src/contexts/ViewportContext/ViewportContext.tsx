import React, { createContext } from 'react';
import { useMediaQuery } from './useMediaQuery';

const ViewportContext = createContext({
  viewport: {
    mobile: false,
    tablet: false,
    desktop: false
  }
});

const BREAKPOINTS = {
  mobile: 300, //?
  tablet: 768,
  desktop: 1024 //1200
}

const ViewportProvider = ({ children }: { children: any }) => {
  const min = (num: number) => `(min-width: ${num}px)`;
  const desktop = useMediaQuery(min(BREAKPOINTS.desktop));
  const isTablet = useMediaQuery(min(BREAKPOINTS.tablet));
  const isMobile = useMediaQuery(min(BREAKPOINTS.mobile));

  const tablet = isTablet && !desktop;
  const mobile = isMobile && !tablet && !desktop;
  
  const props = { viewport: { mobile, tablet, desktop } };

  return (
    <ViewportContext.Provider value={props}>
      {children}
    </ViewportContext.Provider>
  );
};

const useViewportContext = () => {
  return React.useContext(ViewportContext);
};

export { ViewportProvider, useViewportContext };