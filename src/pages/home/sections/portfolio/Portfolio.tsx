import './Portfolio.scss';
import { useRef } from 'react';

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useViewportContext, useCursorContext } from '../../../../contexts';
import { CARDS, CARD } from './cards';

import CurvedLine from '../../../../assets/curved-line-underline.svg?react';
import SparkleBig from '../../../../assets/sparkles/sparkle-big.svg?react';
import SparkleBigAlt from '../../../../assets/sparkles/sparkle-big-alt.svg?react';
import { AnimatedEmoji } from '../../../../components';

const Portfolio = ({ id, refProp }: { id: string, refProp: React.RefObject<HTMLDivElement> }) => {
    const { onHoverImage } = useCursorContext();
    const { viewport } = useViewportContext();

    const cardRefs = useRef<HTMLDivElement>(null);
    return (
        <div className='portfolio-container' id={id} ref={refProp}>
            <div className='header'>
                <div className='header-row'>
                    <div className='sparkle' >
                        <AnimatedEmoji
                            emoji={{
                                id: 'sparkle-big',
                                svgArr: [SparkleBig, SparkleBigAlt]
                            }}
                        />
                    </div>
                    <h3>Project Highlights</h3>
                </div>
                <div className='underline'>
                    <CurvedLine />
                </div>
            </div>
            <div className='portfolio-cards' ref={cardRefs}>
                { CARDS.map(card =>
                    <Card
                        card={card}
                        key={card.key}
                        onHover={onHoverImage}
                        mobile={viewport.mobile}
                        container={cardRefs}
                    />)
                }
            </div>
        </div>
    )
}

const Card = (
    { card, onHover, mobile, container}:
    {
        card: CARD,
        onHover: (img: string | null) => void,
        mobile: boolean, 
        container: React.RefObject<HTMLDivElement> 
    }
) => {
    const {
        key,
        title,
        skills,
        image,
        link
    } = card;

    const cardRef = useRef<HTMLAnchorElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const onMouseEnter = () => {
        onHover(image);
    };

    const onMouseLeave = () => {
        onHover(null);
    };

    // useGSAP(() => {
    //     if (mobile && imageRef.current && cardRef.current) {
    //         const center = 40
    //         const scrollTrigger = {
    //             start: `start ${center}%`,
    //             end: `bottom ${center}%`,
    //             toggleActions: 'play reverse play reverse',
    //             trigger: cardRef.current,
    //             // markers: true
    //         };
    //         gsap.to(cardRef.current, {
    //             scrollTrigger,
    //             height: imageRef.current.getBoundingClientRect().height,
    //             duration: 0.2
    //         })
    //         gsap.to(imageRef.current, {
    //             scrollTrigger,
    //             opacity: 1,
    //             duration: 0.5,
    //             delay: 0.5
    //         })
    //     }
    // }, { scope: container });

    return (
        <a
            ref={cardRef}
            key={key}
            href={link}
            className='portfolio-card border-box'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className='title'>{title}</div>
            <div className='skills'>
                { skills.map(skill => <div key={skill} className='skill'>{skill}</div>) }
            </div>
            {/* { mobile && <img src={image} className='image' ref={imageRef}/> } */}
        </a>
    )
}

export { Portfolio }