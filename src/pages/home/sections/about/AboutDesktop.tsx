import { RefObject } from "react";
import {
    InfoSectionOne,
    InfoSectionTwo,
    SquiglyLine
} from "./components";


const AboutDesktop = ({ ref }: { ref: RefObject<HTMLDivElement> }) => {
    return (
        <div className='about-container' ref={ref}>
            <div className="top-section">
                <InfoSectionOne desktop={true} />
                <SquiglyLine desktop={true}/>
                <InfoSectionTwo desktop={true} />
            </div>
        </div>
    )
}

export { AboutDesktop }