import { AnimatedEmoji } from "../../../../../components";
import SparkleBig from '../../../../../assets/sparkles/sparkle-big.svg?react';
import SparkleBigAlt from '../../../../../assets/sparkles/sparkle-big-alt.svg?react';


const InfoSectionOne = ({ desktop }: { desktop: boolean }) => {

    return (
        <div className="info info-one">
            <div className="section">
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
            <div className="section">
                <div className="heading">
                    My Dream
                </div>
                <div className="content">
                    To grow into an <span className="accent">expert creative developer</span>, working alongside the industry's top talent on award winning work.
                </div>
            </div>
            <div className="section">
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

const InfoSectionTwo = ({ desktop }: { desktop: boolean }) => {
    return (
        <div className="info info-two">
            <div className="section">
                <div className={`heading${desktop ? "" : " --special"}`}>
                    Why digital agency?
                </div>
                <div className="subsection">
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
                    <div className="subsection">
                        <div className="subheading">
                            2. Variety
                        </div>
                        <div className="content">
                            <p>I enjoy working on varied, medium length projects.</p>
                            <p><i>(As confirmed through freelancing!)</i></p>
                        </div>
                    </div>
                    <div className="subsection">
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

export { InfoSectionOne, InfoSectionTwo }