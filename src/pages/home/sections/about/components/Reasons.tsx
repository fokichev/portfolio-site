import { useGSAP } from '@gsap/react';
import CurvedLineDivider from '../../../../../assets/curved-line-divider.svg?react';
import { RefObject, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useViewportContext } from '../../../../../contexts';

const REASONS = [
    {
        number: '1.',
        heading: 'Strong sense of\npersonal responsibility',
        text: 'You can trust me to carry my weight and more.',
        align: 'start',
        index: 0
    },
    {
        number: '2.',
        heading: 'Problem solving fiend',
        text: 'I actually love solving bugs. Leave them to me!',
        align: 'end',
        index: 1
    },
    {
        number: '3.',
        heading: '(Too) high standards',
        text: 'I am physically unable to half-a** things. Fortunate for the user, but often unfortunate for me...',
        align: 'end',
        index: 2
    },
    {
        number: '*',
        heading: 'Bonus',
        text: 'I actually empty the office dishwasher ;)',
        align: 'start',
        index: 3
    },
] satisfies ReasonType[];

const Reason = (
    { number, heading, text, align, index, containerRef, desktop }: 
    ReasonType & { containerRef: RefObject<HTMLDivElement>, desktop?: boolean }
) => {
    const { viewport } = useViewportContext();
    const reasonRef = useRef<HTMLDivElement>(null);

    const { contextSafe } = useGSAP(() => {
        if (containerRef.current) {
            const duration = 0.8;
            const delay = duration/(desktop ? 2 : 3);

            const move = gsap.from(reasonRef.current, {
                opacity: 0,
                scale: desktop ? 2 : 1.2,
                duration,
                ease: 'power4.in',
                paused: true
            })

            ScrollTrigger.create({
                trigger: containerRef.current,
                onEnter: () => gsap.delayedCall(index * delay, () => move.play(0)),
                onEnterBack: () => gsap.delayedCall((desktop ? index : (3 - index)) * delay, () => move.play(0)),
                onLeave: () => move.time(0).pause(),
                onLeaveBack: () => move.time(0).pause(),
                // markers: true
            })
        }

    }, { scope: containerRef, dependencies: [containerRef] });

    const mouseEnter = () => {
        if (viewport.desktop && reasonRef.current) {
            contextSafe(() => {
                gsap.to(reasonRef.current, {
                    scale: 1.1
                })
            })();
        }
    }

    const mouseLeave = () => {
        if (viewport.desktop && reasonRef.current) {
            contextSafe(() => {
                gsap.to(reasonRef.current, {
                    scale: 1
                })
            })();
        }
    }
    return (
        <div
            className='reason-item-wrapper'
            ref={reasonRef}
            onMouseEnter={() => mouseEnter()}
            onMouseLeave={() => mouseLeave()}
        >
            <div className={`reason-item align-${align}`}>
                <div className="number">{number}</div>
                <div className="text">
                    <div className="heading">{heading}</div>
                    <div className="subtext">{text}</div>
                </div>
            </div>
            { (!desktop && index < 3) && <ReasonDivider /> }
        </div>

    )
}

const ReasonOne = ({ align, containerRef, desktop }: { align?: AlignType, containerRef: RefObject<HTMLDivElement>, desktop?: boolean }) => 
    <Reason {...REASONS[0]} {...(align ? {align} : {})} containerRef={containerRef} desktop={desktop}/>

const ReasonTwo = ({ align, containerRef, desktop }: { align?: AlignType, containerRef: RefObject<HTMLDivElement>, desktop?: boolean }) => 
    <Reason {...REASONS[1]} {...(align ? {align} : {})} containerRef={containerRef} desktop={desktop}/>

const ReasonThree = ({ align, containerRef, desktop }: { align?: AlignType, containerRef: RefObject<HTMLDivElement>, desktop?: boolean }) => 
    <Reason {...REASONS[2]} {...(align ? {align} : {})} containerRef={containerRef} desktop={desktop}/>

const ReasonBonus = ({ align, containerRef, desktop }: { align?: AlignType, containerRef: RefObject<HTMLDivElement>, desktop?: boolean }) => 
    <Reason {...REASONS[3]} {...(align ? {align} : {})} containerRef={containerRef} desktop={desktop}/>


const ReasonDivider = () => {
    return (
        <div className='curved-line-divider'>
            <CurvedLineDivider />
        </div>
    )
}

type AlignType = 'start' | 'end';
type ReasonType = {
    number: string,
    heading: string,
    text: string, 
    align: AlignType,
    index: number
}

export { ReasonOne, ReasonTwo, ReasonThree, ReasonBonus, ReasonDivider }