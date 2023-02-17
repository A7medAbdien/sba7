import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import { useState } from 'react'
import Boxes from './Boxes'


export default function Experience() {
    const [trigger, setTrigger] = useState();

    return <>
        <Canvas
            camera={{
                fov: 40,
                near: 0.1,
                far: 20,
                position: [0, 0, 2]
            }}
            onWheel={(e) => {
                setTrigger(e);
            }}
        >
            {/* <OrbitControls /> */}
            {/* <Perf position='top-left' /> */}
            {/* <axesHelper args={[2, 2, 2]} /> */}

            <Boxes trigger={trigger} count={5} />
        </Canvas>
    </>
}

