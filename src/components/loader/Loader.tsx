import './Loader.scss';
import SkullGif from '../../assets/spin-skull.gif';

const Loader = () => {
    return (
        <div className='loader'>
            loading
            <img src={SkullGif} />
        </div>
    )
}

export { Loader }