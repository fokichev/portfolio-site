import './Timeline.scss';
import { useEffect, useRef, useState } from 'react';

import MiniLev from '../../../../assets/timeline/mini-lev.png';
import MiniLevAlt from '../../../../assets/timeline/mini-lev-alt.png';
import ArrowUp from '../../../../assets/timeline/arrow-up.svg?react';
import KeepScrolling from '../../../../assets/timeline/keep-scrolling.svg?react';

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const MobileTimeline = ({ id, refProp }: { id: string, refProp: React.RefObject<HTMLDivElement> }) => {
    const containerRef = useRef(null);
    const timelineRef = useRef(null);
    const curveRef = useRef(null);
    const levRef = useRef(null);
    const arrowRef = useRef(null);
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [levSrc, setLevSrc] = useState(MiniLev);

    const animationLength = 1400;
    const coords = {
        gaps: [ 115, 153 ],
        width: 360,
        textRow: { width: 160, height: 30 },
        curves: [
            {
                x: 260,
                get y(): number { return coords.textRow.height / 2 },
                height: 153
            },
            {
                x: 13,
                get y(): number {
                    return coords.textRow.height + coords.gaps[0] + coords.textRow.height / 2 + 15
                }
            }
        ],
        arrow: {
            width: 60,
            x: 240,
            get y(): number {
                return coords.textRow.height * 2 + coords.gaps[0] + 50
            }
        }
    }

    const handleScroll = () => {
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }
        gsap.to('.keep-scrolling', { opacity: 0, duration: 0.5 });

        scrollTimeoutRef.current = setTimeout(() => {
            gsap.to('.keep-scrolling', { opacity: 1, duration: 0.5 });
        }, 2000);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setLevSrc(prev => prev === MiniLev ? MiniLevAlt : MiniLev);
        }, 800);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, []);

    useGSAP(() => {
        gsap.set(levRef.current, {
            xPercent: -50,
            yPercent: -50,
            transformOrigin: '50% 50%'
        });


        gsap
            .timeline({
                scrollTrigger: {
                    trigger: timelineRef.current,
                    scrub: 1,
                    start: 'center center',
                    end: `+=${animationLength}px center`,
                    pin: containerRef.current,
                    // markers: true
                }
            })
            .to(curveRef.current, { // make line purple
                height: coords.curves[0].height,
                duration: 60,
            }, '<')
            .to(levRef.current, { // face follows svg path
                motionPath: {
                    path: '#curve-path',
                    align: '#curve-path',
                    start: 0.05,
                    end: 0.95
                },
                duration: 60
            })
            .to(arrowRef.current, { // present arrow appears
                opacity: 1,
                y: -20,
                duration: 40
            });
    }, { scope: timelineRef })

    return (
        <div
            className='timeline-container margin-content'
            id={id}
            ref={refProp}
            style={{ paddingBottom: `${animationLength + 200}px` }}
        >
            <div className='pin-wrapper' ref={containerRef}>
                <div className='title'>Timeline of Lev</div>
                <div
                    className='timeline'
                    ref={timelineRef}
                    style={{ width: `${coords.width}px` }}
                >
                    <div
                        className='timeline-row'
                        style={{
                            width: `${coords.textRow.width}px`,
                            height: `${coords.textRow.height}px`,
                            marginBottom: `${coords.gaps[0]}px`
                        }}
                    >
                        <span className='year --lightblue'>2021</span>
                        <span className='role'>Full Stack Dev</span>
                    </div>
                    <svg
                        style={{
                            left: coords.curves[0].x,
                            top: coords.curves[0].y,
                            position: 'absolute'
                        }}
                        width="84"
                        height="153"
                        viewBox="0 0 84 153"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            id='curve-path'
                            d="M14.0011 0.999997C120.5 33.5 92.9993 123 1.00002 152"
                            stroke="white"
                            stroke-dasharray="5 5"
                        />
                    </svg>
                    <div className='curve-mask' ref={curveRef}
                        style={{
                            left: coords.curves[0].x,
                            top: coords.curves[0].y,
                            position: 'absolute'
                        }}
                    >
                        <svg
                            width="84"
                            height="153"
                            viewBox="0 0 84 153"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                id='curve-path-color'
                                d="M14.0011 0.999997C120.5 33.5 92.9993 123 1.00002 152"
                                stroke="#8D74A7"
                                stroke-dasharray="5 5"
                            />
                        </svg>
                    </div>
                    <div className='timeline-row'>
                        <span
                            className='role --present'
                            style={{
                                width: `${coords.textRow.width}px`,
                                height: `${coords.textRow.height}px`,
                                marginBottom: `${coords.gaps[1]}px`
                            }}
                        >
                            Front End Dev
                        </span>
                    </div>
                    <svg
                        style={{
                            left: coords.curves[1].x,
                            top: coords.curves[1].y,
                            position: 'absolute'
                        }}
                        width="84"
                        height="182"
                        viewBox="0 0 84 182"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M72.461 181C-15.5387 181 -33.5389 24.5 82.9768 1"
                            stroke="white"
                            stroke-dasharray="5 5"
                        />
                    </svg>
                    <div
                        className='timeline-row'
                        style={{
                            width: `${coords.textRow.width}px`,
                            height: `${coords.textRow.height}px`
                        }}
                    >
                        <span className='role'>Creative Dev</span>
                        <span className='year --blue'>202X</span>
                    </div>
                    <img
                        ref={levRef}
                        className='mini-lev'
                        src={levSrc}
                        style={{ width: '40px' }}
                    />
                    <div
                        ref={arrowRef}
                        className='present-marker'
                        style={{
                            width: coords.arrow.width,
                            left: coords.arrow.x,
                            top: coords.arrow.y
                        }}
                    >
                        <ArrowUp className='arrow' />
                        <span className='label'>present</span>
                    </div>
                </div>
                <KeepScrolling className='keep-scrolling'/>
            </div>
        </div>
    )
}

export { MobileTimeline }