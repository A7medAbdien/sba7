import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import gsap from 'gsap';
import { createRef, forwardRef, useEffect, useRef, useState } from 'react';
import { Box } from './Boxes'

const getCoordinates = (angle, distance = 6) => {
    angle *= Math.PI / 180
    let x = -distance * Math.cos(angle) + 1.75,
        y = -distance * Math.sin(angle)

    return { x, y, distance }
}


export const Boxes = ({ count, onWheel }) => {

    const baseTheta = 360 / count
    const boxesTheta = Array.from({ length: count }).map((r, i) => i * baseTheta)

    const refs = useRef(
        Array.from({ length: count }).map(() => createRef())
    )

    const [theta, setTheta] = useState(boxesTheta);

    const roll = (theta, ref) => {
        const { x, y: z } = getCoordinates(theta)
        gsap.to(
            ref.current.rotation,
            {
                duration: 1.5,
                ease: 'power2.inOut',
                y: x / 2,
            }
        )
        gsap.to(
            ref.current.position,
            {
                duration: 1.5,
                ease: 'power2.inOut',
                x: x,
                z: z
            }
        )
    }

    useEffect(() => {
        setTheta((theta) => theta.map((t) => (t + 360 / 5) % 360))
        refs.current.map((ref, i) => roll(theta[i], ref))
        // roll(theta);
    }, [onWheel]);

    return <>
        {refs.current.map((ref, i) => {
            let { x, y } = getCoordinates(i * baseTheta)

            return <Box
                key={i}
                ref={ref}
                color={i * baseTheta}
                position-x={x}
                position-z={y}
                rotation-y={x / 2}
                scale={1}
            />
        })}
    </>
};

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

            <Boxes onWheel={wheelListener} count={5} />
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

