import './FlipButton.scss';

import { createRef, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

import { useCursorContext, useViewportContext } from '../../contexts';


const FlipButton = (props: { text: string, className: string }) => {
    const { viewport } = useViewportContext();
    return viewport.desktop ? <DesktopVer {...props} /> : <MobileVer {...props} />
}

const DesktopVer = ({ text, className }: { text: string, className: string }) => {
    // https://gsap.com/community/forums/topic/14114-animating-fill-color-to-match-background-color-as-you-scroll-down-the-page/
    // TODO for color fill when time
    const containerRef = useRef<HTMLDivElement>(null);
    const textArray = text.split('');
    const textRefs = useRef(textArray.map(() => createRef<HTMLDivElement>()));
    const tl = useRef<gsap.core.Timeline>();

    const { onHoverClickable } = useCursorContext();
    
    const { contextSafe } = useGSAP(() => {
        tl.current = gsap.timeline({ paused: true });
        const params = {
            duration: 0.2,
            ease: 'power1.inOut'
        };
        const delay = 0.02;
        
        tl.current!.to(containerRef.current, {
            borderColor: '#D6FF00',
            duration: 1
        }, 0);
        textArray.forEach((_, index) => {
            tl.current!
                .to(textRefs.current[index].current, {
                    y: '-150%',
                    ...params
                }, (index) * delay)
                .set(textRefs.current[index].current, {
                    y: '150%'
                },
                (index) * delay + params.duration)
        })
        textArray.forEach((_, index) => {
            tl.current!
                .to(textRefs.current[index].current, {
                    y: '0%',
                    ...params
                }, (index) * delay + params.duration)
        })
    }, { scope: containerRef })

    const onHover = contextSafe((hover: boolean) => {
        onHoverClickable(hover); // cursor
        // first time
        if (tl.current?.paused()) { tl.current.play(); }
        else if (tl.current?.isActive()) {
            // if entering while active && forward, do nothing
            // if entering while active && reversed, restart
            if (hover && tl.current?.reversed()) {
                tl.current?.restart();
            }
            // if leaving while active, reverse quickly
            if (!hover) {
                tl.current?.reverse()
            }
        }
        // if entering/leaving while passive, play/reverse based on hover
        else {
            if (hover) {
                tl.current?.restart();
            }
            else { tl.current?.reverse() }
        }
    });

    return (
        <div
            className={`flip-button ${className}`}
            ref={containerRef}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
        >
            { textArray.map((char, index) => (
                <div ref={textRefs.current[index]} key={index}>{char === ' ' ? '\u00A0' : char}</div>
            ))}
        </div>
    )
}

const MobileVer = ({ text, className }: { text: string, className: string }) => {
    return (
        <div className={`flip-button ${className}`}>
            {text}
        </div>
    )
}

export { FlipButton }