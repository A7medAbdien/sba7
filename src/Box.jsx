import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three';


export default function Box(props) {

    const scroll = useScroll()
    const mesh = useRef()

    useFrame((state, delta) => {
        const offset = 1 - scroll.offset
        state.camera.position.y = - scroll.offset * 16
        mesh.current.rotation.x = scroll.offset * Math.PI * 2
        mesh.current.rotation.y = scroll.offset * Math.PI * 2
    })

    return <>
        <mesh ref={mesh} {...props}>
            <boxGeometry args={[2, 2.5, 1]} />
            <meshNormalMaterial />
        </mesh>
    </>
};