import './Home.scss';

import { Navbar, ProgressBar, Section } from "../../components";

import { About, Footer, Hero, Portfolio, Quote, Skills, Timeline } from "./sections";
import { useState } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HomePage = () => {
    const sections = [
        { key: "hero", Component: Hero, menu: true },
        { key: "quote", Component: Quote },
        { key: "about", Component: About, menu: true },
        { key: "timeline", Component: Timeline },
        { key: "skills", Component: Skills, menu: true },
        { key: "work", Component: Portfolio, menu: true },
        { key: "contact", Component: Footer, menu: true },
    ] satisfies Section[];

    const [fixedStyle, setFixedStyle] = useState<FixedStyle>({ position: 'fixed', top: 0 });

    const updateFixedStyle = (event: ScrollTrigger) => {
        const { start, end, progress } = event;
        if (progress === 0) {
            setFixedStyle({ position: 'fixed', top: 0 });
        } else {
            const top = start - ((end - start) * progress);
            setFixedStyle({ position: 'absolute', top });
        }
    };

    useGSAP(() => {
        ScrollTrigger.create({
            trigger: '#contact',
            start: 'top bottom',
            end: 'bottom bottom',
            onUpdate: updateFixedStyle,
            // markers: true
        });
    }, { scope: '.home-page' });

    return (
        <div className='home-page'>
            <div className='fixed-container' style={fixedStyle}>
                <ProgressBar />
                <Navbar
                    sections={sections}
                    scope='.home-page'
                />
            </div>
            <div className='sections-container'>
                { sections.map(section => <section.Component id={section.key}/>) }
            </div>
        </div>
    )
}

type FixedStyle = {
    position: 'fixed' | 'absolute',
    top: number
};

export { HomePage }