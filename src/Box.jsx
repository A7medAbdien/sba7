import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three';


export default function Box(props) {

    const scroll = useScroll()
    const mesh = useRef()

    // console.log(scroll)
    useFrame((state, delta) => {
        // const offset = 1 - scroll.offset
        // state.camera.position.y = - scroll.offset * 16
        mesh.current.rotateOnAxis(new THREE.Vector3(-1, 1, 0), delta)
        // state.camera.lookAt(0, 0, 0)
    })
    return <>
        <mesh ref={mesh} {...props}>
            <boxGeometry args={[2, 2.5, 1]} />
            <meshNormalMaterial />
        </mesh>
    </>
};