import './Skills.scss';
import { useEffect, useRef, useState } from 'react';
import { useMousePositionContext } from '../../../../contexts';

import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';

const COLORS = {
    pink: [255, 126, 197],
    blue: [113, 201, 255],
    orange: [255, 175, 129]
}

const Skills = ({ id }: { id: string }) => {
    const { x, y } = useMousePositionContext();
    const maxDeg = { x: 10, y: 10 };

    const shadow = (spread: number) => `0px 4px 25px ${spread}px rgba(255, 255, 255, 0.08)`;
    const rgbaStr = (key: string, on: boolean) => 
        `rgba(${COLORS[key as keyof typeof COLORS].join(', ')}, ${on ? '0.1' : '0'})`;
    const colors = Object.fromEntries(
        Object.keys(COLORS).map(key => [
            [`${key}.on`, rgbaStr(key, true)],
            [`${key}.off`, rgbaStr(key, false)],
        ]).flat()
    );

    const skillsContainerRef = useRef<HTMLDivElement>(null);
    const experienceCardRef = useRef<HTMLDivElement>(null);
    const educationCardRef = useRef<HTMLDivElement>(null);
    const skillsCardRef = useRef<HTMLDivElement>(null);
    
    const [active, setActive] = useState<React.RefObject<HTMLDivElement> | null>(null);
    const [rect, setRect] = useState<DOMRect | null>(null);

    const { contextSafe } = useGSAP({ scope: skillsContainerRef });

    const mouseMove = () => {
        if (rect && active?.current) {
            const degX = Math.round(100 * ((rect.y + (rect.height/2) - y) * maxDeg.y) / (rect.height/2)) / 100;
            const degY = Math.round(100 * ((x - rect.x - (rect.width/2)) * maxDeg.x) / (rect.width/2)) / 100;
            contextSafe(() => {
                gsap.to(active.current, {
                    rotateX: degX,
                    rotateY: degY,
                    duration: 0.2,
                    ease: 'power4.out',
                })
            })();
        }
    }

    const mouseEnter = (ref: React.RefObject<HTMLDivElement>, color: string) => {
        setActive(ref);
        if (ref.current) {
            setRect(ref.current.getBoundingClientRect());
            contextSafe(() => {
                gsap.to(ref.current, {
                    scale: 1.05,
                    boxShadow: shadow(20),
                    backgroundColor: colors[`${color}.on`],
                })
            })();
        }
    }

    const mouseLeave = (ref: React.RefObject<HTMLDivElement>, color: string) => {
        setActive(null);
        if (ref.current) {
            contextSafe(() => {
                gsap.to(ref?.current, {
                    rotateX: 0,
                    rotateY: 0,
                    scale: 1,
                    boxShadow: shadow(0),
                    backgroundColor: colors[`${color}.off`],
                })
            })();
        }
    }

    useEffect(() => {
        if (active) { mouseMove(); }
    }, [x, y, active]);

    return (
        <div className='skills-container margin-content' id={id}>
            <h2 className='skills-heading'>
                Are you a London/remote digital agency,  with a front end developer opening?
            </h2>
            <div className='skills-links'>
                {/* TODO create links */}
                <a href=''>Download CV</a>
                <a href=''>Hire Me :)</a>
            </div>
            <div className='skills-cards' ref={skillsContainerRef}>
                <div className='half-container'>
                    <div
                        className='card-wrapper'
                        onMouseEnter={() => mouseEnter(experienceCardRef, 'pink')}
                        onMouseLeave={() => mouseLeave(experienceCardRef, 'pink')}
                    >
                        <div className='card experience' ref={experienceCardRef}>
                            <ExperienceCard />
                        </div>
                        
                    </div>
                </div>
                <div className='half-container'>
                    <div
                        className='card-wrapper'
                        onMouseEnter={() => mouseEnter(educationCardRef, 'blue')}
                        onMouseLeave={() => mouseLeave(educationCardRef, 'blue')}
                    >
                        <div className='card education' ref={educationCardRef}>
                            <EducationCard />
                        </div>
                    </div>
                    <div
                        className='card-wrapper'
                        onMouseEnter={() => mouseEnter(skillsCardRef, 'orange')}
                        onMouseLeave={() => mouseLeave(skillsCardRef, 'orange')}
                    >
                        <div className='card skills' ref={skillsCardRef}>
                            <SkillsCard />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ExperienceCard = () => {
    return (
        <>
            <div className='card-heading'>
                <span className='carrot'>{'>'}</span>
                <span className='label'>experience</span>
            </div>
            <div className='section'>
                <div className='company'>Freelance Full Stack Developer</div>
                <div className='timeframe'>2023 - current</div>
                <div className='description'>
                    Collaborate with diverse clients across the education, art, and AI sectors.
                </div>
            </div>
            <div className='section'>
                <div className='company'>Involve Education (prev. Practice Pal Music)</div>
                <div className='role'>Full Stack Developer</div>
                <div className='timeframe'>2021-2023</div>
                <div className='description'>
                    <ul>
                        <li>Joined in early start up stages as one of the first developers.</li>
                        <li>Built and maintained core functionality across front and back end (MERN stack).</li>
                        <li>Contributed to userbase growth of 3,500 to 31,000 users.</li>
                        <li>Streamlined internal processes through custom API solutions.</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

const EducationCard = () => {
    return (
        <>
            <div className='card-heading'>
                <span className='carrot'>{'>'}</span>
                <span className='label'>education</span>
            </div>
            <div className='section'>
                <div className='company'>MSc Advanced Computer Science & Software Engineering (2:1)</div>
                <div className='role'>The University of Manchester, 2020 - 2021</div>
            </div>
            <div className='section'>
                <div className='company'>BSc Computer Science (1st Class Honours)</div>
                <div className='role'>Keele University, 2018 - 2020</div>
            </div>
        </>
    )
}

const SkillsCard = () => {
    const skills = {
        current: ['ReactJS', 'TypeScript', 'SASS', 'Git', 'JS', 'HTML', 'CSS', 'Figma'],
        inProgress: ['ThreeJS', 'GSAP', 'MatterJS'],
        backend: ['NodeJS', 'ExpressJS', 'MongoDB', 'MySQL', 'Python']
    };
    return (
        <>
            <div className='card-heading'>
                <span className='carrot'>{'>'}</span>
                <span className='label'>skills</span>
            </div>
            <div className='section skills-array'>
                { skills.current.map(skill => <span>{skill}</span>) }
            </div>
            <div className='card-heading'>
                <span className='carrot'>{'>'}</span>
                <span className='label'>in progress...</span>
            </div>
            <div className='section skills-array'>
                { skills.inProgress.map(skill => <span>{skill}</span>) }
            </div>
            <div className='card-heading --gray'>
                <span className='carrot'>{'>'}</span>
                <span className='label --backend'><i>backend</i></span>
            </div>
            <div className='section skills-array --gray'>
                { skills.backend.map(skill => <span>{skill}</span>) }
            </div>
        </>
    )
}

export { Skills }