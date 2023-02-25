import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import { useState } from 'react'
import { Boxes } from './Boxes'


export default function Experience() {
    const [wheelListener, setWheelListener] = useState();

    return <>
        <Canvas
            camera={{
                fov: 40,
                near: 0.1,
                far: 20,
                position: [0, 8, 5]
                // position: [0, 0, 2]
            }}
            onWheel={(e) => {
                setWheelListener(e);
            }}
        >
            {/* <OrbitControls /> */}
            <Perf position='top-left' />


            <ambientLight intensity={5} />
            <axesHelper args={[2, 2, 2]} />

            <Boxes onWheel={wheelListener} count={5} />
        </Canvas>
    </>
}

