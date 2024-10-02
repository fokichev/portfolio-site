import { RefObject, useRef } from "react";

import {
    DownloadCVButton, GetInTouchButton, HireMeButton,
    InfoSectionOne, InfoSectionTwo,
    PhotoSection,
    ReasonOne, ReasonTwo, ReasonThree, ReasonBonus,
    SquiglyLine
} from "./components";
import { AnimatedEmoji } from "../../../../components";

import SparkleBig from '../../../../assets/sparkles/sparkle-big.svg?react';
import SparkleBigAlt from '../../../../assets/sparkles/sparkle-big-alt.svg?react';
import SparkleSmall from '../../../../assets/sparkles/sparkle-small.svg?react';
import SparkleSmallAlt from '../../../../assets/sparkles/sparkle-small-alt.svg?react';

const AboutMobile = ({ refProp, id }: { refProp: RefObject<HTMLDivElement>, id: string }) => {
    const desktop = { desktop: false };
    const reasonsRef = useRef<HTMLDivElement>(null);
    
    return (
        <div className="about-container" id={id} ref={refProp}>
            <PhotoSection />
            <InfoSectionOne {...desktop} />
            <SquiglyLine {...desktop} />
            <InfoSectionTwo {...desktop} />
            <HireMeButton {...desktop}/>
            <div className="reasons-column" id="reasons" ref={reasonsRef}>
                <ReasonOne containerRef={reasonsRef} {...desktop}/>
                <ReasonTwo containerRef={reasonsRef} {...desktop}/>
                <ReasonThree align='start' containerRef={reasonsRef} {...desktop}/>
                <ReasonBonus align='end' containerRef={reasonsRef} {...desktop}/>
            </div>
            <div className="links-section">
                <DownloadCVButton {...desktop} />
                <GetInTouchButton {...desktop} />
                <div className='sparkle --big' >
                    <AnimatedEmoji
                        emoji={{
                            id: 'sparkle-big',
                            svgArr: [SparkleBig, SparkleBigAlt]
                        }}
                    />
                </div>
                <div className='sparkle --small'>
                    <AnimatedEmoji
                        emoji={{
                            id: 'sparkle-small',
                            svgArr: [SparkleSmall, SparkleSmallAlt]
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export { AboutMobile }