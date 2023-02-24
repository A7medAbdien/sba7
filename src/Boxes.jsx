import { Float, useHelper } from '@react-three/drei';
import { useControls } from 'leva';
import { useEffect, useRef, useState } from 'react';
import { SpotLightHelper } from 'three';
// import Box from "./Box"
// import { getCoordinates } from "./Box"

const Box = (props) => {

    let { trigger, color } = props
    const [theta, setTheta] = useState(props.bTheta);

    useEffect(() => {
        if (trigger) {
            roll(trigger);
        }
    }, [trigger]);

    const mesh = useRef()

    const roll = (e) => {
        const { x, y: z, distance } = getCoordinates(theta)

        e.altKey ?
            setTheta((theta) => (theta - 2) % 360) :
            setTheta((theta) => (theta + 2) % 360)
        // mesh.current.rotation.x = x + distance
        mesh.current.rotation.y = x + distance
        mesh.current.position.x = x
        mesh.current.position.z = z
        if (color == 0) {
            console.log({
                theta: color,
                rX: mesh.current.rotation.x,
                rY: mesh.current.rotation.y,
                rZ: mesh.current.rotation.z,
            });
        }
    }

    return <>
        {/* <Float
            speed={1.5}
            rotationIntensity={0.5}
            floatingRange={[0, 0.01]}
        > */}
        <mesh
            ref={mesh}
            {...props}
        >
            <boxGeometry args={[2, 2.5, 1]} />
            <meshStandardMaterial metalness={0} roughness={0} color={`rgb(${color + 100},0,0)`} />
        </mesh>
        {/* </Float> */}
    </>
};


const getCoordinates = (angle, distance = 3.5) => {
    angle *= Math.PI / 180
    let x = -distance * Math.cos(angle),
        y = -distance * Math.sin(angle)

    return { x, y, distance }
}

export default function Boxes({ count, trigger }) {

    // const { position, target } = useControls('', {
    //     position:
    //     {
    //         value: { x: 3, y: 5.5, z: 0.5 },
    //         step: 0.01,
    //         joystick: 'invertY'
    //     },
    //     target:
    //     {
    //         value: { x: 0.3, y: 0, z: -2.5 },
    //         step: 0.01,
    //         joystick: 'invertY'
    //     }
    // })

    const spotLight = useRef()
    // useHelper(spotLight, SpotLightHelper)
    useEffect(() => {
        // spotLight.current.target.updateMatrixWorld()
    })

    const theta = 360 / count

    return <>

        <ambientLight intensity={5} />

        {[...Array(count)].map((ref, i) => {
            let { x, y } = getCoordinates(i * theta)

            return <Box
                trigger={trigger}
                bTheta={i * theta}
                color={i * theta}
                key={i}
                position-x={x}
                position-z={y}
                // rotation-z={3.6 * i}
                rotation-y={Math.PI * i}
                scale={1}
            />
        })}
    </>
};