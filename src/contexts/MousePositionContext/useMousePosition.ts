import { useState, useEffect, useRef } from 'react';

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const updatePosition = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      requestRef.current = requestAnimationFrame(() => updatePosition(event));
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return position;
};

export { useMousePosition };
