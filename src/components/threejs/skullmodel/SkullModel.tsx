import './SkullModel.scss';

import { AmbientLight, Mesh } from 'three';
import { Canvas, useLoader } from '@react-three/fiber';
import { SpotLight, useGLTF, PerspectiveCamera, OrbitControls, useTexture } from '@react-three/drei';
import { GLTFLoader, OBJLoader } from 'three/examples/jsm/Addons.js';

const SkullModel = () => {
    return (
        <div className='skull-model'>
            <Canvas

            >
                {/* <SpotLight /> */}
                {/* <camera /> */}
                <PerspectiveCamera makeDefault position={[0,0,10]}/>
                <OrbitControls
                        // ref={orbitControlsRef}
                        // enableZoom={false}
                        // enablePan={false}
                    />
                {/* <ambientLight intensity={1}/> */}
                <pointLight position={[0,0,10]} intensity={80}/>
                <Model />
            </Canvas>
        </div>
    )
}

const Model = () => {
    const { nodes } = useGLTF('models/skull/human-skull.glb');
    const { human_skull_1: skullBone, human_skull_2: jawBone } = nodes;
    const meshes = [skullBone, jawBone] as Mesh[];

    const color = '#FFFFFF'; //BDB6B0

    return (
        <>
            { meshes.map(mesh => (
                <mesh geometry={mesh.geometry}>
                    <meshStandardMaterial
                        color={color}
                        roughnessMap={(mesh.material  as any).roughnessMap}
                    />
                </mesh>
            ))}
        </>
    )
}

export { SkullModel }