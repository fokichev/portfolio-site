import { createRef, RefObject, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import { AnimatedEmoji } from "../../../../../components";

import SparkleBig from '../../../../../assets/sparkles/sparkle-big.svg?react';
import SparkleBigAlt from '../../../../../assets/sparkles/sparkle-big-alt.svg?react';

const duration = 0.5;
const overlap = 0.3;

const InfoSectionOne = ({ desktop, containerRef }: InfoProps) => {
    const sectionRefs = useRef(Array.from(Array(3)).map(_ => createRef<HTMLDivElement>()));
    
    useGSAP(() => {
        if (desktop && containerRef?.current) {
            const delay = 0.5;
            const tl = gsap.timeline({ delay });
            sectionRefs.current.map((ref, i) => {
                tl.from(ref.current, {
                    opacity: 0,
                    xPercent: 10,
                    duration
                }, `-=${overlap}`);
            })

            ScrollTrigger.create({
                trigger: containerRef.current,
                toggleActions: "play reset play reset",
                animation: tl,
                // markers: true
            })
        }
    }, { scope: containerRef });

    return (
        <div className="info info-one">
            <div className="section" ref={sectionRefs.current[0]}>
                <div className="heading sparkle-heading">
                    <AnimatedEmoji
                        className="sparkle"
                        emoji={{
                            id: "sparkle",
                            svgArr: [SparkleBig, SparkleBigAlt]
                        }}
                    />
                    My Goal
                </div>
                <div className="content">
                    A <span className="accent">front end position</span> with an innovative digital agency at the forefront of the industry.
                </div>
            </div>
            <div className="section" ref={sectionRefs.current[1]}>
                <div className="heading">
                    My Dream
                </div>
                <div className="content">
                    To grow into an <span className="accent">expert creative developer</span>, working alongside the industry's top talent on award winning work.
                </div>
            </div>
            <div className="section" ref={sectionRefs.current[2]}>
                <div className="heading">
                    Why front end?
                </div>
                <div className="content">
                    <p>Because <span className="accent">great design</span> and <span className="accent">engaging animations</span> truly excite me.<br/></p>
                    <p>While full stack work was rewarding, I want to focus on front end, where I can grow and specialize.</p>
                </div>
            </div>
        </div>
    )

}

const InfoSectionTwo = ({ desktop, containerRef }: InfoProps) => {
    const sectionRefs = useRef(Array.from(Array(4)).map(_ => createRef<HTMLDivElement>()));
    const infoRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (desktop && containerRef?.current) {
            const delay = (duration - overlap) * 3 + 0.5;
            const tl = gsap.timeline({ delay });

            tl.from(sectionRefs.current[0].current, {
                opacity: 0,
                xPercent: -10,
                duration
            }, `-=${overlap}`)

            sectionRefs.current.slice(1,4).map((ref, i) => {
                tl.from(ref.current, {
                    opacity: 0,
                    yPercent: -10,
                    duration
                }, `-=${overlap}`);
            })

            ScrollTrigger.create({
                trigger: containerRef.current,
                toggleActions: "play reset play reset",
                animation: tl,
                // markers: true
            })
        } else {
            const delay = 0.5;
            const tl = gsap.timeline({ delay });

            sectionRefs.current.slice(1,4).map((ref, i) => {
                tl.from(ref.current, {
                    opacity: 0,
                    duration
                }, `-=${overlap}`);
            })

            ScrollTrigger.create({
                trigger: infoRef.current,
                toggleActions: "play reset play reset",
                animation: tl,
                start: '+=200px bottom',
                // markers: true
            })
        }

    }, { scope: containerRef ?? infoRef });
    return (
        <div className="info info-two" ref={infoRef}>
            <div className="section">
                <div className={`heading${desktop ? "" : " --special"}`} ref={sectionRefs.current[0]}>
                    Why digital agency?
                </div>
                <div className="subsection" ref={sectionRefs.current[1]}>
                    <div className="subheading">
                        1. Growth
                    </div>
                    <div className="content">
                        <p>The fast paced and varied nature of digital agency work forces <span className="accent">quick growth.</span></p>
                        <p>I experienced a similar effect when working at a young startup, which boosted my full stack skills.</p>
                        <p>Digital agencies then, in my mind, are a <span className="accent">goldmine</span> of front end and design knowledge.</p>
                    </div>
                </div>
                <div className="subsection-row">
                    <div className="subsection" ref={sectionRefs.current[2]}>
                        <div className="subheading">
                            2. Variety
                        </div>
                        <div className="content">
                            <p>I enjoy working on varied, medium length projects.</p>
                            <p><i>(As confirmed through freelancing!)</i></p>
                        </div>
                    </div>
                    <div className="subsection" ref={sectionRefs.current[3]}>
                        <div className="subheading">
                            3. Talent
                        </div>
                        <div className="content">
                            Working with talented people is a recipe for growth, and an opportunity to work on beautiful, innovative projects.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface InfoProps {
    desktop: boolean,
    containerRef?: RefObject<HTMLDivElement>
}

export { InfoSectionOne, InfoSectionTwo }