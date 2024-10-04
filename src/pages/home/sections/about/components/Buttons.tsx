import { createRef, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

import SlightlyCurvedArrow from '../../../../../assets/arrows/slightly-curved-arrow.svg?react';
import CircledArrow from '../../../../../assets/arrows/circled-arrow.svg?react';
import LoopArrow from '../../../../../assets/arrows/loop-arrow.svg?react';
import DoubleLoopArrow from '../../../../../assets/arrows/double-loop-arrow.svg?react';
import { useCursorContext } from '../../../../../contexts';

const HireMeButton = ({ desktop }: { desktop: boolean }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const arrowRefs = useRef(Array.from(Array(6)).map(_ => createRef<HTMLDivElement>()));
    const arrowMovements = [
        { xPercent: 15, yPercent: 15 },
        { xPercent: 0, yPercent: 20 },
        { xPercent: -15, yPercent: 15 },
        { xPercent: 15, yPercent: -15 },
        { xPercent: 0, yPercent: -20 },
        { xPercent: -15, yPercent: -15 },
    ];

    const { onHoverClickable } = useCursorContext();

    const { contextSafe } = useGSAP(() => {
        const props = {
            repeat: -1,
            yoyo: true,
            yoyoEase: 'none',
            duration: 1
        }
        arrowMovements.map((movements, i) => {
            gsap.to(arrowRefs.current[i].current, {
                ...props,
                ...movements,
                delay: i * 0.5
            });
        })

    }, { scope: containerRef });

    const onClick = contextSafe(() => {
        gsap.to(window, { scrollTo: '#reasons', ease: 'power1.inOut' });
    });

    return (
        <div className="hire-me" ref={containerRef} onClick={onClick}>
            { !desktop && <div className='arrows --top'>
                    <div ref={arrowRefs.current[0]}><SlightlyCurvedArrow className='slight-curve' /></div>
                    <div ref={arrowRefs.current[1]}><DoubleLoopArrow className='double-loop' /></div>
                    <div ref={arrowRefs.current[2]}><CircledArrow className='circled' /></div>
                </div>
            }
            <div
                className='button'
                onMouseEnter={() => onHoverClickable(true)}
                onMouseLeave={() => onHoverClickable(false)}
            >
                <span>Why you should hire me</span>
            </div>
            { !desktop && <div className='arrows --bottom'>
                    <div ref={arrowRefs.current[3]}><CircledArrow className='circled' /></div>
                    <div ref={arrowRefs.current[4]}><SlightlyCurvedArrow className='slight-curve'/></div>
                    <div ref={arrowRefs.current[5]}><LoopArrow className='loop' /></div>
                </div>
            }
        </div>
    )
}

const LinkButton = ({ text, href, desktop }: { text: string, href: string, desktop: boolean }) => {
    const buttonRef = useRef<HTMLAnchorElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline>();

    const { onHoverClickable } = useCursorContext();

    const { contextSafe } = useGSAP(() => {
        const tl = gsap.timeline({ paused: true });
        
        const duration = 0.4;
        tl.to(lineRef.current, { xPercent: 100, duration })
        .set(lineRef.current, { xPercent: -100 })
        .to(lineRef.current, { xPercent: 0, duration });


        tlRef.current = tl;
    }, { scope: buttonRef });

    const onHover = contextSafe(() => {
        onHoverClickable(true);
        tlRef.current?.restart();
    });

    return (
        <a
            className="link-button"
            href={href}
            ref={buttonRef}
            onMouseEnter={desktop ? onHover : () => {}}
            onMouseLeave={() => desktop ? onHoverClickable(false) : {}}
        >
            <div>{text}</div>
            <div className="line" ref={lineRef}/>
        </a>
    )
}

const DownloadCVButton = ({ desktop }: { desktop: boolean }) => {
    return <LinkButton text='Download CV' href='/CV_Lev_Fokichev.pdf' desktop={desktop} />
}

const GetInTouchButton = ({ desktop }: { desktop: boolean }) => {
    const email = 'contact@fokicheva.com';
    return <LinkButton text='Get in touch' href={`mailto:${email}?subject=Saying%20hi!`} desktop={desktop} />
}

export {
    HireMeButton,
    DownloadCVButton,
    GetInTouchButton
}