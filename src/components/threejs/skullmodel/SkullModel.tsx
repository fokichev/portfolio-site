import './SkullModel.scss';

import { Group, Mesh, Object3DEventMap } from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera, OrbitControls} from '@react-three/drei';
import { useRef } from 'react';
import { useMousePositionContext, useViewportContext } from '../../../contexts';

const SkullModel = () => {
    return (
        <div className='skull-model'>
            <Canvas>
                <PerspectiveCamera makeDefault fov={30} position={[0,1,10]}/>
                <OrbitControls
                        enableRotate={false}
                        enableZoom={false}
                        enablePan={false}
                    />
                {/* <ambientLight intensity={1}/> */}
                <pointLight position={[0,0,10]} intensity={80}/>
                <Model/>
            </Canvas>
        </div>
    )
}

const Model = () => {
    const { nodes } = useGLTF('models/skull/human-skull.glb');
    const { human_skull_1: skullBone, human_skull_2: jawBone } = nodes;
    const meshes = [skullBone, jawBone] as Mesh[];
    const color = '#FFFFFF'; //BDB6B0

    // mouse movement logic
    const groupRef = useRef<Group<Object3DEventMap>>(null);
    const { x, y } = useMousePositionContext();
    const { measurements } = useViewportContext();
    const { width, height } = measurements;
    const pi = Math.PI;
    const factor = 0.7;

    const getRotation = () => {
        const percentageX = x/width - 0.5;
        const percentageY = y/height - 0.5;
        const rotX = percentageY * (pi/2 * factor);
        const rotY = percentageX * (pi * factor);

        return [ rotX, rotY, 0, 'YXZ' ] as [ number, number, number, 'YXZ' ]
    }
    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.set(...getRotation());
        }
    })

    return (
        <group ref={groupRef}>
            { meshes.map(mesh => (
                <mesh geometry={mesh.geometry}>
                    <meshStandardMaterial
                        color={color}
                        roughnessMap={(mesh.material  as any).roughnessMap}
                    />
                </mesh>
            ))}
        </group>
    )
}

export { SkullModel }