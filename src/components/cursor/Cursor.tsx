// TODO try out changing rotation based on screen width/height, so mouse moves right = rotate x degress right, etc. OR do speed/velocity
// TODO fix scroll bars appearing when cursor hits bottom or right edges 
import './Cursor.scss';
import { useEffect, useRef } from "react";
import { useMousePositionContext } from '../../contexts';


import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

const Cursor = () => {
    // check if it is a touch device
    const isTouchDevice = () => {
        try {
            document.createEvent('TouchEvent');
            return true;
        } catch (e) {
            return false;
        }
    };

    return isTouchDevice() ? <TouchCursor /> : <MouseCursor />;
}

const TouchCursor = () => {
    return (
        <></>
    )
}

const MouseCursor = () => {
    const cursorContainerRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorBorderRef = useRef<HTMLDivElement>(null);

    const { x, y } = useMousePositionContext();
    const centerRadius = 14;
    const borderRadius = 40;

    // when x/y change, update cursor position with GSAP,
    // and border position with GSAP with longer duration
    const { contextSafe } = useGSAP(() => {
        gsap.to(cursorRef.current, {
            rotation: 360,
            duration: 5,
            repeat: -1,
            ease: 'none'
        })
    }, { scope: cursorContainerRef });

    const xCursor = gsap.quickSetter(cursorRef.current, 'x', 'px');
    const yCursor = gsap.quickSetter(cursorRef.current, 'y', 'px');

    const borderDur = 0.7;
    const borderEase = 'power4.out';
    const xBorder = gsap.quickTo(
        cursorBorderRef.current,
        'x',
        { duration: borderDur, ease: borderEase }
    );
    const yBorder = gsap.quickTo(
        cursorBorderRef.current,
        'y',
        { duration: borderDur, ease: borderEase }
    );

    const withContext = (val: number, fn: Function) => contextSafe(() => fn(val))();

    useEffect(() => {
        withContext(x - centerRadius / 2, xCursor);
        withContext(y - centerRadius / 2, yCursor);
        
        // if (cursorBorderRef.current) { console.log(parseFloat(getComputedStyle(cursorBorderRef.current).borderWidth)) }
        const borderWidth = 1.6;
        withContext(x - borderRadius/2 - borderWidth, xBorder);
        withContext(y - borderRadius/2 - borderWidth, yBorder);
    }, [x, y]);

    return (
        <div className="custom-cursor" ref={cursorContainerRef}>
            <div
                className="cursor-center"
                ref={cursorRef}
                style={{ width: `${centerRadius}px`, height: `${centerRadius}px` }}
            ></div>
            <div
                className="cursor-border"
                ref={cursorBorderRef}
                style={{
                    width: `${borderRadius}px`,
                    height: `${borderRadius}px`,
                }}
            ></div>
        </div>
    )
}

export { Cursor };