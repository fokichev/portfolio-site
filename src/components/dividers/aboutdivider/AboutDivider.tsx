import './AboutDivider.scss';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

import { useViewportContext } from "../../../contexts";

const TEXT = 'GET TO KNOW ME';

const AboutDivider = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineOne = useRef<HTMLDivElement>(null);
    const lineTwo = useRef<HTMLDivElement>(null);
    const { viewport, measurements } = useViewportContext();

    const TEXT_WIDTH = viewport.desktop ? 480 : 250;
    const REPEAT = Math.ceil(measurements.width / TEXT_WIDTH);

    useGSAP(() => {
        const props = { ease: 'none', duration: viewport.desktop ? 20 : 10 };
        gsap.timeline({ repeat: -1 })
            .to(lineOne.current, {
                xPercent: -100,
                ...props
            })
            .to(lineTwo.current, {
                xPercent: -100,
                ...props
            }, '<');
    }, { scope: containerRef });

    return (
        <div className="about-divider" ref={containerRef}>
            <div className='divider-line' ref={lineOne}>
                { Array.from(Array(REPEAT)).map(_ => 
                    <TextItem width={TEXT_WIDTH}/>
                )}
            </div>
            <div className='divider-line' ref={lineTwo}>
                { Array.from(Array(REPEAT)).map(_ => 
                    <TextItem width={TEXT_WIDTH}/>
                )}
            </div>
        </div>
    )
}

const TextItem = ({ width }: { width: number }) => {
    return (
        <div
            className="text-item"
            style={{ minWidth: `${width}px` }}
        >
            <div className="text">{TEXT}</div>
            <div className="circle"/>
        </div>
    )
}

export { AboutDivider }