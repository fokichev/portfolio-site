import './Footer.scss';

import { Link, MatterCarrots } from '../../../../components';

import LinkedInIcon from '../../../../assets/icons/linkedin.svg?react';
import GithubIcon from '../../../../assets/icons/github.svg?react';
import { Suspense } from 'react';

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
                    <Link href=''>
                        <span className='email'>contact@fokicheva.com</span>
                    </Link>
                    <div className='links'>
                        <Link
                            href={""}
                            children={<LinkedInIcon className='icon'/>}
                        />
                        <Link
                            href={""}
                            children={<GithubIcon  className='icon'/>}
                        />
                    </div>
                </div>
                <div className='bottom-section'>
                    <div className='copywrite'>Lev Fokichev © 2024</div>
                    <Link href=''>website repo :)</Link>
                </div>
            </div>
            <Suspense>
                <MatterCarrots scope={refProp} height={containerHeight}/>
            </Suspense>
        </div>
    )
}

export { Footer }