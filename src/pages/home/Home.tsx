import './Home.scss';

import { Navbar, Section } from "../../components";

import { About, Footer, Hero, Portfolio, Quote, Skills, Timeline } from "./sections";

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

    return (
        <div className='home-page'>
            <Navbar
                sections={sections}
                scope='.home-page'
            />
            <div className='sections-container'>
                { sections.map(section => <section.Component id={section.key}/>) }
            </div>
        </div>
    )
}

export { HomePage }