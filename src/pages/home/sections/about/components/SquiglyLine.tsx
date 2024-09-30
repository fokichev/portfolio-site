import { createRef, RefObject, useRef } from 'react';
import { useGSAP } from '@gsap/react';

import { useViewportContext } from '../../../../../contexts';
import { horizontalLoop, verticalLoop } from '../../../../../helpers';

import SquiglyLineSVG from '../../../../../assets/curved-line.svg?react';

const SquiglyLine = ({ desktop }: { desktop: boolean }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const props = { scope: containerRef };
    return (
        <div className="squigly-line-container" ref={containerRef}>
            { desktop ? <SquiglyLineDesktop {...props} /> : <SquiglyLineMobile {...props} /> }
        </div>
    )
}

const SquiglyLineDesktop = ({ scope }: { scope: RefObject<HTMLDivElement> }) => {
    const repeat = 13;
    const refs = useRef(Array.from(Array(repeat)).map(() => createRef<HTMLDivElement>()));

    useGSAP(() => {
        verticalLoop(refs.current.map(ref => ref.current), {
            repeat: -1,
            reversed: true,
            speed: 0.5
        });
    }, { scope });

    return (
        <>
            { Array.from(Array(repeat)).map((_, i) => 
                <div className='squiggly-line' ref={refs.current[i]} key={i}>
                    <SquiglyLineSVG />
                </div>
            )}
        </>
    )
}

const SquiglyLineMobile = ({ scope }: { scope: RefObject<HTMLDivElement> }) => {
    const { measurements } = useViewportContext();
    const svgSize = 40;
    const repeat = Math.ceil(measurements.width / svgSize) + 2;

    const refsTop = useRef(Array.from(Array(repeat)).map(() => createRef<HTMLDivElement>()));
    const refsBottom = useRef(Array.from(Array(repeat)).map(() => createRef<HTMLDivElement>()));

    useGSAP(() => {
        const speed = 0.3;
        horizontalLoop(refsTop.current.map(ref => ref.current), {
            repeat: -1,
            reversed: true,
            speed
        });
        horizontalLoop(refsBottom.current.map(ref => ref.current), {
            repeat: -1,
            reversed: false,
            speed
        });
    }, { scope });

    return (
        <>
            <div className='squiggly-line --top'>
                { Array.from(Array(repeat)).map((_, i) => 
                    <div className='svg-container' key={i} ref={refsTop.current[i]}>
                        <SquiglyLineSVG/>
                    </div>
                )}
            </div>
            <div className='squiggly-line --bottom'>
                { Array.from(Array(repeat)).map((_, i) => 
                    <div className='svg-container' key={i} ref={refsBottom.current[i]}>
                        <SquiglyLineSVG/>
                    </div>
                )}
            </div>
        </>
    )
}

export { SquiglyLine }