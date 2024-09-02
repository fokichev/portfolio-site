// TODO:
	// mobile!!!
	// on touch screen, change cursor behaviour (disable? add effect?)
	// based on performance, simplify app if needed
	// add loader
	// on mobile, sub heavy components for videos/images
	// test on diff devices + browsers + mac
import './App.scss'
import { HomePage } from './pages'
import { AppStateProvider } from './contexts';

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { CursorProvider } from './contexts/CursorContext/CursorContext';
import { Suspense } from 'react';
import { Loader } from './components';

gsap.registerPlugin(
	useGSAP,
	ScrollTrigger,
	ScrollToPlugin
);

function App() {
	return (
		<AppStateProvider>
			<CursorProvider>
				<div className='app-container' id='app-container'>
					<Suspense fallback={<Loader />}>
						<HomePage />
					</Suspense>
				</div>
			</CursorProvider>
		</AppStateProvider>
	)
}

export default App