import './App.scss'
import { Suspense } from 'react';

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { MotionPathPlugin } from 'gsap/all';

import {
	ViewportProvider,
	MousePositionProvider,
	CursorProvider
} from './contexts';
import HomePage from './pages/home/Home'
import { Loader } from './components';

gsap.registerPlugin(
	useGSAP,
	ScrollTrigger,
	ScrollToPlugin,
	MotionPathPlugin
);

function App() {
	// const HomePage = lazy(() => {
	// 	return Promise.all([
	// 	  import("./pages/home/Home"),
	// 	  new Promise(resolve => setTimeout(resolve, 2000))
	// 	])
	// 	.then(([moduleExports]) => moduleExports);
	//   });
	
	return (
		<ViewportProvider>
			<MousePositionProvider>
				<CursorProvider>
					<div className='app-container' id='app-container'>
						<Suspense fallback={<Loader />}>
							<HomePage />
						</Suspense>
					</div>
				</CursorProvider>
			</MousePositionProvider>
		</ViewportProvider>
	)
}

export default App