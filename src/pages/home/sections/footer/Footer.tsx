import './Footer.scss';

import { MatterCarrots } from '../../../../components';

import LinkedInIcon from '../../../../assets/icons/linkedin.svg?react';
import GithubIcon from '../../../../assets/icons/github.svg?react';

const Footer = ({ id, refProp }: { id: string, refProp: React.RefObject<HTMLDivElement> }) => {
    const containerHeight = 600;
    const bottomPadding = 25;

    return (
        <div
            className='footer-container'
            id={id}
            ref={refProp}
            style={{ height: `${containerHeight + bottomPadding}px` }}
        >
            <div className='footer-content'>
                <div className='top-section margin-content'>
                    <div className='heading'>Contact Me</div>
                    <a href='' className='email'>contact@fokicheva.com</a>
                    <div className='links'>
                        <a href=''>
                            <LinkedInIcon className='icon'/>
                        </a>
                        <a href=''>
                            <GithubIcon  className='icon'/>
                        </a>
                    </div>
                </div>
                <div className='bottom-section'>
                    <div className='copywrite'>Lev Fokichev © 2024</div>
                    <a href=''>website repo :)</a>
                </div>
            </div>
            <MatterCarrots scope={refProp} height={containerHeight}/>
        </div>
    )
}

export { Footer }