import './Hero.scss';
import {
    CSSGradient,
    Timer
} from '../../../../components';

const Hero = () => {
    return (
        <div className='hero-container'>
            <Timer />
            <CSSGradient/>
        </div>
    )
}

export { Hero }