import './Quote.scss';
import { useRef } from 'react';

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

import { useViewportContext } from '../../../../contexts';
import { AnimatedEmoji, CarrotModel } from '../../../../components';
import {
    HumanEmoji,
    HumanHandsDownEmoji,
    HumanHandsUpEmoji
} from '../../../../components/emoji';

const Quote = ({ id, refProp }: { id: string, refProp: React.RefObject<HTMLDivElement> }) => {
    const { viewport } = useViewportContext();

    return (
        <div className='quote-container' id={id} ref={refProp}>
            <div className='quote-content'>
                <div className='quote-line-container'>
                    <QuoteLine index={0} desktop={viewport.desktop}>
                        <>
                            Hey, I'm
                            <div className='name'>
                                <span className='pronouns-text'>(he/him)</span>
                                <div className='underline'>
                                    <span className='accent-text'>Lev</span>
                                    <span>!</span>
                                </div>
                                <div className='line'/>
                            </div>
                        </>
                    </QuoteLine>
                    <QuoteLine index={1} desktop={viewport.desktop}>
                        <div className='second-line'>
                            A <i>twenty six</i> year old
                        </div>
                    </QuoteLine>
                    <QuoteLine index={2} desktop={viewport.desktop}>
                        <div className='third-line'>
                            front stack dev with
                        </div>
                    </QuoteLine>
                    <QuoteLine index={3} desktop={viewport.desktop}>
                        <div className='fourth-line'>
                            a&nbsp;<span className='accent-text'>creative flair</span>.
                            <AnimatedEmoji
                                emoji={{
                                    id: 'human-emoji',
                                    svgArr: [HumanEmoji, HumanHandsUpEmoji, HumanEmoji, HumanHandsDownEmoji]
                                }}
                                className='human-emoji'
                            />
                        </div>
                    </QuoteLine>
                </div>

            </div>
            <div className='quote-model'>
                <CarrotModel />
            </div>
        </div>
    )
}

const QuoteLine = (
    { children, index, desktop }:
    { children: any, index: number, desktop: boolean }
) => {
    const ref = useRef(null);
    const offset = desktop ? 30 : 150;
    const start = (desktop ? -100 : -500) + (index + 1) * offset;
    const end = (desktop ? -50 : 100) + (index + 1) * offset;

    useGSAP(() => {
        gsap.to(ref.current, {
            scrollTrigger: {
                start: `${start}% center`,
                end: `${end}% center`,
                trigger: ref.current,
                scrub: 1,
                // markers: true
            },
            x: '100%'
        })
    });
    return (
        <span className='quote-line'>
            <span className='quote-line-content'>{children}</span>
            <span className={`mask --${index+1}`} ref={ref}></span>
        </span>
    )
}

export { Quote };