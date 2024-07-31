import './CarrotModel.scss';

import { useState } from 'react';

import { Mesh } from 'three';
import { Canvas } from '@react-three/fiber';
import {
    CameraControls,
    Environment,
    Float,
    MeshTransmissionMaterial,
    PerspectiveCamera,
    useCubeTexture,
    useGLTF,
} from '@react-three/drei';
import {
    Bloom,
    EffectComposer,
    
} from '@react-three/postprocessing';

const CarrotModel = () => {
    const [env, setEnv] = useState({
        rot: { x: 4.39, y: 8.07, z: 10 },
        str: 35 // 50 for black sections TODO
    })
    const envMap = useCubeTexture([
        '1env.png',
        '2env.png',
        '3env.png',
        '4env.png',
        '5env.png',
        '6env.png'
    ], { path: '/model/envMap/' });
    return (
        <div className='carrot-model'>
            <Canvas
                gl={{ alpha: true }}
                
            >
                <EffectComposer>
                    <Bloom
                        opacity={0.01}
                        intensity={4}
                    />
                </EffectComposer>
                <PerspectiveCamera makeDefault fov={40} position={[0,0,3]} />
                {/* <CameraControls /> */}
                <Environment
                    map={envMap}
                    environmentIntensity={env.str}
                    environmentRotation={[env.rot.x,env.rot.y,env.rot.z]}
                />
                <Float floatIntensity={1}>
                    <Model/>
                </Float>
            </Canvas>
            
        </div>
    )
}

const Model = () => {
    const { scene } = useGLTF('model/carrot-model.glb');

    const nodes = [] as Mesh[];

    scene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        nodes.push(child as Mesh);
      }
    });
    return (
        <group scale={2}>
            {nodes.map((child, index) => (
                <mesh
                    key={index}
                    geometry={child.geometry}
                    position={child.position}
                >
                <MeshTransmissionMaterial
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
            ))}
        </group>
    )
}

export { CarrotModel };