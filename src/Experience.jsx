import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Boxes from './Boxes'
import { Perf } from 'r3f-perf'

export default function Experience() {
    return <>
        <Canvas
            onWheel={(e) => console.log(e)}
            camera={{
                fov: 45,
                near: 0.1,
                far: 100,
                position: [0, 0, 9]
            }}
        >
            {/* <OrbitControls /> */}
            <Perf position='top-left' />
            <axesHelper args={[2, 2, 2]} />

            <Boxes count={5} />
        </Canvas>
    </>
}