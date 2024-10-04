import React, { createContext, useEffect, useState } from 'react';
// import { useMediaQuery } from './useMediaQuery';

const ViewportContext = createContext({
	viewport: {
		mobile: false,
		tablet: false,
		desktop: false,
		type: ''
	},
	// TODO phase out orientation, not using
	// orientation: {
	// 	horizontal: false,
	// 	vertical: false
	// },
	measurements: {
		width: 0,
		height: 0
	}
});

const BREAKPOINTS = {
	mobile: 200, //?
	tablet: 768,
	desktop: 1200 //1200
};

const ViewportProvider = ({ children }: { children: any }) => {
	// const min = (num: number) => `(min-width: ${num}px)`;
	// const desktop = useMediaQuery(min(BREAKPOINTS.desktop));
	// const isTablet = useMediaQuery(min(BREAKPOINTS.tablet));
	// const isMobile = useMediaQuery(min(BREAKPOINTS.mobile));

	// const tablet = isTablet && !desktop;
	// const mobile = isMobile && !tablet && !desktop;

	// const type = desktop ? 'desktop' : tablet ? 'tablet' : mobile ? 'mobile' : '';

	// const horizontal = useMediaQuery('(orientation: landscape)');
	// const vertical = useMediaQuery('(orientation: portrait)');

	// const [measurements, setMeasurements] = useState({
	// 	width: window.innerWidth,
	// 	height: window.innerHeight
	// })

	// useEffect(() => {
	// 	const handleResize = () => {
	// 		setMeasurements({
	// 			...(mobile ? { height: window.innerHeight } : measurements), // height not reactive on mobiele because address bar :')
	// 			width: window.innerWidth
	// 		});
	// 	};

	// 	window.addEventListener('resize', handleResize);

	// 	return () => {
	// 		window.removeEventListener('resize', handleResize);
	// 	};
	// }, []);

	// const props = {
	// 	viewport: { mobile, tablet, desktop, type },
	// 	orientation: { horizontal, vertical },
	// 	measurements
	// };

	

	// return (
	// 	<ViewportContext.Provider value={props}>
	// 		{children}
	// 	</ViewportContext.Provider>
	// );


	// NEW VER
	const getViewportState = ({ width } = measurements) => {
        const desktop = width >= BREAKPOINTS.desktop;
        const tablet = width >= BREAKPOINTS.tablet && width < BREAKPOINTS.desktop;
        const mobile = width < BREAKPOINTS.tablet;
        const type = desktop ? 'desktop' : tablet ? 'tablet' : mobile ? 'mobile' : '';
        return { mobile, tablet, desktop, type };
    };

	const [measurements, setMeasurements] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    const [viewport, setViewport] = useState(getViewportState());

    useEffect(() => {
        const handleResize = () => {
            const updatedMeasurements = { width: window.innerWidth, height: window.innerHeight };
            setMeasurements(updatedMeasurements);
            setViewport(getViewportState(updatedMeasurements));
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

	return (
        <ViewportContext.Provider value={{ viewport, measurements }}>
            {children}
        </ViewportContext.Provider>
    );
};

const useViewportContext = () => {
  	return React.useContext(ViewportContext);
};

export { ViewportProvider, useViewportContext };