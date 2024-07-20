import { useEffect, useRef, useState } from 'react';
import './CSSGradient.scss';
import { CircleType, CIRCLES } from './circles';
import { hexToRGB } from './utils';

const SIZE = 700;

const CSSGradient = () => {
    return (
        <div
            className='gradient'
        >
            <div className='gradient-container' id='gradient-container'>
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
                <InteractiveCircle color={"#D22525"} />
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
    // params
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

const InteractiveCircle = ({ color }: { color: string }) => {
    // color
    const colorStr = hexToRGB(color).join(', ')
    const background = `radial-gradient(circle at center, rgba(${colorStr}, 1) 0, rgba(${colorStr}, 0) 50%) no-repeat`;

    // cursor tracking  
    const cursorRef = useRef<HTMLDivElement>(null);
    const currentPosition = useRef({ x: 0, y: 0 });
    const targetPosition = useRef({ x: 0, y: 0 });
    const [containerPosition, setContainerPosition] = useState<{ x: number, y: number }>();
    const [animationStarted, setAnimationStarted] = useState(false);

    const handleMouseMove = (event: MouseEvent) => {
        targetPosition.current = {
            x: event.clientX,
            y: event.clientY
        }
    }

    const cursorSmoothing = 10;
    const animate = () => {
        currentPosition.current.x += (targetPosition.current.x - currentPosition.current.x) / cursorSmoothing;
        currentPosition.current.y += (targetPosition.current.y - currentPosition.current.y) / cursorSmoothing;
        if (cursorRef.current && containerPosition) {
            const x = Math.round(currentPosition.current.x - (SIZE/2) - containerPosition.x);
            const y = Math.round(currentPosition.current.y - (SIZE/2) - containerPosition.y);
            const transformString = `translate(${x}px, ${y}px)`;
            cursorRef.current.style.transform = transformString;
        }
        requestAnimationFrame(animate);
    }

    useEffect(() => {
        const containerPoint = document.getElementById('gradient-container');
        if (containerPoint) {
            const rect = containerPoint.getBoundingClientRect();
            setContainerPosition({ x: rect.left, y: rect.top });
        }
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        }
    }, []);

    useEffect(() => {
        if(containerPosition && !animationStarted) {
            setAnimationStarted(true);
            animate();
        }
    }, [containerPosition, animationStarted])

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