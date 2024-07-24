import './Hero.scss';
import {
    CSSGradient,
    Timer
} from '../../../../components';
import SmileyIcon from '../../../../assets/smiley.svg?react';

const Hero = () => {
    return (
        <div className='hero-container'>
            <Timer />
            <CSSGradient/>
            <div className='smiley'>
                <SmileyIcon className='smiley-icon'/>
            </div>
        </div>
    )
}

export { Hero }