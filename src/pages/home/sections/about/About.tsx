import './About.scss';
import { useEffect, useState } from 'react';

import LevPhoto from '../../../../assets/lev.png';
import SparkleBig from '../../../../assets/sparkles/sparkle-big.png';
import SparkleBigAlt from '../../../../assets/sparkles/sparkle-big-alt.png';
import SparkleSmall from '../../../../assets/sparkles/sparkle-small.png';
import SparkleSmallAlt from '../../../../assets/sparkles/sparkle-small-alt.png';
import { useViewportContext } from '../../../../contexts';

const TEXT = {
    objective: "I'm looking for a front end developer role with a digital agency.",
    sections: [
        {
            color: 'pink',
            title: 'Why front end?',
            text: "Full stack was fun, but I realised I'm drawn to visuals. I can still code a NodeJS server or whip up an nginx config, but I want to grow in front end. Particularly, creative development and implementing motion designs!"
        },
        {
            color: 'blue',
            title: 'Why digital agency?',
            text: "Working with a passionate, talented team really excites me. It's also the quickest way to grow. I prefer variety in my work - as confirmed by my year in freelancing. My time at a start up proved that I'm at home in fast paced environments where I can make a direct impact. A digital agency just makes sense."
        },
        {
            color: 'orange',
            title: 'Why me?',
            text: "I'm a friendly dev with a strong sense of personal responsibility. A sponge for knowledge and full of ambition, I learn quick, but carry my weight right away. My last place dubbed me the \"bug queen\" (now king) - I love a good problem to solve. A solid CompSci education also means I've got my basics down and know how to work hard."
        },
    ]
}


const About = ({ id, refProp }: { id: string, refProp: React.RefObject<HTMLDivElement> }) => {
    const { viewport } = useViewportContext();
    
    const [src, setSrc] = useState({ big: SparkleBig, small: SparkleSmallAlt });
    const [alt, setAlt] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setAlt(prev => !prev);
            setSrc((prev) => ({
                big: prev.big === SparkleBig ? SparkleBigAlt : SparkleBig,
                small: prev.small === SparkleSmall ? SparkleSmallAlt : SparkleSmall
            }));
        }, 800);

        return () => clearInterval(interval);
    }, []);
    
    return (
        <div className='about-container' id={id} ref={refProp}>
            <div className='sticky-container'>
                <div className='photo-title'>
                    Hey, I'm <span className='--red'>Lev</span>! (he/him)
                </div>
                <div className='photo-container'>
                    <img
                        src={LevPhoto}
                        alt='Lev Fokichev, smiling'
                        className='photo'
                    />
                    <img
                        src={src.big}
                        alt='sparkle effect'
                        className={`sparkle-big${alt ? ' --alt' : ''}`}
                    />
                    <img
                        src={src.small}
                        alt='sparkle effect smaller'
                        className={`sparkle-small${alt ? ' --alt' : ''}`}
                    />
                </div>
            </div>
            <div className='text-container'>
                <div className='section-title objective'>
                    {TEXT.objective}
                </div>
                { TEXT.sections.map((section, index) => (
                    <div className='section' key={index}>
                        <div className={`section-title --${section.color}`}>
                            {section.title}
                        </div>
                        <div className='section-text'>
                            {section.text}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export { About }