import './Hero.scss';
import {
    CSSGradient,
    Timer
} from '../../../../components';
import SmileyIcon from '../../../../assets/smiley.svg?react';

const Hero = ({ id, refProp }: { id: string, refProp: React.RefObject<HTMLDivElement> }) => {
    return (
        <div className='hero-container' id={id} ref={refProp}>
            <div className='hero-content margin-content'>
                <Timer />
                <CSSGradient/>
            </div>
            <div className='smiley'>
                <SmileyIcon className='smiley-icon'/>
            </div>
        </div>
    )
}

export { Hero }