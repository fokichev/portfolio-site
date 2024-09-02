import './CSSGradient.scss';
import { useEffect, useRef } from 'react';
import { useAppStateContext } from '../../contexts';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

import { CircleType, CIRCLES, COLORS } from './circles';
import { hexToRGB } from './utils';

const SIZE = 700;

const CSSGradient = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    return (
        <div
            className='gradient'
        >
            <div className='gradient-container' ref={containerRef}>
                <svg xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <filter id="goo">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                            <feColorMatrix
                                in="blur"
                                mode="matrix"
                                values="
                                    1 0 0 0 0  
                                    0 1 0 0 0  
                                    0 0 1 0 0  
                                    0 0 0 300 -100
                                "
                                result="bright"
                            />
                            <feBlend in="SourceGraphic" in2="bright" mode="screen"/>
                        </filter>
                    </defs>
                </svg>
                { CIRCLES.map((circle, i) => <Circle {...circle} key={`circle-${i}`} />) }
                <InteractiveCircle container={containerRef}/>
            </div>
            <div className='gradient-text'>
                <div className='name'>Lev Fokichev</div>
                <div className='job'>Front End Developer</div>
            </div>
            <div className='noise'></div>
        </div>
    )
}

const Circle = (props: CircleType) => {
    const {
        color: hexColor,
        center: hexCenter,
        x,
        y,
        movement,
        time,
        linear,
        reverse
    } = props;

    const colorStr = hexToRGB(hexColor).join(', ');
    const background = [
        "radial-gradient(circle at center, ",
        `${hexCenter ? `rgba(${hexToRGB(hexCenter).join(', ')}, 0.8) 0%, ` : ''}`,
        `rgba(${colorStr}, ${hexCenter ? '0.6), 30%, ' : '0.8) 0%, '}`,
        `rgba(${colorStr}, 0) 50%) `,
        "no-repeat"
    ].join("");

    const animation = [
        movement,
        `${time}s`,
        linear ? "linear" : "ease",
        reverse ? "reverse" : "",
        "infinite"
    ].join(" ");

    const left = `calc(${x}% - ${SIZE/2}px)`;
    const top = `calc(${y}% - ${SIZE/2}px)`;
    const offset = 10;
    const transformOrigin =  `calc(50% + ${offset}%) calc(50% + ${offset}%)`

    return (
        <div
            className='gradient-circle'
            style={{
                width: `${SIZE}px`,
                height: `${SIZE}px`,
                background,
                animation,
                left,
                top,
                transformOrigin
            }}
        >
        </div>
    )
}

const InteractiveCircle = ({ container }: { container: React.RefObject<HTMLDivElement> }) => {
    const colorStr = hexToRGB(COLORS.red).join(', ')
    const background = `radial-gradient(circle at center, rgba(${colorStr}, 1) 0, rgba(${colorStr}, 0) 50%) no-repeat`;

    const { mousePosition } = useAppStateContext();
    const { x, y } = mousePosition;
    const { contextSafe } = useGSAP({ scope: container });
    const cursorRef = useRef<HTMLDivElement>(null);

    const duration = 1;
    const ease = 'power4.out';
    const xCursor = cursorRef.current ? gsap.quickTo(cursorRef.current, 'x', { duration, ease }) : () => {};
    const yCursor = cursorRef.current ? gsap.quickTo(cursorRef.current, 'y', { duration, ease }) : () => {};

    const withContext = (val: number, fn: Function) => contextSafe(() => fn(val))();

    useEffect(() => {
        if (container.current) {
            const rect = container.current.getBoundingClientRect();
            withContext(x - SIZE/2 - rect.left, xCursor);
            withContext(y - SIZE/2 - rect.top, yCursor);
        }
    }, [x, y]);

    return (
        <div
            ref={cursorRef}
            className='gradient-circle --interactive'
            style={{
                background,
                width: `${SIZE}px`,
                height: `${SIZE}px`,
            }}
        >
        </div>
    )
}

export { CSSGradient }