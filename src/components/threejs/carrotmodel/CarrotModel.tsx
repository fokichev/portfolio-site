import './CarrotModel.scss';

import { useRef, useState } from 'react';

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';

import { Mesh } from 'three';
import { OrbitControls as OrbitControlsType } from 'three-stdlib';
import { Canvas } from '@react-three/fiber';
import {
    Environment,
    Float,
    MeshTransmissionMaterial,
    OrbitControls,
    PerformanceMonitor,
    PerspectiveCamera,
    useCubeTexture,
    useGLTF,
} from '@react-three/drei';
import {
    Bloom,
    EffectComposer,
    
} from '@react-three/postprocessing';
import { useCursorContext, useViewportContext } from '../../../contexts';

const CarrotModel = () => {
    const { viewport } = useViewportContext();
    const { onHoverClickable } = useCursorContext();

    const containerRef = useRef<HTMLDivElement>(null);
    const orbitControlsRef = useRef<OrbitControlsType>(null);
    
    // const [env, setEnv] = useState({
    //     rot: { x: 4.39, y: 8.07, z: 10 },
    //     str: 35 // 50 for black sections TODO
    //     // str: 50
    // });
    const env = {
        rot: { x: 4.39, y: 8.07, z: 10 },
        str: 35 // 50 for black sections TODO
        // str: 50
    };
    const [dpr, setDpr] = useState(1.5);

    const envMap = useCubeTexture([
        '1env.png',
        '2env.png',
        '3env.png',
        '4env.png',
        '5env.png',
        '6env.png'
    ], { path: `/models/carrot/envMap/${viewport.mobile ? "mobile" : "desktop"}/` });

    const convertToAzimuthalAngle = (val: number, rot: number): number  => {
        rot; // temp
        // const progress = (val * rot) % 1;
        const progress = val;
        if (progress <= 0.5) {
            return -Math.PI * (val * 2);
        } else {
            return Math.PI * ((1 - val) * 2);
        }
    }

    useGSAP(() => {
        if (containerRef.current) {
            const start = `${viewport.desktop ? 'top' : '-100%'} center`;
            const end = `${viewport.desktop ? 'bottom' : '150%'} center`
            ScrollTrigger.create({
                start, end,
                trigger: containerRef.current,
                scrub: 1,
                // markers: true,
                onUpdate: (self) => {
                    if (orbitControlsRef.current) {
                        const angle = convertToAzimuthalAngle(self.progress, 0.5);
                        orbitControlsRef.current?.setAzimuthalAngle(angle);
                    }
                }
            });
        }
    }, { scope: containerRef });

    const onChangePerformance = ({ factor }: { factor: number }) => {
        const newDpr = factor * 1.5 + (viewport.desktop ? 0.5 : 0);
        setDpr(Math.round(newDpr * 10) / 10);
    }

    return (
        <div
            className='carrot-model'
            ref={containerRef}
            onMouseEnter={() => onHoverClickable(true)}
            onMouseLeave={() => onHoverClickable(false)}
        >
            <Canvas
                gl={{ alpha: true }}
                style={viewport.desktop ? {} : {
                    touchAction: 'pan-y',
                    pointerEvents: 'none'
                }}
                dpr={dpr}
            >
                <PerformanceMonitor onChange={onChangePerformance}>
                    <EffectComposer>
                        <Bloom
                            opacity={0.01}
                            intensity={4}
                        />
                    </EffectComposer>
                    <PerspectiveCamera makeDefault fov={40} position={[0,0,3]} />
                    {/* <CameraControls /> */}
                    <OrbitControls
                        ref={orbitControlsRef}
                        enableZoom={false}
                        enablePan={false}
                    />
                    <Environment
                        map={envMap}
                        environmentIntensity={env.str}
                        environmentRotation={[env.rot.x,env.rot.y,env.rot.z]}
                    />
                    <Float floatIntensity={1}>
                        <Model/>
                    </Float>
                </PerformanceMonitor>
            </Canvas>
        </div>
    )
}

const Model = () => {
    const { scene } = useGLTF('models/carrot/carrot-model.glb');

    const child = scene.children[0] as Mesh;
    return (
        <group scale={2}>
                <mesh
                    geometry={child.geometry}
                    position={child.position}
                >
                    <MeshTransmissionMaterial
                        // transmission={1}
                        // thickness={1}
                        // roughness={0.01}
                        // chromaticAberration={0.05}
                        // anisotropy={0.5}
                        // distortion={0.1}
                        // distortionScale={0.5}
                        // temporalDistortion={0.2}
                        // ior={1.5}
                        // attenuationDistance={4}
                        // attenuationColor="white"
                        // opacity={0.5}
                        // transparent={true}
                        transmission={1}
                        thickness={1}
                        roughness={0.01}
                        chromaticAberration={0.05}
                        anisotropy={0.5}
                        distortion={0.1}
                        distortionScale={0.5}
                        temporalDistortion={0.2}
                        ior={1.5}
                        attenuationDistance={4}
                        attenuationColor="white"
                        opacity={0.5}
                        transparent={true}
                    />
                </mesh>
        </group>
    )
}

export { CarrotModel };