import { useGSAP } from '@gsap/react';
import { CarrotModel } from '../../../../components';
import './Quote.scss';
import gsap from 'gsap';
import { useRef } from 'react';

const TEXT = [
    'I lose myself in time',
    'when coding something',
    'beautiful.'
    // 'Lorem ipsum dolor sit,',
    // 'consectetur adipis',
    // 'elit, sed.',
]

const Quote = ({ id, refProp }: { id: string, refProp: React.RefObject<HTMLDivElement> }) => {
    return (
        <div className='quote-container margin-content' id={id} ref={refProp}>
            <div className='quote-content'>
                <div className='subtext'>
                    A realisation:
                    {/* Incididunt ut: */}
                </div>
                { TEXT.map((text, index) =>
                    <QuoteLine text={text} index={index} key={index}/>
                )}
            </div>
            <div className='quote-model'>
                <CarrotModel />
            </div>
        </div>
    )
}

const QuoteLine = ({ text, index }: { text: string, index: number }) => {
    const ref = useRef(null);
    const offset = 100;
    const start = -100 + index * offset;
    const end = 400 + index * offset;
    useGSAP(() => {
        gsap.to(ref.current, {
            scrollTrigger: {
                start: `${start}% center`,
                end: `${end}% center`,
                trigger: ref.current,
                scrub: 1,
                // markers: true
            },
            x: '90%'
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