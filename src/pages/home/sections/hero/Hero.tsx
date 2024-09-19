import './Hero.scss';
import { createRef, useRef } from 'react';
import Lottie from 'lottie-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useCursorContext, useViewportContext } from '../../../../contexts';


import {
    SkullModel,
    Timer
} from '../../../../components';

import HeartEmoji from '../../../../assets/emoji/pixel-style/heart.svg?react';
import SmileyIcon from '../../../../assets/smiley.svg?react';

import globeLottie from '../../../../assets/lottie/globe.json';
import eyeLottie from '../../../../assets/lottie/eye.json';

const Hero = ({ id, refProp }: { id: string, refProp: React.RefObject<HTMLDivElement> }) => {
    const { viewport } = useViewportContext();
    return (
        <div className='hero-container' id={id} ref={refProp}>
            <div className='hero-content'>
                <Timer />
                <ContactButton/>
                { viewport.desktop ? <DesktopTextSection/> : <MobileTextSection/> }
                
            </div>
        </div>
    )
}

const ContactButton = () => {
    // https://gsap.com/community/forums/topic/14114-animating-fill-color-to-match-background-color-as-you-scroll-down-the-page/
    // TODO for color fill when time
    const containerRef = useRef<HTMLDivElement>(null);
    const textArray = 'Get in Touch'.split('');
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
            className='get-in-touch'
            ref={containerRef}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
        >
            { textArray.map((char, index) => (
                <div ref={textRefs.current[index]}>{char === ' ' ? '\u00A0' : char}</div>
            ))}
        </div>
    )
}

const DesktopTextSection = () => {
    const rowTwoRef = useRef<HTMLDivElement>(null);
    const heartEmojiRef = useRef<HTMLDivElement>(null);
    useGSAP(() => {
        const tl = gsap.timeline({ repeat: -1, yoyo: true });
        tl.to(heartEmojiRef.current, {
            scale: 0.8,
            ease: 'power2.inOut',
            duration: 0.18,
            delay: 0.3
        });
    }, { scope: rowTwoRef })

    return (
        <div className='hero-text'>
            <div className='row row-one'>
                <span>FRONT</span>
                <Lottie
                    animationData={eyeLottie}
                    loop={true}
                    className='lottie-eye'
                />
                <span>END</span>
            </div>
            <div className='row row-two' ref={rowTwoRef}>
                <span ref={heartEmojiRef} className='heart'><HeartEmoji/></span>
                <span>CREATIVE</span>
                <SkullModel />
            </div>
            <div className='row row-three'>
                <Lottie
                    animationData={globeLottie}
                    loop={true}
                    className='lottie-globe'
                />
                <span>DEVELOPER</span>
            </div>
            <div className='row row-four'>
                <span>LEV</span>
                <div className='smiley'>
                    <SmileyIcon className='smiley-icon'/>
                </div>
                <span>FOKICHEV</span>
            </div>
        </div>
    )
}

const MobileTextSection = () => {

    return (
        <div className='hero-text'>

        </div>
    )
}

export { Hero }