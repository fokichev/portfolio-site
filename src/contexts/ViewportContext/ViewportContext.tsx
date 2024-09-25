import React, { createContext, useEffect, useState } from 'react';
import { useMediaQuery } from './useMediaQuery';

const ViewportContext = createContext({
	viewport: {
		mobile: false,
		tablet: false,
		desktop: false,
		type: ''
	},
	orientation: {
		horizontal: false,
		vertical: false
	},
	measurements: {
		width: 0,
		height: 0
	}
});

const BREAKPOINTS = {
	mobile: 200, //?
	tablet: 768,
	desktop: 1000 //1200
};

const ViewportProvider = ({ children }: { children: any }) => {
	const min = (num: number) => `(min-width: ${num}px)`;
	const desktop = useMediaQuery(min(BREAKPOINTS.desktop));
	const isTablet = useMediaQuery(min(BREAKPOINTS.tablet));
	const isMobile = useMediaQuery(min(BREAKPOINTS.mobile));

	const tablet = isTablet && !desktop;
	const mobile = isMobile && !tablet && !desktop;

	const type = desktop ? 'desktop' : tablet ? 'tablet' : mobile ? 'mobile' : '';

	const horizontal = useMediaQuery('(orientation: landscape)');
	const vertical = useMediaQuery('(orientation: portrait)');

	const [measurements, setMeasurements] = useState({
		width: window.innerWidth,
		height: window.innerHeight
	})

	useEffect(() => {
		const handleResize = () => {
			setMeasurements({
				width: window.innerWidth,
				height: window.innerHeight
			});
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const props = {
		viewport: { mobile, tablet, desktop, type },
		orientation: { horizontal, vertical },
		measurements
	};

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