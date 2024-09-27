import { RefObject } from "react";
import {
    DownloadCVButton, GetInTouchButton, HireMeButton,
    InfoSectionOne, InfoSectionTwo,
    PhotoSection,
    ReasonOne, ReasonTwo, ReasonThree, ReasonBonus,
    SquiglyLine
} from "./components";
import CircleArrow from '../../../../assets/arrows/circled-arrow.svg?react';

const AboutDesktop = ({ ref }: { ref: RefObject<HTMLDivElement> }) => {
    return (
        <div className='about-container' ref={ref}>
            <div className="top-section">
                <InfoSectionOne desktop={true} />
                <SquiglyLine desktop={true}/>
                <InfoSectionTwo desktop={true} />
            </div>
            <div className="bottom-section">
                <div className="button-row">
                    <DownloadCVButton />
                    <HireMeButton />
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