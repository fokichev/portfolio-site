// based on:
    // https://www.geeksforgeeks.org/reactjs-useorientation-custom-hook/
    // https://github.com/streamich/react-use/blob/e1d0cd9f7fb2a124a9d46879489abfefdf48d836/docs/useOrientation.md
    // https://www.npmjs.com/package/react-use
// modified to only output gamma/beta for efficiency, uncomment others as needed

import { useEffect, useRef, useState } from 'react';
import throttle from 'lodash.throttle';

export interface OrientationState {
//   angle: number;
//   type: string;
//   alpha: number;
  beta: number;
  gamma: number;
  active: boolean;
}

const defaultState: OrientationState = {
//   angle: 0,
//   type: 'landscape-primary',
    // alpha: 0,
    beta: 0,
    gamma: 0,
    active: false
};

const useOrientation = (initialState: OrientationState = defaultState) => {
  const [state, setState] = useState(initialState);
  const lastBeta = useRef(0); // To track previous beta value
  const lastGamma = useRef(0); // To track previous gamma value
  const lastActivityTime = useRef(Date.now()); // To track the last time tilt was detected

  useEffect(() => {
    let mounted = true;
    // const screen = window.screen;

    // const onChange = () => {
    //   if (mounted) {
    //     const { orientation } = screen as any;

    //     if (orientation) {
    //       const { angle } = orientation;
    //       setState((prevState) => ({
    //         ...prevState,
    //         angle,
    //         // type,
    //       }));
    //     } else if (window.orientation !== undefined) {
    //       setState((prevState) => ({
    //         ...prevState,
    //         angle: typeof window.orientation === 'number' ? window.orientation : 0,
    //         // type: '',
    //       }));
    //     } else {
    //       setState(initialState);
    //     }
    //   }
    // };

    //DeviceOrientationEvent
    const handleDeviceOrientation = throttle((event: DeviceOrientationEvent) => {
        if (!mounted) return;

        const currentBeta = event.beta ?? 0;
        const currentGamma = event.gamma ?? 0;

        // Check if the device was tilted significantly
        const factor = 2;
        const betaChanged = Math.abs(currentBeta - lastBeta.current) > factor;
        const gammaChanged = Math.abs(currentGamma - lastGamma.current) > factor;

        if (betaChanged || gammaChanged) {
            lastActivityTime.current = Date.now();  // Update last activity time
            setState((prevState) => ({
              ...prevState,
              beta: currentBeta,
              gamma: currentGamma,
              active: true, // Device is actively being tilted
            }));
          }

        lastBeta.current = currentBeta;
        lastGamma.current = currentGamma;
    }, 200);

    // Check for inactivity (if no tilt detected for 2 seconds)
    const checkInactivity = setInterval(() => {
        if (Date.now() - lastActivityTime.current > 2000) {
            setState((prevState) => ({
                ...prevState,
                active: false, // No significant tilt in the last 2 seconds
            }));
        }
    }, 500); // Check inactivity every 0.5 seconds

    // window.addEventListener('orientationchange', onChange);
    window.addEventListener('deviceorientation', handleDeviceOrientation);
    // onChange();

    return () => {
        mounted = false;
        //   window.removeEventListener('orientationchange', onChange);
        clearInterval(checkInactivity);
        window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, [initialState]);

  return state;
};

export { useOrientation };