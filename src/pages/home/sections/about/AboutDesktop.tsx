import { RefObject, useRef } from "react";

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
    const topSectionRef = useRef<HTMLDivElement>(null);
    const contentRowRef = useRef<HTMLDivElement>(null);

    return (
        <div className='about-container' id={id} ref={refProp}>
            <div className="top-section" ref={topSectionRef}>
                <InfoSectionOne {...desktop} containerRef={topSectionRef} />
                <SquiglyLine {...desktop}/>
                <InfoSectionTwo {...desktop} containerRef={topSectionRef} />
            </div>
            <div className="bottom-section" id="reasons">
                <div className="button-row">
                    <DownloadCVButton {...desktop} />
                    <HireMeButton {...desktop} />
                    <GetInTouchButton {...desktop} />
                    <CircleArrow className="circle-arrow"/>
                </div>
                <div className="content-row" ref={contentRowRef}>
                    <div className="reasons-column">
                        <ReasonOne {...desktop} containerRef={contentRowRef} />
                        <ReasonTwo {...desktop} containerRef={contentRowRef} />
                    </div>
                    <PhotoSection />
                    <div className="reasons-column">
                        <ReasonThree {...desktop} containerRef={contentRowRef} />
                        <ReasonBonus {...desktop} containerRef={contentRowRef} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export { AboutDesktop }