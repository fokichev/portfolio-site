import './Cursor.scss';
import { useEffect, useRef, useState } from "react";

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
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorBorderRef = useRef<HTMLDivElement>(null);
    const mousePosition = useRef({ x: 0, y: 0 });
    const borderPosition = useRef({ x: 0, y: 0 });
    const rotationAngle = useRef(0);

    const handleMouseMove = (event: MouseEvent) => {
        mousePosition.current = {
            x: event.clientX,
            y: event.clientY
        }
    }
    
    const centerRadius = 14;
    const borderRadius = 40;
    const cursorBorderSmoothing = 15;
    const move = () => {
        // cursor center
        if (cursorRef.current) {
            const x = mousePosition.current.x - centerRadius/2;
            const y = mousePosition.current.y - centerRadius/2;
            rotationAngle.current += 0.5;
            const transformString = `translate(${x}px, ${y}px) rotate(${rotationAngle.current}deg)`;
            cursorRef.current.style.transform = transformString;
        }
        // cursor border
        borderPosition.current.x += (mousePosition.current.x - borderPosition.current.x) / cursorBorderSmoothing;
        borderPosition.current.y += (mousePosition.current.y - borderPosition.current.y) / cursorBorderSmoothing;
        if (cursorBorderRef.current) {
            const borderWidth = parseFloat(getComputedStyle(cursorBorderRef.current).borderWidth);
            const x = borderPosition.current.x - (borderRadius)/2 - borderWidth;
            const y = borderPosition.current.y - (borderRadius)/2 - borderWidth;
            const transformString = `translate(${x}px, ${y}px)`;
            cursorBorderRef.current.style.transform = transformString;
        }
        requestAnimationFrame(move);
    }
    
    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        move();
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="custom-cursor">
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