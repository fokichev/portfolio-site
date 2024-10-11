import './MobileNavbar.scss';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

import { NavbarProps, Section } from './Navbar';

const LINE_HEIGHT = 65;

const MobileNavbar = (props: NavbarProps) => {
    const sections = props.sections.filter(section => section.menu);
    const { activeSection, setActiveSection } = props;
    
    const tl = useRef<gsap.core.Timeline>();
    const containerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const activeRef = useRef<HTMLDivElement>(null);
    const burgerTop = useRef(null);
    const burgerMiddle = useRef(null);
    const burgerBottom = useRef(null);

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
        if (menuRef.current && burgerTop.current && burgerMiddle.current && burgerBottom.current) {
            // Initialise timeline
            tl.current = gsap.timeline({ paused: true });

            const ease = 'power2.inOut';
            const stages = [
                { start: 0, options: { ease, duration: 0.3} },
                { start: 0.2, options: { ease, duration: 0.6 }}
            ];

            tl.current
                // burger menu animation
                .to(burgerMiddle.current, { ...stages[0].options, opacity: 0 }, stages[0].start)
                .to(burgerTop.current, { ...stages[0].options, attr: { d: paths.top[1] } }, stages[0].start)
                .to(burgerBottom.current, { ...stages[0].options, attr: { d: paths.bottom[1] } }, stages[0].start)
                // menu sliding out
                .to(menuRef.current, { ...stages[1].options, x: '-100%' }, stages[1].start)
        }
    }, { scope: containerRef });

    useGSAP(() => {
        gsap.to(activeRef.current, {
            y: activeSection.index * LINE_HEIGHT,
            duration: 0.3,
            ease: 'power2.inOut'
        });
    }, [ activeSection.index ]);

    const onMenuClick = contextSafe(() => {
        if (tl.current?.paused()) { tl.current.play(); }
        else { tl.current?.reversed(!tl.current.reversed()); }
    });

    const onMenuItemClick = contextSafe((key: string) => {
        const index = sections.findIndex(section => section.key === key);
        setActiveSection({ key, index });
        gsap.to(window, { scrollTo: `#${key}` });
        tl.current?.reverse();
    });

    return (
        <div className='mobile-navbar' ref={containerRef}>
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
                            ref={burgerTop}
                            id='burger-top'
                            d={paths.top[0]}
                            stroke="white"
                            strokeLinecap="round"
                        />
                        <path
                            ref={burgerMiddle}
                            id='burger-middle'
                            d={paths.middle[0]}
                            stroke="white"
                            strokeLinecap="round"
                        />
                        <path
                            ref={burgerBottom}
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
                                    active={activeSection.key}
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