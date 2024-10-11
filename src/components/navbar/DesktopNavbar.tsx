import './DesktopNavbar.scss'

import { useRef } from 'react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { useCursorContext } from '../../contexts/CursorContext/CursorContext';

import { NavbarProps, Section } from './Navbar';

const LINE_HEIGHT = 26;

const DesktopNavbar = (props: NavbarProps) => {
    const { scope, activeSection } = props;
    const sections = props.sections.filter(section => section.menu);

    const activeRef = useRef<HTMLDivElement>(null);

    const { onHoverClickable } = useCursorContext();

    const { contextSafe } = useGSAP(() => {
        gsap.to(activeRef.current, {
            y: activeSection.index * LINE_HEIGHT,
            duration: 0.3,
            // ease: 'power2.inOut' // TODO fix easing
        });
    }, { scope, dependencies: [ activeSection.index ]});

    const onMenuItemClick = contextSafe((key: string) => gsap.to(window, { scrollTo: `#${key}` }));

    return (
        <div className='desktop-navbar'>
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
                                active={activeSection.key}
                                key={section.key}
                                onHover={onHoverClickable}
                                onClick={onMenuItemClick}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

const MenuItem = (props: MenuProps) => {
    const { active, section, onHover, onClick } = props;
    const { key } = section;
    
    const label = `${key[0].toLocaleUpperCase()}${key.slice(1, key.length)}`;
    const isActive = active === key;
    return (
        <div
            className={`menu-item${isActive ? ' --active' : ''}`}
            style={{ lineHeight: `${LINE_HEIGHT}px` }}
            onClick={() => onClick(key)}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
        >
           {label}
        </div>
    )
}

interface MenuProps {
    active: string,
    section: Section,
    onHover: (hover: boolean) => void,
    onClick: (key: string) => void
}

export { DesktopNavbar }