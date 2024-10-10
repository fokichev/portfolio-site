import { useEffect, useRef, useState } from "react";
import throttle from "lodash.throttle";

const useOrientation: OrientationHookInterface = () => {
	const [beta, setBeta] = useState<number | null>(null);
	const [gamma, setGamma] = useState<number | null>(null);
	const [tilting, setTilting] = useState(false);
	const [permission, setPermission] = useState({
		required: true,
		granted: false
	});

	const lastBeta = useRef(0); // To track previous beta value
	const lastGamma = useRef(0); // To track previous gamma value
	const lastActivityTime = useRef(Date.now()); // To track the last time tilt was detected

	const checkPermissionGranted = () => {
		try {
			document.createEvent('DeviceMotionEvent');
			return true;
		} catch (e) {
			return false
		}
	}

	const requestPermissions = () => {
		if (permission.required && !permission.granted) {
			(DeviceOrientationEvent as any).requestPermission()
			.then((response: string) => {
				if (response === "granted") {
					setPermission({ required: true, granted: true });
				}
				else { console.error(`Orientation permission denied: ${response}`)}
			});
		}
	}

	const handleDeviceOrientation = throttle((event: DeviceOrientationEvent) => {
		const currentBeta = event.beta ?? 0;
		const currentGamma = event.gamma ?? 0;

		// Check if the device was tilted significantly
		const factor = 2;
		const betaChanged = Math.abs(currentBeta - lastBeta.current) > factor;
		const gammaChanged = Math.abs(currentGamma - lastGamma.current) > factor;

		if (betaChanged || gammaChanged) {
			lastActivityTime.current = Date.now();  // Update last activity time
			setBeta(currentBeta);
			setGamma(currentGamma);
			setTilting(true);
		}

		lastBeta.current = currentBeta;
		lastGamma.current = currentGamma;
	}, 200);

	// Check if iPhone && need permissions
	useEffect(() => {
		const isIphone = typeof DeviceMotionEvent !== undefined && typeof ((DeviceMotionEvent as any).requestPermission) === "function";
		// const isIphone = true;
		if (isIphone) {
			// Check if permissions already granted by simulating an event
			setPermission({ required: true, granted: checkPermissionGranted() });
		} else {
			setPermission({ required: false, granted: false });
		}
	}, []);

	useEffect(() => {
		// Initialise (if permission granted)
		const { required, granted } = permission;
		const permissionsGranted = !required || granted;

		if (permissionsGranted) {
			// Check for inactivity (if no tilt detected for 2 seconds)

			const checkInactivity = setInterval(() => {
				if (Date.now() - lastActivityTime.current > 2000) {
					setTilting(false);
				}
			}, 500);

			window.addEventListener('deviceorientation', handleDeviceOrientation);

			return () => {
				clearInterval(checkInactivity);
				window.removeEventListener('deviceorientation', handleDeviceOrientation);
			}
		}
	}, [permission]);

	return { beta, gamma, tilting, permission, requestPermissions }
}

type OrientationHookInterface = () => {
	beta: number | null,
	gamma: number | null,
	tilting: boolean,
	permission: { required: boolean, granted?: boolean },
	requestPermissions: () => void
}

export { useOrientation }