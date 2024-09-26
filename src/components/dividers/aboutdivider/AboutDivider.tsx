import './AboutDivider.scss';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useViewportContext } from "../../../contexts";
import { horizontalLoop } from '../../../helpers';

const TEXT = 'GET TO KNOW ME';

const AboutDivider = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineOne = useRef<HTMLDivElement>(null);
    const lineTwo = useRef<HTMLDivElement>(null);
    const { viewport, measurements } = useViewportContext();

    const TEXT_WIDTH = viewport.desktop ? 480 : 250;
    const REPEAT = Math.ceil(measurements.width / TEXT_WIDTH);

    useGSAP(() => {
		const speed = 0.7;
		const minSpeed = -1.5;
		const loop = horizontalLoop([lineOne.current, lineTwo.current], {
			repeat: -1,
			speed,
			paddingRight: 0
		});
		let tl: gsap.core.Timeline;
		ScrollTrigger.observe({
			target: window,
			type: 'scroll',
			onChangeY: (self) => {
                if (Math.abs(self.velocityY) > 500) {
                    tl && tl.kill;
    
                    const factor = speed + self.velocityY / 300; // adjust for speed
                    const timeScale = factor > minSpeed ? factor : minSpeed;
    
                    tl = gsap
                        .timeline()
                        .to(loop, {
                            timeScale,
                            duration: 0.25,
                        })
                        .to(loop, {
                            timeScale: speed,
                            duration: 1,
                        });
                    
                }
			}
		})


        // SCROLL PASSIVELY LOGIC
        // const props = { ease: 'none', duration: viewport.desktop ? 20 : 10 };
        // gsap.timeline({ repeat: -1 })
        //     .to(lineOne.current, {
        //         xPercent: -100,
        //         ...props
        //     })
        //     .to(lineTwo.current, {
        //         xPercent: -100,
        //         ...props
        //     }, '<');
    }, { scope: containerRef });

    return (
        <div className="about-divider" ref={containerRef}>
            <div className='divider-line' ref={lineOne}>
                { Array.from(Array(REPEAT)).map((_, i) => 
                    <TextItem width={TEXT_WIDTH} key={i}/>
                )}
            </div>
            <div className='divider-line' ref={lineTwo}>
                { Array.from(Array(REPEAT)).map((_, i) => 
                    <TextItem width={TEXT_WIDTH} key={i}/>
                )}
            </div>
        </div>
    )
}

const TextItem = ({ width }: { width: number }) => {
    return (
        <div
            className="text-item"
            style={{ minWidth: `${width}px` }}
        >
            <div className="text">{TEXT}</div>
            <div className="circle"/>
        </div>
    )
}

export { AboutDivider }