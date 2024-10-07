import './Quote.scss';
import { Suspense, useRef } from 'react';

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
    const lineRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.fromTo(lineRef.current, { width: 0 }, {
            width: '100%',
            duration: 0.5,
            ease: 'power2.inOut',
            scrollTrigger: {
                trigger: lineRef.current,
                start: '-150px center',
                end: '+400px center',
                toggleActions: 'restart none none reverse',
                // markers: true,
            }
        })
    }, { scope: refProp })

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
                                <div className='line' ref={lineRef}/>
                            </div>
                        </>
                    </QuoteLine>
                    <QuoteLine index={1} desktop={viewport.desktop}>
                        <div className='second-line'>
                            A <i>full stack</i> turned
                        </div>
                    </QuoteLine>
                    <QuoteLine index={2} desktop={viewport.desktop}>
                        <div className='third-line'>
                            <i>front end</i> dev with
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
                <Suspense>
                    <CarrotModel />
                </Suspense>
            </div>
        </div>
    )
}

const QuoteLine = (
    { children, index, desktop }:
    { children: any, index: number, desktop: boolean }
) => {
    const ref = useRef(null);
    // first line is larger, offset this
    const firstLineOffset = (!desktop && index) ? 0 : 40;
    const offset = desktop ? 30 : 60;
    const start = (desktop ? -400 : -500) + (index + 1) * offset + firstLineOffset*4;
    const end = (desktop ? -100 :-100) + (index + 1) * offset + firstLineOffset;

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
            <span className={`mask${desktop ? ` --${index+1}` : ""}`} ref={ref}></span>
        </span>
    )
}

export { Quote };