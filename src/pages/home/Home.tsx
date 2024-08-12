import './Home.scss';

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

import { About, Footer, Hero, Portfolio, Quote, Skills, Timeline } from "./sections";
import { Navbar, ProgressBar, Section } from "../../components";
import { useRef } from 'react';

const HomePage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const fixedRef = useRef<HTMLDivElement>(null);
    const sections = [
        { key: "hero", Component: Hero, menu: true, refProp: useRef(null) },
        { key: "quote", Component: Quote, refProp: useRef(null) },
        { key: "about", Component: About, menu: true, refProp: useRef(null) },
        { key: "timeline", Component: Timeline, refProp: useRef(null) },
        { key: "skills", Component: Skills, menu: true, refProp: useRef(null) },
        { key: "work", Component: Portfolio, menu: true, refProp: useRef(null) },
        { key: "contact", Component: Footer, menu: true, refProp: useRef(null) },
    ] satisfies Section[];

    useGSAP(() => {
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

    }, { scope: containerRef });

    return (
        <div className='home-page' ref={containerRef}>
            <div className='fixed-container' ref={fixedRef}>
                <ProgressBar scope={containerRef} />
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

export { HomePage }