// TODO try out changing rotation based on screen width/height, so mouse moves right = rotate x degress right, etc. OR do speed/velocity
// TODO fix scroll bars appearing when cursor hits bottom or right edges
import './Cursor.scss';
import { useEffect, useRef } from "react";
import { useMousePositionContext } from '../../contexts';


import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

const Cursor = (props: CursorProps) => {
    // check if it is a touch device
    const isTouchDevice = () => {
        try {
            document.createEvent('TouchEvent');
            return true;
        } catch (e) {
            return false;
        }
    };

    return isTouchDevice() ? <TouchCursor /> : <MouseCursor props={props}/>;
}

const TouchCursor = () => {
    return (
        <></>
    )
}

const MouseCursor = ({ props }: { props: CursorProps }) => {
    const { image, clickable } = props;
    const cursorContainerRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorBorderRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const { x, y } = useMousePositionContext();
    const centerRadius = 14;
    const centerRadiusClickable = 0;
    const borderRadius = 40;
    const borderRadiusClickable = borderRadius * 1.5;

    const { contextSafe } = useGSAP(() => {
        if (cursorRef.current) {
            const tl = gsap.timeline({});
            tl
                .to(cursorContainerRef.current, {
                    opacity: 1,
                    duration: 1,
                    delay: 3
                })
                .set(document.documentElement, {
                    cursor: 'none'
                })
                .to(cursorRef.current, {
                    rotation: 360,
                    duration: 5,
                    repeat: -1,
                    ease: 'none'
                });
        }
    }, { scope: cursorContainerRef });

    const xCursor = gsap.quickSetter(cursorRef.current, 'x', 'px');
    const yCursor = gsap.quickSetter(cursorRef.current, 'y', 'px');

    const borderDur = 0.7;
    const borderEase = 'power4.out';
    const xBorder = cursorBorderRef.current ? gsap.quickTo(
        cursorBorderRef.current,
        'x',
        { duration: borderDur, ease: borderEase }
    ) : () => {};
    const yBorder = cursorBorderRef.current ? gsap.quickTo(
        cursorBorderRef.current,
        'y',
        { duration: borderDur, ease: borderEase }
    ) : () => {};

    const xImage = gsap.quickSetter(imageRef.current, 'x', 'px');
    const yImage = gsap.quickSetter(imageRef.current, 'y', 'px');

    const withContext = (val: number, fn: Function) => contextSafe(() => fn(val))();

    useEffect(() => {
        if (image) {
            withContext(x, xImage);
            withContext(y, yImage);
        }
        const cRad = clickable ? centerRadiusClickable : centerRadius;
        withContext(x - cRad / 2, xCursor);
        withContext(y - cRad / 2, yCursor);
        
        // if (cursorBorderRef.current) { console.log(parseFloat(getComputedStyle(cursorBorderRef.current).borderWidth)) }
        const borderWidth = 1.6;
        const bRad = clickable ? borderRadiusClickable : borderRadius;
        withContext(x - bRad/2 - borderWidth, xBorder);
        withContext(y - bRad/2 - borderWidth, yBorder);
    }, [x, y, image, clickable]);

    useEffect(() => {
        contextSafe(() => {
            const duration = 0.5;
            if (image) {
                gsap.to(cursorRef.current, { duration, opacity: 0 });
                gsap.to(cursorBorderRef.current, { duration, opacity: 0 });
                gsap.to(imageRef.current, { duration, opacity: 1 });
            } else {
                gsap.to(cursorRef.current, { duration, opacity: 1 });
                gsap.to(cursorBorderRef.current, { duration, opacity: 1 });
                if (imageRef.current) {
                    gsap.to(imageRef.current, { duration, opacity: 0 });
                }
            }
        })();
    }, [image]);

    useEffect(() => {
        contextSafe(() => {
            const cRad = clickable ? centerRadiusClickable : centerRadius;
            const bRad = clickable ? borderRadiusClickable : borderRadius;
            const ease = 'power4.out';
            gsap.to(cursorRef.current, {
                width: cRad,
                height: cRad,
                ease
            })
            gsap.to(cursorBorderRef.current, {
                width: bRad,
                height: bRad,
                ease
            })

        })();
    }, [clickable]);

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
            { image && (
                <img
                    src={image}
                    ref={imageRef}
                    style={{
                        opacity: 0,
                        transform: `translate(${-1000}px, ${0}px)`
                    }}
                />
            )}
        </div>
    )
}

interface CursorProps {
    clickable: boolean,
    image: string | null
}

export { Cursor };