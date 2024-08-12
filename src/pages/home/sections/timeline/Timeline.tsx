// TODO add appearing/disappearing "keep scrolling" wheel at bottom
import './Timeline.scss';
import { useEffect, useRef, useState } from 'react';

import MiniLev from '../../../../assets/timeline/mini-lev.png';
import MiniLevAlt from '../../../../assets/timeline/mini-lev-alt.png';
import ArrowUp from '../../../../assets/timeline/arrow-up.svg?react';
import KeepScrolling from '../../../../assets/timeline/keep-scrolling.svg?react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Timeline = ({ id, refProp }: { id: string, refProp: React.RefObject<HTMLDivElement> }) => {
    const containerRef = useRef(null);
    const timelineRef = useRef(null);
    const levRef = useRef(null);
    const arrowRef = useRef(null);
    const lineRef = useRef(null);
    const [levSrc, setLevSrc] = useState(MiniLev);
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const animationLength = 1400;
    const widths = {
        gap: 25,
        year: 45,
        role: 110,
        present: 160,
        line: 200,
        lev: 40,
        arrow: 60
    };
    const getWidth = (type: keyof typeof widths) => ({ width: `${widths[type]}px` });
    const miniLevLeft = widths.year + widths.role + widths.gap*2 - widths.lev/2;

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
        gsap
            .timeline({
                scrollTrigger: {
                    trigger: timelineRef.current,
                    scrub: 1,
                    start: '-25% center',
                    end: `+=${animationLength}px center`,
                    pin: containerRef.current,
                    // markers: true
                }
            })
            .to(levRef.current, {
                x: (widths.line),
                duration: 60
            })
            .to(lineRef.current, {
                width: `${widths.line}px`,
                duration: 60
            }, '<')
            .to(arrowRef.current, {
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
            style={{ paddingBottom: `${animationLength + 500}px` }}
        >
            <div className='pin-wrapper' ref={containerRef}>
                <div className='title'>Timeline of Lev</div>
                <div className='timeline' ref={timelineRef}>
                    <div className='timeline-row' style={{ gap: `${widths.gap}px` }}>
                        <span
                            className='year --lightblue'
                            style={getWidth('year')}
                        >
                            2021
                        </span>
                        <span
                            className='role'
                            style={getWidth('role')}
                        >
                            Full Stack Dev
                        </span>
                        <span
                            className='dash line'
                            style={getWidth('line')}
                            id='animated-line'
                        />
                        <span
                            className='role --present'
                            style={getWidth('present')}
                        >
                            Front End Dev
                        </span>
                        <span
                            className='dash line'
                            style={getWidth('line')}
                        />
                        <span
                            className='role'
                            style={getWidth('role')}
                        >
                            Creative Dev
                        </span>
                        <span
                            className='year --blue'
                            style={getWidth('year')}
                        >
                            202X
                        </span>
                    </div>
                    <span
                        ref={lineRef}
                        className='dash line-mask'
                        style={{
                            left: `${widths.year + widths.role + widths.gap*2}px`
                        }}
                    />
                    <img
                        ref={levRef}
                        className='mini-lev'
                        src={levSrc}
                        style={{
                            ...getWidth('lev'),
                            left: `${miniLevLeft}px`,
                            transformOrigin: `0 ${miniLevLeft}px`
                        }}
                    />
                    <div
                        ref={arrowRef}
                        className='present-marker'
                        style={{
                            ...getWidth('arrow'),
                            left: `${widths.year + widths.role + widths.line + widths.gap*2 - widths.arrow/2}px`
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

export { Timeline }