import { OrbitControls, Sphere, Text } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import gsap from 'gsap';
import { createRef, useEffect, useRef, useState } from 'react';
import { Box } from './Boxes'
import { Arrows } from './Arrows';

const duration = 2.5

const getCoordinates = (angle, distance = 6) => {
    angle *= Math.PI / 180
    let x = -distance * Math.cos(angle) + 1.87,
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


const Scene = () => {
    const count = 5
    const baseTheta = 360 / count

    const refs = useRef(
        Array.from({ length: count }).map(() => createRef())
    )

    let isRolling = false
    // const [isRolling, setIsRolling] = useState(false)
    const rollRight = (direction) => {
        isRolling = true

        direction ?
            //if true to right, if false to left
            boxesTheta.map((t, i) => { boxesTheta[i] = (t + 360 / 5) % 360 }) :
            boxesTheta.map((t, i) => { boxesTheta[i] = (t - 360 / 5) % 360 })
        refs.current.map((ref, i) => roll(boxesTheta[i], ref))
        setTimeout(() => {
            isRolling = false
        }, duration * 1000);
    }

    let boxesTheta = Array.from({ length: count }).map((_, i) => i * baseTheta)


    return <>
        <Arrows
            rightAction={(e) => isRolling ? null : rollRight(true)}
            leftAction={(e) => isRolling ? null : rollRight(false)}
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
    </>
}

export default function Experience() {
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
            {/* <Perf position='top-left' /> */}


            <ambientLight intensity={5} />
            {/* <axesHelper args={[2, 2, 2]} /> */}

            <Scene />
        </Canvas>
    </>
}

