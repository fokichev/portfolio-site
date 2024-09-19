import './Quote.scss';
import { useRef } from 'react';

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

import { CarrotModel } from '../../../../components';
import { useViewportContext } from '../../../../contexts';

const Quote = ({ id, refProp }: { id: string, refProp: React.RefObject<HTMLDivElement> }) => {
    const { viewport } = useViewportContext();

    const text = {
        mobile: [
            'I lose myself in',
            'time when I\'m',
            'coding something',
            'beautiful.'
        ],
        tablet: [
            'I lose myself in time',
            'when coding something',
            'beautiful.'
        ],
        desktop: [
            'I lose myself in time',
            'when coding something',
            'beautiful.'
        ]
    };
    const quote = text[viewport.type as keyof typeof text] ?? text['mobile'];

    return (
        <div className='quote-container' id={id} ref={refProp}>
            <div className='quote-content'>
                <div className='subtext'>
                    A realisation:
                </div>
                <div className='quote-line-container'>
                    { quote.map((text, index) =>
                        <QuoteLine
                            text={text}
                            index={index}
                            key={index}
                            desktop={viewport.desktop}
                        />
                    )}
                </div>

            </div>
            <div className='quote-model'>
                <CarrotModel />
            </div>
        </div>
    )
}

const QuoteLine = (
    { text, index, desktop }:
    { text: string, index: number, desktop: boolean }
) => {
    const ref = useRef(null);
    const offset = desktop ? 100 : 150;
    const start = (desktop ? -100 : -500) + index * offset;
    const end = (desktop ? 400 : 100) + index * offset;

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
            <span className='text'>{text}</span>
            <span className='mask' ref={ref}></span>
        </span>
    )
}

export { Quote };