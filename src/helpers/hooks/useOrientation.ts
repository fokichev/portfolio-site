// based on:
    // https://www.geeksforgeeks.org/reactjs-useorientation-custom-hook/
    // https://github.com/streamich/react-use/blob/e1d0cd9f7fb2a124a9d46879489abfefdf48d836/docs/useOrientation.md
    // https://www.npmjs.com/package/react-use
// modified to only output gamma/beta for efficiency, uncomment others as needed

import { useEffect, useState } from 'react';
import throttle from 'lodash.throttle';

export interface OrientationState {
//   angle: number;
//   type: string;
//   alpha?: number;
  beta?: number;
  gamma?: number;
}

const defaultState: OrientationState = {
//   angle: 0,
//   type: 'landscape-primary',
    // alpha: 0,
    beta: 0,
    gamma: 0
};

const useOrientation = (initialState: OrientationState = defaultState) => {
  const [state, setState] = useState(initialState);

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
        if (mounted) {
            setState((prevState) => ({
            ...prevState,
            // alpha: event.alpha ?? 0,
            beta: event.beta ?? 0,
            gamma: event.gamma ?? 0,
            }));
        }
    }, 200);

    // window.addEventListener('orientationchange', onChange);
    window.addEventListener('deviceorientation', handleDeviceOrientation);
    // onChange();

    return () => {
        mounted = false;
        //   window.removeEventListener('orientationchange', onChange);
        window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, []);

  return state;
};

export { useOrientation };