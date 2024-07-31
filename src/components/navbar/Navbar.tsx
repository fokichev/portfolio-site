import './Navbar.scss'
import { ReactElement, useRef, useState } from 'react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LINE_HEIGHT = 24;

const Navbar = (props: NavbarProps) => {
    const { sections, scope } = props;
    const [active, setActive] = useState(sections[0].key)
    const activeRef = useRef<HTMLDivElement>(null);

    const setSection = ({ key, index }: { key: string, index: number }) => {
        setActive(key);
        gsap.to(activeRef.current, {
            y: index * LINE_HEIGHT,
            duration: 0.3,
            // ease: 'power2.inOut' // TODO fix easing
        });
    }

    useGSAP(() => {
        sections
            .filter(section => section.menu)
            .forEach((section, index) => {
                ScrollTrigger.create({
                    trigger: `#${section.key}`,
                    start: 'top center',
                    end: 'bottom center',
                    onEnter: () => setSection({ key: section.key, index }),
                    onEnterBack: () => setSection({ key: section.key, index })
                })
            })
    }, { scope })
    return (
        <div className='navbar'>
            <div className='logo'>_LF</div>
            <div className='menu'>
                <div
                    className='menu-chosen'
                    style={{ height: `${LINE_HEIGHT}px` }}
                    ref={activeRef}
                >
                    {'>'}
                </div>
                <div className='menu-items'>
                    {sections
                        .filter(section => section.menu)
                        .map(section => 
                            <MenuItem
                                section={section}
                                active={active}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

const MenuItem = (props: MenuProps) => {
    const { active, section } = props;
    const { key } = section;
    
    const label = `${key[0].toLocaleUpperCase()}${key.slice(1, key.length)}`;
    const isActive = active === key;
    return (
        <div
            className={`menu-item${isActive ? ' --active' : ''}`}
            onClick={() => gsap.to(window, { scrollTo: `#${key}` })}
            style={{ lineHeight: `${LINE_HEIGHT}px` }}
        >
           {label}
        </div>
    )
}

type Section = { key: string, Component: (props: any) => ReactElement, menu?: boolean }

interface MenuProps {
    active: string,
    section: Section
}

interface NavbarProps {
    sections: Section[],
    scope: string
}

export {
    Navbar,
    type Section, 
}