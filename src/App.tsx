import './App.scss'
import { Cursor } from './components'
import { HomePage } from './pages'

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
		<div className='app-container' id='app-container'>
			<Cursor />
			<HomePage />
		</div>
	)
}

export default App
