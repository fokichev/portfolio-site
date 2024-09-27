import './About.scss';
import { useEffect, useState } from 'react';

// import LevPhoto from '../../../../assets/lev.png';
// import SparkleBig from '../../../../assets/sparkles/sparkle-big.png';
// import SparkleBigAlt from '../../../../assets/sparkles/sparkle-big-alt.png';
// import SparkleSmall from '../../../../assets/sparkles/sparkle-small.png';
// import SparkleSmallAlt from '../../../../assets/sparkles/sparkle-small-alt.png';
import { useViewportContext } from '../../../../contexts';
import { AboutDesktop } from './AboutDesktop';
import { AboutMobile } from './AboutMobile';


const About = ({ id, refProp }: { id: string, refProp: React.RefObject<HTMLDivElement> }) => {
    const { viewport } = useViewportContext();

    return viewport.desktop ? <AboutDesktop ref={refProp} /> : <AboutMobile ref={refProp} />
}

export { About }