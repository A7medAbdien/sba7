import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import gsap from 'gsap';
import { createRef, useEffect, useRef, useState } from 'react';
import { Box } from './Boxes'

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

export default function Experience() {
    const count = 5
    const baseTheta = 360 / count
    let boxesTheta = Array.from({ length: count }).map((r, i) => i * baseTheta)

    const refs = useRef(
        Array.from({ length: count }).map(() => createRef())
    )
    const scrollRef = useRef()

    useEffect(() => {
        const handleScroll = event => {

            element.removeEventListener('scroll', handleScroll);

            boxesTheta.map((t, i) => { boxesTheta[i] = (t + 360 / 5) % 360 })
            refs.current.map((ref, i) => roll(boxesTheta[i], ref))

            setTimeout(() => {
                element.addEventListener('scroll', handleScroll);
            }, 1500);
        };

        const element = scrollRef.current;

        element.addEventListener('scroll', handleScroll);
    }, [])

    return <>
        <Canvas camera={{ position: [0, 20, 5] }}>
            {/* <OrbitControls /> */}
            <Perf position='top-left' />


            <ambientLight intensity={5} />
            <axesHelper args={[2, 2, 2]} />

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
        <div className="container">
            <div
                ref={scrollRef}
                className="scroll">
                <div style={{ height: `200vh`, pointerEvents: 'none' }}></div>
            </div>
        </div>
    </>
}

