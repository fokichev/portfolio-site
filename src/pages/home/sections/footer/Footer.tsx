import './Footer.scss';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useOrientation } from '../../../../helpers/hooks';
import { useViewportContext } from '../../../../contexts';

import { Link, MatterEmojis } from '../../../../components';

import TiltIcon from '../../../../assets/icons/tilt-icon.svg?react';

const Footer = ({ id, refProp }: { id: string, refProp: React.RefObject<HTMLDivElement> }) => {
    const { viewport, measurements } = useViewportContext();
    const { gamma, beta, tilting, permission, requestPermissions } = useOrientation();

    const headingRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const tiltRef = useRef<HTMLDivElement>(null);

    const [scrolledIn, setScrolledIn] = useState(false);
    const [showPermissionsButton, setShowPermissionsButton] = useState(permission.required && !permission.granted);

    const bottomPadding = viewport.desktop ? 25 : 50;
    const containerHeight = viewport.desktop ? 600 : measurements.height - bottomPadding;
    const email = 'contact@fokichev.com';

    useEffect(() => {
        setShowPermissionsButton(permission.required && !permission.granted);
    }, [permission]);

    const { contextSafe } = useGSAP(() => {
        ScrollTrigger.create({
            trigger: refProp.current,
            start: 'center bottom',
            end: 'center bottom',
            once: true,
            onEnter: () => gsap.delayedCall(2, () => setScrolledIn(true))
        });
    }, { scope: headingRef });

    
    const onHoverEnter = contextSafe(() => {
        if (viewport.desktop) {
            gsap.to(lineRef.current, {
                width: '100%'
            })
        }
    });

    const onHoverLeave = contextSafe(() => {
        if (viewport.desktop) {
            gsap.to(lineRef.current, {
                width: '0%'
            })
        }
    });

    useGSAP(() => {
        if (scrolledIn && !showPermissionsButton) {
            gsap.to(tiltRef.current, {
                opacity: tilting ? 0 : 1,
                duration: 0.5
            })
        }
    }, [tilting, showPermissionsButton, scrolledIn]);

    return (
        <div
            className='footer-container'
            id={id}
            ref={refProp}
            style={{ height: `${containerHeight + bottomPadding}px` }}
        >
            <div
                className='footer-content'
                style={{ height: `${containerHeight}px` }}
            >
                <div className='top-section'>
                    { !viewport.desktop && (
                        <div className='tilt-wrapper'>
                            { showPermissionsButton
                                ? (
                                    <div className='tilt --permissions' onClick={requestPermissions}>
                                        <TiltIcon />
                                        <span className='button'>
                                            grant tilt permissions
                                        </span>
                                    </div>
                                )
                                : (
                                    <div className='tilt --reminder' ref={tiltRef}>
                                        <TiltIcon />
                                        <span>tilt your phone</span>
                                    </div>
                                )
                            }
                        </div>
                    )}
                    <div className='text'>
                        <Link href={`mailto:${email}?subject=Saying%20hi!`}>
                            <div    
                                className='heading'
                                ref={headingRef}
                                onMouseEnter={onHoverEnter}
                                onMouseLeave={onHoverLeave}
                            >
                                <div>Contact Me</div>
                                <div className='heading-line' ref={lineRef}/>
                            </div>
                        </Link>
                        <div className='links'>
                            <Link href={`mailto:${email}?subject=Saying%20hi!`}>
                                {email}
                            </Link>
                            <span className='divider'>·</span>
                            <Link
                                href='https://www.linkedin.com/in/fokichev'
                            >
                                linkedin
                            </Link>
                            <span className='divider'>·</span>
                            <Link
                                href='https://github.com/fokichev'
                            >
                                github
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Suspense>
                {/* <MatterCarrots scope={refProp} height={containerHeight}/> */}
                <MatterEmojis scope={refProp} height={containerHeight} orientationProps={{ gamma, beta }}/>
            </Suspense>
            <div
                className='bottom-section' 
                style={{ minHeight: `${bottomPadding}px` }}
            >
                <div className='copywrite'>Lev Fokichev © 2024</div>
                <Link href='https://github.com/fokichev/portfolio-site'>website repo :)</Link>
            </div>
        </div>
    )
}

export { Footer }