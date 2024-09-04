import React, { createContext } from 'react';
import { useMousePosition } from './useMousePosition';

const MousePositionContext = createContext({ x: 0, y: 0 });

const MousePositionProvider = ({ children }: { children: any }) => {
  const mousePosition = useMousePosition();

  return (
    <MousePositionContext.Provider value={mousePosition}>
      {children}
    </MousePositionContext.Provider>
  );
};

const useMousePositionContext = () => {
  return React.useContext(MousePositionContext);
};

export { MousePositionProvider, useMousePositionContext };