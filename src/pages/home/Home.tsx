import './Home.scss';

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

import { About, Footer, Hero, Portfolio, Quote, Skills, Timeline } from "./sections";
import { Navbar, ProgressBar, Section } from "../../components";

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

    useGSAP(() => {
        gsap.to('.fixed-container', {
            scrollTrigger: {
                trigger: '#contact',
                start: 'top bottom',
                end: 'bottom bottom',
                scrub: 1,
            },
            opacity: 0
        });
    }, { scope: '.home-page' });

    return (
        <div className='home-page'>
            <div className='fixed-container'>
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

export { HomePage }