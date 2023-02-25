import { Float, ScrollControls, useHelper } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useControls } from 'leva';
import { createRef, forwardRef, useEffect, useRef, useState } from 'react';
import { SpotLightHelper, Vector3 } from 'three';

const getCoordinates = (angle, distance = 6) => {
    angle *= Math.PI / 180
    let x = -distance * Math.cos(angle) + 1.75,
        y = -distance * Math.sin(angle)

    return { x, y, distance }
}

const Box = forwardRef(({ onWheel, color, bTheta, ...props }, ref) => {

    const [theta, setTheta] = useState(bTheta);

    const roll = (theta) => {
        console.log(theta);
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
        roll(theta);
    }, [onWheel]);

    return <>
        <mesh ref={ref} {...props}>
            <boxGeometry args={[2, 2.5, 1]} />
            <meshStandardMaterial metalness={0} roughness={0} color={`rgb(${color + 100},0,0)`} />
        </mesh>
    </>
})


export const Boxes = ({ count, onWheel }) => {
    const refs = useRef(
        Array.from({ length: count }).map(() => createRef())
    );

    const theta = 360 / count
    const bTheta = Array.from({ length: count }).map((r, i) => i * theta)
    return <>
        <ScrollControls>
            {refs.current.map((ref, i) => {
                let { x, y } = getCoordinates(i * theta)

                return <Box
                    ref={ref}
                    onWheel={onWheel}
                    bTheta={bTheta}
                    color={i * theta}
                    key={i}
                    position-x={x}
                    position-z={y}
                    rotation-y={x / 2}
                    scale={1}
                />
            })}
        </ScrollControls>
    </>
};