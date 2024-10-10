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
    Vector
} from "matter-js";

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useViewportContext } from '../../contexts';
import { EMOJIS, EMOJIS_MOBILE } from './emojis';

const COLORS = {
    bg1: '060606'
}

const MatterEmojis = (props: MatterEmojisProps) => {
    const { height, orientationProps } = props;
    const { viewport, measurements } = useViewportContext();
    const { gamma, beta } = orientationProps;

    const [setupComplete, setSetupComplete] = useState(false);
    
    const objectNum = viewport.desktop ? 200 : 50;
    
    const containerWidth = measurements.width - (viewport.desktop ? 14 : 0); // 14 is scrollbar width
    const containerHeight = height;

    const timeoutRef = useRef<number>();
    // MATTER.JS REFS
    const scene = useRef<HTMLDivElement>(null);
    const engine = useRef(Engine.create());
    const composite = useRef<Composite>();
    const runner = useRef(Runner.create());
    
    const getTextures = (number: number) => {
        const ARR = viewport.desktop ? EMOJIS : EMOJIS_MOBILE;
        return Array.from(Array(number)).map((_, index) => 
            `matterjs/${ARR[index % ARR.length]}`
        )
    };

    const boundaryParams = {
        isStatic: true,
        render: {
            // strokeStyle: `red`, // for testing
            // fillStyle: `blue`,
            strokeStyle: `#${COLORS.bg1}`,
            fillStyle: `#${COLORS.bg1}`
        }
    }

    const wallThickness = 100; // can't be 0.1 or they clip out easily

    // mobile only
    const topWallSetup = () => {
        const timeout = setTimeout(() => {
            const topWall = Bodies.rectangle(
                containerWidth/2,
                0.1 - wallThickness/2,
                containerWidth,
                wallThickness,
                boundaryParams
            );
    
            composite.current = Composite.add(engine.current.world, [ topWall ]);
            setSetupComplete(true);
        }, 3000);
        timeoutRef.current = timeout;
    }

    const objectSetup = async () => {
        // ENVIRONMENT
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
        const textureScale = 0.7;
        const radius = 25;
        const textures = getTextures(objectNum);
        const emojis = textures.map((texture, index) => {
            const x = containerWidth * 0.8 + index * 0.01;
            const y = -100 * objectScale * index - 300;
            // const y = viewport.desktop
            //     ? (-100 * objectScale * index - 300)
            //     : index * radius;
            return Bodies.circle(x, y, radius,
            {
                friction: 0.001,
                frictionAir: 0.01,
                restitution: 0, // bouncing
                density: 0.0001,
                render: {
                    sprite: {
                        texture,
                        xScale: textureScale,
                        yScale: textureScale
                    }
                }
            });
        })

        // add all of the bodies to the world
        composite.current = Composite.add(engine.current.world, [
            ground,
            leftWall,
            rightWall,
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

                // mouseCircle.position = { x: event.mouse.position.x, y: event.mouse.position.y }
            });

            composite.current = Composite.add(engine.current.world, [mouseConstraint, mouseCircle]);
        }
    };

    const factor = 30;

    // Tilt controls
    const updateGravity = () => {
        if (!engine.current) return;
        
        const orientation = window.orientation;
        const { gravity } = engine.current;

        console.log(gamma, beta);

        if (orientation === 0) {
            gravity.x = Common.clamp(gamma!, -90, 90) / factor;
            gravity.y = Common.clamp(beta!, -90, 90) / factor;
        } else if (orientation === 180) {
            gravity.x = Common.clamp(gamma!, -90, 90) / factor;
            gravity.y = Common.clamp(-beta!, -90, 90) / factor;
        } else if (orientation === 90) {
            gravity.x = Common.clamp(beta!, -90, 90) / factor;
            gravity.y = Common.clamp(-gamma!, -90, 90) / factor;
        } else if (orientation === -90) {
            gravity.x = Common.clamp(-beta!, -90, 90) / factor;
            gravity.y = Common.clamp(gamma!, -90, 90) / factor;
        }
    }

    const runRender = () => {
        // run the engine
        Runner.run(runner.current, engine.current);
        if (!viewport.desktop && !setupComplete) {
            topWallSetup();
        }
    }

    useEffect(() => {
        // SETUP
        // create a renderer
        const render = Render.create({
            element: scene.current as HTMLDivElement,
            engine: engine.current,
            options: {
                wireframes: false,
                // wireframes: true,
                width: containerWidth,
                height: containerHeight,
                background: `#${COLORS.bg1}`
            }
        });

        if (!viewport.desktop) {
            // fix pixelated textures on mobile
            // const pixelRatio = 'auto' as any; // as any due to incorrect typing
            Render.setPixelRatio(render, 1.4); 
        }

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

            // If mobile, cleanup timeout
            if (!viewport.desktop) { clearTimeout(timeoutRef.current); }
        }
    }, []);

    // mobile only, for tilt controls
    useEffect(() => {
        if (!viewport.desktop && setupComplete && gamma && beta) { updateGravity() };
    }, [viewport, setupComplete, gamma, beta]);

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
    }, { scope: scene });

    return (
        <div
            ref={scene}
            className="matter-carrots-container"
        >
        </div>
    )
}

interface MatterEmojisProps {
    height: number,
    scope: React.RefObject<HTMLDivElement>,
    orientationProps: { gamma: number | null, beta: number | null }
}

export { MatterEmojis }