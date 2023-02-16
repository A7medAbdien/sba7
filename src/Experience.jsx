import { OrbitControls, ScrollControls, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import Box from './Box'

export default function Experience() {
    return <>
        <OrbitControls makeDefault />
        <axesHelper args={[2, 2, 2]} />


        {/* <ScrollControls pages={2}> */}
        <Box />
        {/* <Box position={[0, -4, 0]} />
            <Box position={[0, -8, 0]} />
            <Box position={[0, -12, 0]} />
            <Box position={[0, -16, 0]} /> */}
        {/* </ScrollControls> */}
    </>
}