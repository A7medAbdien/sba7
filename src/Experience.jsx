import { OrbitControls, Sphere } from '@react-three/drei';
import { Canvas } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import gsap from 'gsap';
import { createRef, useEffect, useRef, useState } from 'react';
import { Box } from './Boxes'

const duration = 2.5

const getCoordinates = (angle, distance = 6) => {
    angle *= Math.PI / 180
    let x = -distance * Math.cos(angle) + 1.75,
        y = -distance * Math.sin(angle)

    return { x, y, distance }
}

const roll = (theta, ref) => {
    const { x, y: z } = getCoordinates(theta)
    gsap.to(
        ref.current.rotation,
        {
            duration: duration,
            ease: 'power2.inOut',
            y: x / 2,
        }
    )
    gsap.to(
        ref.current.position,
        {
            duration: duration,
            ease: 'power2.inOut',
            x: x,
            z: z
        }
    )
}

export default function Experience() {
    const count = 5
    const baseTheta = 360 / count
    let boxesTheta = Array.from({ length: count }).map((r, i) => i * baseTheta)

    const refs = useRef(
        Array.from({ length: count }).map(() => createRef())
    )
    const scrollRef = useRef()

    // useEffect(() => {
    //     const handleScroll = event => {

    //         element.removeEventListener('scroll', handleScroll);

    //         boxesTheta.map((t, i) => { boxesTheta[i] = (t + 360 / 5) % 360 })
    //         refs.current.map((ref, i) => roll(boxesTheta[i], ref))

    //         setTimeout(() => {
    //             element.addEventListener('scroll', handleScroll);
    //         }, duration * 1000);
    //     };

    //     const element = scrollRef.current;

    //     element.addEventListener('scroll', handleScroll);
    // }, [])
    // const [isRolling, setIsRolling] = useState(false)
    let isRolling = false
    const rollRight = (direction) => {
        isRolling = true

        direction ?
            //if true to right, if false to left
            boxesTheta.map((t, i) => { boxesTheta[i] = (t + 360 / 5) % 360 }) :
            boxesTheta.map((t, i) => { boxesTheta[i] = (t - 360 / 5) % 360 })
        refs.current.map((ref, i) => roll(boxesTheta[i], ref))
        setTimeout(() => {
            isRolling = false
        }, 2000);
    }

    return <>
        <Canvas camera={{
            fov: 40,
            near: 0.1,
            far: 100,
            // position: [0, 20, 5]
            position: [0, 0, 2]
        }}
        >
            {/* <OrbitControls /> */}
            <Perf position='top-left' />


            <ambientLight intensity={5} />
            <axesHelper args={[2, 2, 2]} />

            <Sphere
                scale={0.25}
                position={[1, 0, 0]}
                onClick={(e) => isRolling ? null : rollRight(true)}
            />

            <Sphere
                scale={0.25}
                position={[-1, 0, 0]}
                onClick={(e) => isRolling ? null : rollRight(false)}
            />

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
        </Canvas>
        {/* <div className="container">
            <div
                ref={scrollRef}
                className="scroll">
                <div style={{ height: `200vh`, pointerEvents: 'none' }}></div>
            </div>
        </div> */}
    </>
}

