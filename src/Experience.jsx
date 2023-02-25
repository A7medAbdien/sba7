import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import { useEffect, useRef, useState } from 'react'
import { Boxes } from './Boxes'


export default function Experience() {
    const [wheelListener, setWheelListener] = useState();
    const ref = useRef()
    // useEffect(() => {
    //     const handleClick = event => {
    //         console.log('Button clicked');
    //     };

    //     const element = ref.current;

    //     element.addEventListener('scroll', handleClick);
    // })

    return <>
        <Canvas
            camera={{
                fov: 40,
                near: 0.1,
                far: 100,
                position: [0, 20, 5]
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

            <Boxes onWheel={wheelListener} count={1} />
        </Canvas>
        {/* <div className="container">
            <div
                ref={ref}
                // onScroll={(e) => (console.log('helo'))}
                className="scroll">
                <div style={{ height: `200vh`, pointerEvents: 'none' }}></div>
            </div>
        </div> */}
    </>
}

