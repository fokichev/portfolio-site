import LevPhoto from '../../../../../assets/lev.png';
import SparkleBig from '../../../../../assets/sparkles/sparkle-big.svg?react';
import SparkleBigAlt from '../../../../../assets/sparkles/sparkle-big-alt.svg?react';
import SparkleSmall from '../../../../../assets/sparkles/sparkle-small.svg?react';
import SparkleSmallAlt from '../../../../../assets/sparkles/sparkle-small-alt.svg?react';
import { AnimatedEmoji } from '../../../../../components';

const PhotoSection = () => {
    const imgCoords = {
        width: 270,
        height: 354,
        border: 12
    };

    const bigSparkleCoords = {
        top: imgCoords.height * 0.25,
        left: imgCoords.width * 0.75
    };

    const smallSparkleCoords = {
        top: imgCoords.height * 0.55,
        left: imgCoords.width * 0.1
    };

    return (
        <div
            className="photo-section"
            style={{ width: `${imgCoords.width}px` }}
        >
            <img
                src={LevPhoto}
                style={{ width: `${imgCoords.width}px`, height: `${imgCoords.height}px` }}
            />
            <div
                className='sparkle big'
                style={{ top: `${bigSparkleCoords.top}px`, left: `${bigSparkleCoords.left}px` }}
            >
                <AnimatedEmoji
                    emoji={{
                        id: 'sparkle-big',
                        svgArr: [SparkleBig, SparkleBigAlt]
                    }}
                />
            </div>
            <div
                className='sparkle small'
                style={{ top: `${smallSparkleCoords.top}px`, left: `${smallSparkleCoords.left}px` }}
            >
                <AnimatedEmoji
                    emoji={{
                        id: 'sparkle-small',
                        svgArr: [SparkleSmall, SparkleSmallAlt]
                    }}
                />
            </div>
            <div className='description'>
                Fig 1. Lev Fokichev (he/him)
            </div>
            <div className='about'>
                <div className='about-row'>
                    <span className='subheading'>Location</span>:&nbsp;
                    <span className='text'>East London, UK</span>
                </div>
                <div className='about-row'>
                    <span className='subheading'>Likes</span>:&nbsp;
                    <span className='text'>coffee, nature, gigs, mountains, sparkling water</span>
                </div>
                <div className='about-row'>
                    <span className='subheading'>Dislikes</span>:&nbsp;
                    <span className='text'>hot weather, loud sounds, scary movies (unless they're camp)</span>
                </div>
            </div>
        </div>
    )
}

export { PhotoSection }