import './MobileNavbar.scss';

import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { NavbarProps, Section } from './Navbar';

const LINE_HEIGHT = 65;

const MobileNavbar = (props: NavbarProps) => {
    const { scope } = props;
    const sections = props.sections.filter(section => section.menu);
    
    const [active, setActive] = useState(sections[0].key)
    const tl = useRef<gsap.core.Timeline>();
    const menuRef = useRef<HTMLDivElement>(null);
    const activeRef = useRef<HTMLDivElement>(null);

    const svgSize = 20;
    const p = svgSize - 1;
    const paths = {
        top: [
            `M1 1L${p} 1`,
            `M1 1L${p} ${p}`
        ],
        middle: [ `M1 ${svgSize/2}H${p}` ],
        bottom: [
            `M1 ${p}L${p} ${p}`,
            `M1 ${p}L${p} 1`
        ]
    }

    const { contextSafe } = useGSAP(() => {
        // Set section according to key
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

        // Initialise timeline
        tl.current = gsap.timeline({ paused: true });

        const ease = 'power2.inOut';
        const stages = [
            { start: 0, options: { ease, duration: 0.3} },
            { start: 0.2, options: { ease, duration: 0.6 }}
        ];

        tl.current
            // burger menu animation
            .to('#burger-middle', { ...stages[0].options, opacity: 0 }, stages[0].start)
            .to('#burger-top', { ...stages[0].options, attr: { d: paths.top[1] } }, stages[0].start)
            .to('#burger-bottom', { ...stages[0].options, attr: { d: paths.bottom[1] } }, stages[0].start)
            // menu sliding out
            .to(menuRef.current, { ...stages[1].options, x: '-100%' }, stages[1].start)
    }, { scope });

    const onMenuClick = contextSafe(() => {
        if (tl.current?.paused()) { tl.current.play(); }
        else { tl.current?.reversed(!tl.current.reversed()); }
    });

    const setSection = contextSafe(({ key, index }: { key: string, index: number }) => {
        setActive(key);
        gsap.to(activeRef.current, {
            y: index * LINE_HEIGHT,
            duration: 0.3,
            ease: 'power2.inOut'
        });
    })

    const onMenuItemClick = contextSafe((key: string) => {
        setActive(key);
        const index = sections.findIndex(section => section.key === key);
        setSection({ key, index });
        gsap.to(window, { scrollTo: `#${key}` });
        tl.current?.reverse();
    });

    return (
        <div className='mobile-navbar'>
            <div className='top-row'>
                <div className='logo'>_LF</div>
                <div
                    className='menu-button'
                    onClick={onMenuClick}
                >
                    <svg
                        width={svgSize}
                        height={svgSize}
                        // viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            id='burger-top'
                            d={paths.top[0]}
                            stroke="white"
                            strokeLinecap="round"
                        />
                        <path
                            id='burger-middle'
                            d={paths.middle[0]}
                            stroke="white"
                            strokeLinecap="round"
                        />
                        <path
                            id='burger-bottom'
                            d={paths.bottom[0]}
                            stroke="white"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>
            </div>
            <div ref={menuRef} className='mobile-menu'>
                <div className='mobile-menu-container'>
                        <div
                            className='mobile-menu-chosen'
                            style={{ height: `${LINE_HEIGHT}px` }}
                            ref={activeRef}
                        >
                            {'>'}
                        </div>
                        <div className='mobile-menu-items'>
                            { sections.map(section => (
                                <MenuItem
                                    section={section}
                                    active={active}
                                    key={section.key}
                                    onClick={onMenuItemClick}
                                />
                            ))}
                        </div>
                </div>
            </div>
        </div>
    )
}

const MenuItem = (props: MenuProps) => {
    const { active, section, onClick } = props;
    const { key } = section;
    
    const label = `${key[0].toLocaleUpperCase()}${key.slice(1, key.length)}`;
    const isActive = active === key;
    return (
        <div
            className={`mobile-menu-item${isActive ? ' --active' : ''}`}
            style={{ lineHeight: `${LINE_HEIGHT}px` }}
            onClick={() => onClick(key)}
        >
           {label}
        </div>
    )
}

interface MenuProps {
    active: string,
    section: Section,
    onClick: (key: string) => void
}

export { MobileNavbar }