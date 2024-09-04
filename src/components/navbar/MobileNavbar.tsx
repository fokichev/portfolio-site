import './MobileNavbar.scss';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

import { NavbarProps } from './Navbar';

const MobileNavbar = (props: NavbarProps) => {
    const { scope } = props;
    const tl = useRef<gsap.core.Timeline>();
    const menuRef = useRef<HTMLDivElement>(null);

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
        if (tl.current?.paused()) { tl.current.play(); console.log("play"); }
        else { tl.current?.reversed(!tl.current.reversed()); console.log("reverse"); }
    })

    return (
        <div className='mobile-navbar'>
            <div className='top-row'>
                <div className='logo'>_LF</div>
                <div
                    className='menu-button'
                    // onClick={() => setExpanded(!expanded)}
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
                            stroke-linecap="round"
                        />
                        <path
                            id='burger-middle'
                            d={paths.middle[0]}
                            stroke="white"
                            stroke-linecap="round"
                        />
                        <path
                            id='burger-bottom'
                            d={paths.bottom[0]}
                            stroke="white"
                            stroke-linecap="round"
                        />
                    </svg>
                </div>
            </div>
            {/* <MobileNavbarMenu {...props} ref={menuRef} /> */}
            <div ref={menuRef} className='mobile-menu'>
                this is the menu
            </div>
        </div>
    )
}

export { MobileNavbar }