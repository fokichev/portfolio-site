import './App.scss'
import { Cursor } from './components'
import { HomePage } from './pages'
import { MousePositionProvider } from './contexts';

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(
	useGSAP,
	ScrollTrigger,
	ScrollToPlugin
);

function App() {
	return (
		<MousePositionProvider>
			<div className='app-container' id='app-container'>
				<Cursor />
				<HomePage />
			</div>
		</MousePositionProvider>
	)
}

export default App
