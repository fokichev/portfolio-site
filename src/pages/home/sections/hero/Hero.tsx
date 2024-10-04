import './Hero.scss';
import React, { Suspense, useRef } from 'react';
import Lottie from 'lottie-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useViewportContext } from '../../../../contexts';


import {
    FlipButton,
    SkullModel,
    Timer
} from '../../../../components';
import { HeartEmoji } from '../../../../components/emoji';

import SmileyIcon from '../../../../assets/smiley.svg?react';
import Arrow from '../../../../assets/arrows/arrow-straight-long.svg?react';

import globeLottie from '../../../../assets/lottie/globe.json';
import eyeLottie from '../../../../assets/lottie/eye.json';

import spinSkull from '../../../../assets/spin-skull.gif';

const Hero = ({ id, refProp }: { id: string, refProp: React.RefObject<HTMLDivElement> }) => {
    const { viewport } = useViewportContext();

    const email = 'contact@fokicheva.com';

    const scopeRef = useRef<HTMLDivElement>(null);
    const heartEmojiRef = useRef<HTMLDivElement>(null);
    
    useGSAP(() => {
        const tl = gsap.timeline({ repeat: -1, yoyo: true });
        tl.to(heartEmojiRef.current, {
            scale: 0.8,
            ease: 'power2.inOut',
            duration: 0.18,
            delay: 0.3
        });
    }, { scope: scopeRef });

    const props = { scopeRef, heartEmojiRef };
    return (
        <div className='hero-container' id={id} ref={refProp}>
            <div className='hero-content'>
                <Timer />
                { viewport.desktop && <FlipButton
                    text='Get in Touch'
                    className='get-in-touch'
                    href={`mailto:${email}?subject=Saying%20hi!`}
                /> }
                { viewport.desktop
                    ? <DesktopTextSection {...props} />
                    : <MobileTextSection {...props} />
                }
            </div>
        </div>
    )
}

const DesktopTextSection = ({ scopeRef, heartEmojiRef }: { scopeRef: RefType, heartEmojiRef: RefType }) => {
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
            <div className='row row-two' ref={scopeRef}>
                <span ref={heartEmojiRef} className='heart'><HeartEmoji/></span>
                <span>CREATIVE</span>
                <Suspense>
                    <SkullModel />
                </Suspense>
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

const MobileTextSection = ({ scopeRef, heartEmojiRef }: { scopeRef: RefType, heartEmojiRef: RefType }) => {
    const arrowRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ repeat: -1, yoyo: false });
        const duration = 0.6;
        tl.
            to(arrowRef.current, {
                delay: 1,
                y: '150%',
                duration,
                ease: 'power4.in',
            })
            .set(arrowRef.current, { y: '-150%' })
            .to(arrowRef.current, {
                y: '0%',
                duration,
                ease: 'power4.out'
            });
    }, { scope: arrowRef })
    return (
        <div className='hero-text'>
            <div className='row-one'>
                <div className='row front'>
                    <span>FRONT</span>
                    <Lottie
                        animationData={globeLottie}
                        loop={true}
                        className='lottie-globe'
                    />
                </div>
                <div className='row end'>
                    <Lottie
                        animationData={eyeLottie}
                        loop={true}
                        className='lottie-eye'
                    />
                    <span>END</span>
                </div>
            </div>
            <div className='row row-two'>
                <span>CREATIVE</span>
                <img src={spinSkull}/>
            </div>
            <div className='row row-three' ref={scopeRef}>
                <span>DEVEL</span>
                <span ref={heartEmojiRef} className='heart'><HeartEmoji/></span>
                <span>PER</span>
            </div>
            <div className='row row-four'>
                <div className='text'>
                    <div className='row lev'>
                        <span>LEV</span>
                        <div className='smiley'>
                            <SmileyIcon className='smiley-icon'/>
                        </div>
                    </div>
                    <span className='fokichev'>FOKICHEV</span>
                </div>
                <div className='arrow'>
                    <div ref={arrowRef}>
                        <Arrow/>
                    </div>
                </div>
            </div>
        </div>
    )
}

type RefType = React.RefObject<HTMLDivElement>;

export { Hero }