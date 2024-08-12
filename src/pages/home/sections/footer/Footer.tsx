import './Footer.scss';
import { useRef } from 'react';

import { MatterCarrots } from '../../../../components';

import LinkedInIcon from '../../../../assets/icons/linkedin.svg?react';
import GithubIcon from '../../../../assets/icons/github.svg?react';

const Footer = ({ id }: { id: string }) => {
    const footerRef = useRef<HTMLDivElement>(null);
    const containerHeight = 600;
    const bottomPadding = 25;

    return (
        <div
            className='footer-container'
            id={id}
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
            <MatterCarrots scope={footerRef} height={containerHeight}/>
        </div>
    )
}

export { Footer }