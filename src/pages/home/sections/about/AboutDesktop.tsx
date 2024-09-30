import { RefObject } from "react";

import {
    DownloadCVButton, GetInTouchButton, HireMeButton,
    InfoSectionOne, InfoSectionTwo,
    PhotoSection,
    ReasonOne, ReasonTwo, ReasonThree, ReasonBonus,
    SquiglyLine
} from "./components";

import CircleArrow from '../../../../assets/arrows/circled-arrow.svg?react';

const AboutDesktop = ({ refProp, id }: { refProp: RefObject<HTMLDivElement>, id: string }) => {
    const desktop = { desktop: true };
    return (
        <div className='about-container' id={id} ref={refProp}>
            <div className="top-section">
                <InfoSectionOne {...desktop} />
                <SquiglyLine {...desktop}/>
                <InfoSectionTwo {...desktop} />
            </div>
            <div className="bottom-section">
                <div className="button-row">
                    <DownloadCVButton />
                    <HireMeButton {...desktop} />
                    <GetInTouchButton />
                    <CircleArrow className="circle-arrow"/>
                </div>
                <div className="content-row">
                    <div className="reasons-column">
                        <ReasonOne />
                        <ReasonTwo />
                    </div>
                    <PhotoSection />
                    <div className="reasons-column">
                        <ReasonThree />
                        <ReasonBonus />
                    </div>
                </div>
            </div>
        </div>
    )
}

export { AboutDesktop }