import { Canvas } from '@react-three/fiber'
import { OrbitControls, ScrollControls } from '@react-three/drei'
import Boxes from './Boxes'
import { Perf } from 'r3f-perf'

export default function Experience() {
    // const goNext = () => {
    //     console.log('ih');
    // }

    return <>
        <Canvas
            // onWheel={(e) => goNext()}
            camera={{
                fov: 45,
                near: 0.1,
                far: 100,
                // position: [ -3, 1.5, 4 ]
            }}
        >
            <OrbitControls />
            <Perf position='top-left' />
            <axesHelper args={[2, 2, 2]} />

            <ScrollControls pages={5}>
                <Boxes count={5} />
            </ScrollControls>
        </Canvas>
    </>
}