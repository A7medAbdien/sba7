import { OrbitControls, ScrollControls, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import Box from './Box'

export default function Experience() {
    return <>
        {/* <OrbitControls makeDefault /> */}
        <axesHelper args={[2, 2, 2]} />
        <ScrollControls>
            <Box />
            <Box position={[0, -3, 0]} />
        </ScrollControls>
    </>
}