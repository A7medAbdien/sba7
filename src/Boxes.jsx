import { useHelper } from '@react-three/drei';
import { useControls } from 'leva';
import { useEffect, useRef } from 'react';
import { SpotLightHelper } from 'three';
import Box from "./Box"
import { getCoordinates } from "./Box"

export default function Boxes({ count, trigger }) {

    const { position, target } = useControls('', {
        position:
        {
            value: { x: 3, y: 5.5, z: 0.5 },
            step: 0.01,
            joystick: 'invertY'
        },
        target:
        {
            value: { x: 0.3, y: 0, z: -2.5 },
            step: 0.01,
            joystick: 'invertY'
        }
    })

    const spotLight = useRef()
    // useHelper(spotLight, SpotLightHelper)
    useEffect(() => {
        spotLight.current.target.updateMatrixWorld()
    })

    let i = -1
    const theta = 360 / count

    return <>
        <spotLight
            ref={spotLight}
            position={[position.x, position.y, position.z]}
            angle={0.3}
            distance={15}
            intensity={10}
            target-position={[target.x, target.y, target.z]}
        />
        <ambientLight intensity={0.1} />

        {[...Array(count)].map(() => {
            i++
            let { x, y } = getCoordinates(i * theta)

            return <Box
                trigger={trigger}
                bTheta={i * theta}
                color={i * theta}
                key={i}
                position-z={x}
                position-y={y}
                rotation-z={3.6 * i}
                rotation-y={3.6 * i}
                scale={1}
            />
        })}
    </>
};