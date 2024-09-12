import './Footer.scss';
import { Suspense } from 'react';
import { useViewportContext } from '../../../../contexts';

import { Link, MatterCarrots } from '../../../../components';
import LinkedInIcon from '../../../../assets/icons/linkedin.svg?react';
import GithubIcon from '../../../../assets/icons/github.svg?react';

const Footer = ({ id, refProp }: { id: string, refProp: React.RefObject<HTMLDivElement> }) => {
    const { viewport } = useViewportContext();
    const containerHeight = 600;
    const bottomPadding = 25;
    const email = 'contact@fokicheva.com';

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
                    <Link href={`mailto:${email}?subject=Saying%20hi!`}>
                        <span className='email'>{email}</span>
                    </Link>
                    <div className='links'>
                        <Link
                            href='https://www.linkedin.com/in/fokichev'
                            children={<LinkedInIcon className='icon'/>}
                        />
                        <Link
                            href='https://github.com/fokichev'
                            children={<GithubIcon  className='icon'/>}
                        />
                    </div>
                </div>
                <div className='bottom-section'>
                    <div className='copywrite'>Lev Fokichev © 2024</div>
                    <Link href='https://github.com/fokichev/portfolio-site'>website repo :)</Link>
                </div>
            </div>
            <Suspense>
                <MatterCarrots scope={refProp} height={containerHeight}/>
            </Suspense>
        </div>
    )
}

export { Footer }