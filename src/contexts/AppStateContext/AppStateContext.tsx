import React, { createContext } from 'react';
import { useMousePosition } from './useMousePosition';

const AppStateContext = createContext({
  mousePosition: { x: 0, y: 0 }
});

const AppStateProvider = ({ children }: { children: any }) => {
  const mousePosition = useMousePosition();

  const props = {
    mousePosition,
  }

  return (
    <AppStateContext.Provider value={props}>
      {children}
    </AppStateContext.Provider>
  );
};

const useAppStateContext = () => {
  return React.useContext(AppStateContext);
};

export { AppStateProvider, useAppStateContext };