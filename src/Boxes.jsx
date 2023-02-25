import { Float, useHelper } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useControls } from 'leva';
import { useEffect, useRef, useState } from 'react';
import { SpotLightHelper, Vector3 } from 'three';

const getCoordinates = (angle, distance = 6) => {
    angle *= Math.PI / 180
    let x = -distance * Math.cos(angle) + 1.75,
        y = -distance * Math.sin(angle)

    return { x, y, distance }
}

const Box = ({ onWheel, color, bTheta, ...props }) => {

    const [theta, setTheta] = useState(bTheta);

    useEffect(() => {
        if (onWheel) {
            roll(onWheel);
        }
    }, [onWheel]);

    const mesh = useRef()

    const roll = (e) => {

        setTheta((theta) => (theta + 360 / 5) % 360)
        // console.log(theta);
        const { x, y: z } = getCoordinates(theta)
        gsap.to(
            mesh.current.rotation,
            {
                duration: 1.5,
                ease: 'power2.inOut',
                y: x / 2,
            }
        )
        gsap.to(
            mesh.current.position,
            {
                duration: 1.5,
                ease: 'power2.inOut',
                x: x,
                z: z
            }
        )
        // mesh.current.rotation.y = x / 2
        // mesh.current.position.x = x
        // mesh.current.position.z = z

        // if (color == 0) {
        //     console.log({
        //         theta: color,
        //         rX: mesh.current.rotation.x,
        //         rY: mesh.current.rotation.y,
        //         rZ: mesh.current.rotation.z,
        //     });
        // }
    }

    // useFrame((state, delta) => {

    //     setTheta((theta) => (theta + delta * 20) % 360)
    //     // console.log(theta);
    //     const { x, y: z } = getCoordinates(theta)

    //     mesh.current.rotation.y = x / 2
    //     mesh.current.position.x = x
    //     mesh.current.position.z = z
    // })

    return <>

        <mesh
            ref={mesh}
            {...props}
        >
            <boxGeometry args={[2, 2.5, 1]} />
            <meshStandardMaterial metalness={0} roughness={0} color={`rgb(${color + 100},0,0)`} />
        </mesh>
    </>
};


export const Boxes = ({ count, onWheel }) => {
    const theta = 360 / count

    return <>
        {[...Array(count)].map((ref, i) => {
            let { x, y } = getCoordinates(i * theta)

            return <Box
                onWheel={onWheel}
                bTheta={i * theta}
                color={i * theta}
                key={i}
                position-x={x}
                position-z={y}
                rotation-y={Math.PI * i}
                scale={1}
            />
        })}
    </>
};