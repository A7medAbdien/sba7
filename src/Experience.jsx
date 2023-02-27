import { OrbitControls, Sphere, SpotLight, Text, useHelper } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import gsap from 'gsap';
import { createRef, useEffect, useRef, useState } from 'react';
import { Box } from './Boxes'
import { Arrows } from './Arrows';
import { useControls } from 'leva';
import { SpotLightHelper } from 'three';
import { Leva } from 'leva'

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
    let boxesTheta = Array.from({ length: count }).map((_, i) => i * baseTheta)
    let isRolling = false

    const refs = useRef(
        Array.from({ length: count }).map(() => createRef())
    )

    const rollAll = (direction) => {
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


    const { position, target, decay, penumbra } = useControls('', {
        position:
        {
            value: { x: 3, y: 5.5, z: 0.5 },
            step: 0.01,
            joystick: 'invertY'
        },
        target:
        {
            value: { x: 0.8, y: 0, z: -6 },
            step: 0.01,
            joystick: 'invertY'
        },
        decay:
        {
            value: 2,
            step: 0.01,
            min: 0,
            max: 5
        },
        penumbra:
        {
            value: 1,
            step: 0.01,
            min: 1,
            max: 2
        }
    })

    const spotLight = useRef()
    // useHelper(spotLight, SpotLightHelper)
    return <>

        <SpotLight
            ref={spotLight}
            attenuation={5}
            decay={decay}
            penumbra={penumbra}
            position={[position.x, position.y, position.z]}
            angle={0.3}
            distance={15}
            intensity={10}
            target-position={[target.x, target.y, target.z]}
        />

        <Arrows
            rightAction={(e) => isRolling ? null : rollAll(true)}
            leftAction={(e) => isRolling ? null : rollAll(false)}
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
        <Leva hidden />
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

            {/* <axesHelper args={[2, 2, 2]} /> */}
            <ambientLight intensity={0.2} />

            <Scene />
        </Canvas>
    </>
}

