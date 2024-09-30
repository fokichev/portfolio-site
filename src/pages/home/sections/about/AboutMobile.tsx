import { RefObject } from "react";

import {
    DownloadCVButton, GetInTouchButton, HireMeButton,
    InfoSectionOne, InfoSectionTwo,
    PhotoSection,
    ReasonOne, ReasonTwo, ReasonThree, ReasonBonus,
    SquiglyLine,
    ReasonDivider
} from "./components";
import { AnimatedEmoji } from "../../../../components";

import SparkleBig from '../../../../assets/sparkles/sparkle-big.svg?react';
import SparkleBigAlt from '../../../../assets/sparkles/sparkle-big-alt.svg?react';
import SparkleSmall from '../../../../assets/sparkles/sparkle-small.svg?react';
import SparkleSmallAlt from '../../../../assets/sparkles/sparkle-small-alt.svg?react';

const AboutMobile = ({ refProp, id }: { refProp: RefObject<HTMLDivElement>, id: string }) => {
    const desktop = { desktop: false };
    
    return (
        <div className="about-container" id={id} ref={refProp}>
            <PhotoSection />
            <InfoSectionOne {...desktop} />
            <SquiglyLine {...desktop} />
            <InfoSectionTwo {...desktop} />
            <HireMeButton {...desktop}/>
            <div className="reasons-column">
                <ReasonOne />
                <ReasonDivider />
                <ReasonTwo />
                <ReasonDivider />
                <ReasonThree align='start'/>
                <ReasonDivider />
                <ReasonBonus align='end' />
            </div>
            <div className="links-section">
                <DownloadCVButton />
                <GetInTouchButton />
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