import './MatterCarrots.scss';
import { useState, useRef, useEffect } from 'react';

// @ts-ignore
import decomp from 'poly-decomp';
import 'pathseg'

import {
    Bodies,
    Body,
    Common,
    Composite,
    Engine,
    Events,
    Mouse,
    MouseConstraint,
    Query,
    Render,
    Runner,
    Svg,
    Vector
} from "matter-js";

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useViewportContext } from '../../contexts';
import { EMOJIS } from './emojis';

const COLORS = {
    bg1: '060606'
}

const MatterEmojis = (props: MatterEmojisProps) => {
    const { height, scope } = props;
    const { viewport } = useViewportContext();
    
    const objectNum = 200;
    // const objectNum = viewport.desktop ? 200 : 50;
    
    const containerWidth = document.getElementsByTagName('html')[0].clientWidth;
    const containerHeight = viewport.desktop ? height : window.innerHeight * 0.95;

    // MATTER.JS REFS
    const scene = useRef<HTMLDivElement>(null);
    const engine = useRef(Engine.create());
    const composite = useRef<Composite>();
    const runner = useRef(Runner.create());

    // FUNCTIONS
    // const fetchSVG = async ({ path }: { path: string }) => {
    //     try {
    //         const response = await fetch(path);
    //         if (!response.ok) {
    //             throw new Error("Can't fetch SVG path")
    //         }
    //         const svgText = await response.text();
    //         const svgDoc = (new DOMParser()).parseFromString(svgText, 'image/svg+xml');
    //         return svgDoc
    //     } catch (error) {
    //         console.error('Error fetching or parsing SVG:', error);
    //     }
    // }
    
    const getTextures = (number: number) => {
        return Array.from(Array(number)).map((_, index) => 
            `matterjs/${EMOJIS[index % EMOJIS.length]}.svg`
        )
    };

    const objectSetup = async () => {
        // ENVIRONMENT
        const boundaryParams = {
            isStatic: true,
            render: {
                // strokeStyle: `red`,
                // fillStyle: `blue`,
                strokeStyle: `#${COLORS.bg1}`,
                fillStyle: `#${COLORS.bg1}`
            }
        }

        const wallThickness = 100; // can't be 0.1 or they clip out easily

        const ground = Bodies.rectangle(
            containerWidth/2,
            containerHeight+wallThickness/2,
            containerWidth,
            wallThickness,
            boundaryParams
        );
        
        const leftWall = Bodies.rectangle(
            -wallThickness/2,
            0.1,
            wallThickness,
            containerHeight*2,
            boundaryParams
        )

        const rightWall = Bodies.rectangle(
            containerWidth+wallThickness/2,
            0.1,
            wallThickness,
            containerHeight*2,
            boundaryParams
        )

        // OBJECTS
        const objectScale = 0.2;
        const textureScle = 0.7;
        const radius = 25;
        const textures = getTextures(objectNum);
        const emojis = textures.map((texture, index) => {
            const x = containerWidth * 0.8 + index * 0.01;
            const y = -100 * objectScale * index - 300;
            return Bodies.circle(x, y, radius,
            {
                friction: 0.001,
                frictionAir: 0.01,
                restitution: 0, // bouncing
                density: 0.0001,
                render: {
                    sprite: {
                        texture,
                        xScale: textureScle,
                        yScale: textureScle
                    }
                }
            });
        })

        // add all of the bodies to the world
        composite.current = Composite.add(engine.current.world, [
            ground,
            leftWall,
            rightWall,
            // TODO emojis go here
            ...emojis
        ]);

        // MOUSE EVENTS
        if (viewport.desktop) {
            const mouse = Mouse.create(
                scene.current as HTMLDivElement
            );

            // remove capturing scroll events, so I can scroll page normally
            const { mousewheel } = mouse as any; // type not up to date
            mouse.element.removeEventListener("wheel", mousewheel);

            Mouse.setScale(mouse, { x: 1, y: 1 });
            
            const mouseConstraint = MouseConstraint.create(engine.current, {
                mouse,
                constraint: {
                    stiffness: 0.2,
                    render: {
                        visible: false
                    }
                }
            });

            const circleSize = 40;
            const mouseCircle = Bodies.circle(
                -circleSize,
                -circleSize,
                circleSize,
                {
                    isSensor: true,
                    isStatic: true,
                    render: { visible: false }
                }
            )
            Events.on(mouseConstraint, 'mousemove', (event) => {
                Body.setPosition(mouseCircle, event.mouse.position);
                const foundPhysics = Query.collides(mouseCircle, emojis);
                foundPhysics.forEach(body => {
                    const targetAngle = Vector.angle(body.bodyA.position, event.mouse.position)
                    const forceMag = 0.015;
                    const force = {
                        x: Math.cos(targetAngle) * -forceMag,
                        y: Math.sin(targetAngle) * -forceMag
                    }
                    Body.applyForce(
                        body.bodyA,
                        event.mouse.position,
                        force
                    )
                })
                // TODO uncomment above w/ emojis

                // mouseCircle.position = { x: event.mouse.position.x, y: event.mouse.position.y }
            });

            composite.current = Composite.add(engine.current.world, [mouseConstraint, mouseCircle]);
        }
    };

    useEffect(() => {
        // SETUP
        // create a renderer
        const render = Render.create({
            element: scene.current as HTMLDivElement,
            engine: engine.current,
            options: {
                wireframes: false,
                width: containerWidth,
                height: containerHeight,
                background: `#${COLORS.bg1}`
            }
        });

        // run the renderer
        Render.run(render);
        Common.setDecomp(decomp);

        // Uncomment when testing w/out scrolltrigger
        // Runner.run(runner.current, engine.current);

        objectSetup();
        return () => {
            // CLEANUP
            Runner.stop(runner.current);
            Render.stop(render);
            if (composite.current) { Composite.clear(composite.current, true, true) };
            Engine.clear(engine.current);
            render.canvas.remove();
            render.textures = {};
        }
    }, []);

    const runRender = () => {
        // run the engine
        Runner.run(runner.current, engine.current);
    }

    useGSAP(() => {
        if (scene.current) {
            ScrollTrigger.create({
                trigger: scene.current,
                start: 'center bottom',
                end: 'center bottom',
                // markers: true,
                once: true,
                onEnter: () => runRender()
            });
        }
    }, { scope });

    return (
        <div
            ref={scene}
            className="matter-carrots-container"
            // style={{ maxHeight: `${containerHeight}px` }} // creates weird margin at bottom, but don't remember why I had it
        >
        </div>
    )
}

interface MatterEmojisProps {
    height: number,
    scope: React.RefObject<HTMLDivElement>
}

export { MatterEmojis }