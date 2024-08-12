import './App.scss'
import { HomePage } from './pages'
import { MousePositionProvider } from './contexts';

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { CursorProvider } from './contexts/CursorContext/CursorContext';

gsap.registerPlugin(
	useGSAP,
	ScrollTrigger,
	ScrollToPlugin
);

function App() {
	return (
		<MousePositionProvider>
			<CursorProvider>
				<div className='app-container' id='app-container'>
					<HomePage />
				</div>
			</CursorProvider>
		</MousePositionProvider>
	)
}

export default App
