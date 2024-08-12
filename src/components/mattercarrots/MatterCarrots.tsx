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

const COLORS = {
    bg1: '060606',
    c1: '0075BC',
    c2: 'A0EAF2',
    c3: 'F28379',
    c4: '8C0303',
    c5: 'F2620F',
    c6: 'F250A9',
    c7: 'D90404'
}

const MatterCarrots = (props: MatterCarrotsProps) => {
    const { height, scope } = props;
    
    const containerWidth = document.getElementsByTagName('html')[0].clientWidth;
    const containerHeight = height;
    const [svgPaths, setSvgPaths] = useState<SVGPathElement[]>([]);

    // MATTER.JS REFS
    const scene = useRef<HTMLDivElement>(null);
    const engine = useRef(Engine.create());
    const composite = useRef<Composite>();
    const runner = useRef(Runner.create());

    // FUNCTIONS
    const fetchSVG = async ({ path }: { path: string }) => {
        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error("Can't fetch SVG path")
            }
            const svgText = await response.text();
            const svgDoc = (new DOMParser()).parseFromString(svgText, 'image/svg+xml');
            return svgDoc
        } catch (error) {
            console.error('Error fetching or parsing SVG:', error);
        }
    }
    
    const createColoredSvg = async ({ path, color }: { path: string, color: string }) => {
        const svgDoc = await fetchSVG({ path });
        if (!svgDoc) { return null }
        const paths = svgDoc.querySelectorAll('path');
    
        paths.forEach(path => {
          path.setAttribute('fill', color);
        });
    
        const serializer = new XMLSerializer();
        return serializer.serializeToString(svgDoc);
    }
    
    const createSvgUrl = ({ svgContent }: { svgContent: string }) => {
        const blob = new Blob([svgContent], { type: 'image/svg+xml' });
        return URL.createObjectURL(blob);
    };

    const parseSVG = async (path: string) => {
        try {
            const svgDoc = await fetchSVG({ path })
            if (!svgDoc) { throw new Error("Failed to fetch " + path) }
            const pathElements = svgDoc.querySelectorAll('path');
            const pathData = Array.from(pathElements)
                .filter(path => path !== null); // type safe filtering
            setSvgPaths(pathData);
        } catch (error) {
            console.error('Error fetching or parsing SVG:', error);
        }
    }

    const objectSetup = async () => {
        // OBJECTS
        const createSvg = async (color: string, index: number) => {
            const textureSvg = await createColoredSvg({ path: 'carrot-texture.svg', color });
            const texture = textureSvg ? createSvgUrl({ svgContent: textureSvg }) : 'carrot-texture.svg';
            const objectScale = 0.2;
            const svgVertices = svgPaths
                .map(path => Svg.pathToVertices(path, 15)
                    .map(vec => ({ x: vec.x * objectScale, y: vec.y * objectScale }))
                );
            const x = containerWidth*0.8;
            const y = -100*objectScale*index - 300;
            return Bodies.fromVertices(
                x, y,
                svgVertices,
                    {
                        angle: (index*10)/57.295,
                        friction: 0.001,
                        frictionAir: 0.01,
                        restitution: 0, // bouncing
                        density: 0.0001,
                        render: {
                            sprite: {
                                texture,
                                xScale: objectScale,
                                yScale: objectScale
                            }
                        }
                    }
                );
        }

        const colors = Array.from(Array(200))
            .map((_, index) => `#${COLORS[`c${Math.abs((index % 6) + 1)}` as keyof typeof COLORS]}`);
        
        const SVGs = await Promise.all(colors
            .map(async (color, index) => await createSvg(color, index))
        );

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

        // add all of the bodies to the world
        composite.current = Composite.add(engine.current.world, [
            ground,
            leftWall,
            rightWall,
            ...SVGs
        ]);

        // MOUSE EVENTS
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
            const foundPhysics = Query.collides(mouseCircle, SVGs);
            foundPhysics.forEach(body => {
                const targetAngle = Vector.angle(body.bodyA.position, event.mouse.position)
                const forceMag = 0.01;
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
    };

    useEffect(() => {
        // TODO dynamically resize width
        // window.addEventListener("resize", function(){
        //     console.log(containerWidth);
        //     render.options.width = containerWidth;
        //     Render.run(render);
        // });

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

        parseSVG('carrot.svg');
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

    useEffect(() => {
        if (svgPaths.length) {
            objectSetup();
        }
    }, [svgPaths]);

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

interface MatterCarrotsProps {
    height: number,
    scope: React.RefObject<HTMLDivElement>
}

export { MatterCarrots}