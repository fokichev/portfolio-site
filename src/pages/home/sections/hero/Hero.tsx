import './Hero.scss';
import {
    CSSGradient,
    Timer
} from '../../../../components';
import SmileyIcon from '../../../../assets/smiley.svg?react';

const Hero = ({ id }: { id: string }) => {
    return (
        <div className='hero-container' id={id}>
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