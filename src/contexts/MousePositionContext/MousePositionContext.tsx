import React, { createContext } from 'react';
import { useMousePosition } from './useMousePosition';

const MousePositionContext = createContext({ x: 0, y: 0 });

const MousePositionProvider = ({ children }: { children: any }) => {
  const position = useMousePosition();

  return (
    <MousePositionContext.Provider value={position}>
      {children}
    </MousePositionContext.Provider>
  );
};

const useMousePositionContext = () => {
  return React.useContext(MousePositionContext);
};

export { MousePositionProvider, useMousePositionContext };