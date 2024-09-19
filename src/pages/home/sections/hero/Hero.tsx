import './Hero.scss';
import { useRef } from 'react';
import Lottie from 'lottie-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useViewportContext } from '../../../../contexts';


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
                {/* <SkullModel /> */}
                {/* <Lottie animationData={globeLottie} loop={true} /> */}
                {/* <Lottie animationData={eyeLottie} loop={true} /> */}
                
            </div>
        </div>
    )
}

const ContactButton = () => {
    // TODO add hover animation logic (either fill in from left, or text flips up)
    return (
        <div className='get-in-touch'>
            Get in Touch
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