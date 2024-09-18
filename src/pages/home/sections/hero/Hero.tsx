import './Hero.scss';

import Lottie from 'lottie-react';

import {
    CSSGradient,
    SkullModel,
    Timer
} from '../../../../components';

import SmileyIcon from '../../../../assets/smiley.svg?react';
import globeLottie from '../../../../assets/lottie/globe.json';
import eyeLottie from '../../../../assets/lottie/eye.json';

const Hero = ({ id, refProp }: { id: string, refProp: React.RefObject<HTMLDivElement> }) => {
    return (
        <div className='hero-container' id={id} ref={refProp}>
            <div className='hero-content margin-content'>
                <Timer />
                {/* <CSSGradient/> */}
                {/* <SkullModel /> */}
                {/* <Lottie animationData={globeLottie} loop={true} /> */}
                {/* <Lottie animationData={eyeLottie} loop={true} /> */}
                
            </div>
            <div className='smiley'>
                <SmileyIcon className='smiley-icon'/>
            </div>
        </div>
    )
}

export { Hero }