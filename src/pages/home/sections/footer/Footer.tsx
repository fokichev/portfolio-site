import './Footer.scss';
import { Suspense, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from "gsap";
import { useViewportContext } from '../../../../contexts';

import { Link, MatterCarrots, MatterEmojis } from '../../../../components';

const Footer = ({ id, refProp }: { id: string, refProp: React.RefObject<HTMLDivElement> }) => {
    const { viewport, measurements } = useViewportContext();
    const headingRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    const bottomPadding = viewport.desktop ? 25 : 50;
    const containerHeight = viewport.desktop ? 600 : measurements.height;
    const email = 'contact@fokicheva.com';

    const { contextSafe } = useGSAP({ scope: headingRef });

    const onHoverEnter = contextSafe(() => {
        if (viewport.desktop) {
            gsap.to(lineRef.current, {
                width: '100%'
            })
        }
    });

    const onHoverLeave = contextSafe(() => {
        if (viewport.desktop) {
            gsap.to(lineRef.current, {
                width: '0%'
            })
        }
    });

    return (
        <div
            className='footer-container'
            id={id}
            ref={refProp}
            style={{ height: `${containerHeight + bottomPadding}px` }}
        >
            <div
                className='footer-content'
                style={{ height: `${containerHeight}px` }}
            >
                <div className='top-section'>
                    <Link href={`mailto:${email}?subject=Saying%20hi!`}>
                        <div
                            className='heading'
                            ref={headingRef}
                            onMouseEnter={onHoverEnter}
                            onMouseLeave={onHoverLeave}
                        >
                            <div>Contact Me</div>
                            <div className='heading-line' ref={lineRef}/>
                        </div>
                    </Link>
                    <div className='links'>
                        <Link href={`mailto:${email}?subject=Saying%20hi!`}>
                            {email}
                        </Link>
                        <span className='divider'>·</span>
                        <Link
                            href='https://www.linkedin.com/in/fokichev'
                        >
                            linkedin
                        </Link>
                        <span className='divider'>·</span>
                        <Link
                            href='https://github.com/fokichev'
                        >
                            github
                        </Link>
                    </div>
                </div>
            </div>
            <Suspense>
                {/* <MatterCarrots scope={refProp} height={containerHeight}/> */}
                <MatterEmojis scope={refProp} height={containerHeight}/>
            </Suspense>
            <div
                className='bottom-section' 
                style={{ minHeight: `${bottomPadding}px` }}
            >
                <div className='copywrite'>Lev Fokichev © 2024</div>
                <Link href='https://github.com/fokichev/portfolio-site'>website repo :)</Link>
            </div>
        </div>
    )
}

export { Footer }