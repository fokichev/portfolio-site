import './Home.scss';
import { useRef, useState } from 'react';

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useViewportContext } from '../../contexts';
import { About, Footer, Hero, Portfolio, Quote, Timeline } from "./sections";
import { AboutDivider, EmojiDivider, Navbar, ProgressBar, Section } from "../../components";

const HomePage = () => {
    const { viewport } = useViewportContext();

    const [progress, setProgress] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);
    const fixedRef = useRef<HTMLDivElement>(null);
    const sections = [
        { key: "home", Component: Hero, menu: true, refProp: useRef(null) },
        { key: "emojidivider", Component: EmojiDivider, refProp: useRef(null) },
        { key: "quote", Component: Quote, refProp: useRef(null) },
        { key: "aboutdivider", Component: AboutDivider, refProp: useRef(null) },
        { key: "about", Component: About, menu: true, refProp: useRef(null) },
        { key: "timeline", Component: Timeline, refProp: useRef(null) },
        { key: "work", Component: Portfolio, menu: true, refProp: useRef(null) },
        { key: "contact", Component: Footer, menu: true, refProp: useRef(null) },
    ] satisfies Section[];

    useGSAP(() => {
        if (viewport.desktop) {
            const contactRef = sections.find(section => section.key === 'contact')?.refProp;
            if (contactRef?.current) {
                gsap.to(fixedRef.current, {
                    scrollTrigger: {
                        trigger: contactRef.current,
                        start: 'top bottom',
                        end: 'bottom bottom',
                        scrub: 1,
                    },
                    opacity: 0
                });
            }
            if (containerRef?.current) {
                ScrollTrigger.create({
                    trigger: containerRef.current,
                    start: 'start end',
                    end: 'bottom bottom',
                    onUpdate: (e) => setProgress(Math.round(e.progress * 100)),
                    // markers: true
                })
            }

        }

    }, { scope: containerRef });

    return (
        <div className='home-page' ref={containerRef}>
            <div className='fixed-container' ref={fixedRef}>
                { viewport.desktop && <ProgressBar progress={progress} /> }
                <Navbar
                    sections={sections}
                    scope={containerRef}
                />
            </div>
            <div className='sections-container'>
                { sections.map(section => 
                    <section.Component
                        id={section.key}
                        refProp={section.refProp}
                        key={section.key}
                    />
                )}
            </div>
        </div>
    )
}

export default HomePage;