import SlightlyCurvedArrow from '../../../../../assets/arrows/slightly-curved-arrow.svg?react';
import CircledArrow from '../../../../../assets/arrows/circled-arrow.svg?react';
import LoopArrow from '../../../../../assets/arrows/loop-arrow.svg?react';
import DoubleLoopArrow from '../../../../../assets/arrows/double-loop-arrow.svg?react';

const HireMeButton = ({ desktop }: { desktop: boolean }) => {
    return (
        <div className="hire-me">
            { !desktop && <div className='arrows --top'>
                    <SlightlyCurvedArrow className='slight-curve'/>
                    <DoubleLoopArrow className='double-loop' />
                    <CircledArrow className='circled' />
                </div>
            }
            <span>Why you should hire me</span>
            { !desktop && <div className='arrows --bottom'>
                    <CircledArrow className='circled' />
                    <SlightlyCurvedArrow className='slight-curve'/>
                    <LoopArrow className='loop' />
                </div>
            }
        </div>
    )
}

const LinkButton = ({ text, href }: { text: string, href: string }) => {
    return (
        <a className="link-button" href={href}>
            <div>{text}</div>
            <div className="line"/>
        </a>
    )
}

const DownloadCVButton = () => {
    // TODO href
    return <LinkButton text='Download CV' href='TODO' />
}

const GetInTouchButton = () => {
    // TODO href
    return <LinkButton text='Get in touch' href='TODO' />
}

export {
    HireMeButton,
    DownloadCVButton,
    GetInTouchButton
}