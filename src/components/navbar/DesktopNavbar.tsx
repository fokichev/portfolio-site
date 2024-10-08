import './DesktopNavbar.scss'

import { useRef, useState } from 'react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useCursorContext } from '../../contexts/CursorContext/CursorContext';

import { NavbarProps, Section } from './Navbar';

const LINE_HEIGHT = 26;

const DesktopNavbar = (props: NavbarProps) => {
    const { sections, scope } = props;

    const [active, setActive] = useState(sections[0].key)
    const activeRef = useRef<HTMLDivElement>(null);

    const { onHoverClickable } = useCursorContext();

    const { contextSafe } = useGSAP(() => {
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
    }, { scope });

    
    const setSection = contextSafe(({ key, index }: { key: string, index: number }) => {
        setActive(key);
        gsap.to(activeRef.current, {
            y: index * LINE_HEIGHT,
            duration: 0.3,
            // ease: 'power2.inOut' // TODO fix easing
        });
    });

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
                                active={active}
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