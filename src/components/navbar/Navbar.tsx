import './Navbar.scss'
import React, { ReactElement, useRef, useState } from 'react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursorContext } from '../../contexts/CursorContext/CursorContext';

const LINE_HEIGHT = 20;

const Navbar = (props: NavbarProps) => {
    const { sections, scope } = props;

    const [active, setActive] = useState(sections[0].key)
    const activeRef = useRef<HTMLDivElement>(null);

    const { onHoverClickable } = useCursorContext();

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
                if (section.refProp.current) {
                    ScrollTrigger.create({
                        trigger: section.refProp.current,
                        start: 'top center',
                        end: 'bottom center',
                        onEnter: () => setSection({ key: section.key, index }),
                        onEnterBack: () => setSection({ key: section.key, index })
                    })
                };

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
                                key={section.key}
                                onHover={onHoverClickable}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

const MenuItem = (props: MenuProps) => {
    const { active, section, onHover } = props;
    const { key } = section;
    
    const label = `${key[0].toLocaleUpperCase()}${key.slice(1, key.length)}`;
    const isActive = active === key;
    return (
        <div
            className={`menu-item${isActive ? ' --active' : ''}`}
            style={{ lineHeight: `${LINE_HEIGHT}px` }}
            onClick={() => gsap.to(window, { scrollTo: `#${key}` })}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
        >
           {label}
        </div>
    )
}

type Section = {
    key: string,
    Component: (props: any) => ReactElement,
    menu?: boolean,
    refProp: React.RefObject<HTMLDivElement>
}

interface MenuProps {
    active: string,
    section: Section,
    onHover: (hover: boolean) => void
}

interface NavbarProps {
    sections: Section[],
    scope: React.RefObject<HTMLDivElement>
}

export {
    Navbar,
    type Section, 
}