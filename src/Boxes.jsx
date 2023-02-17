import { useHelper } from '@react-three/drei';
import { useControls } from 'leva';
import { useRef } from 'react';
import { SpotLightHelper } from 'three';
import Box from "./Box"
import { getCoordinates } from "./Box"

export default function Boxes({ count, trigger }) {

    const { position } = useControls('', {
        position:
        {
            value: { x: 2, y: 5, z: 3 },
            step: 0.01,
            joystick: 'invertY'
        }
    })

    const directionalLight = useRef()
    useHelper(directionalLight, SpotLightHelper)

    let i = -1
    const theta = 360 / count

    return <>
        <spotLight
            ref={directionalLight}
            position={[position.x, position.y, position.z]}
            angle={0.2}
            distance={10}
            intensity={10} />
        <ambientLight intensity={0.5} />

        {[...Array(count)].map(() => {
            i++
            let { x, y } = getCoordinates(i * theta, 3)

            return <Box
                trigger={trigger}
                bTheta={i * theta}
                color={i * theta}
                key={i}
                position-z={x}
                position-y={y}
                rotation-z={3.6 * i}
                rotation-y={3.6 * i}
                scale={0.5}
            />
        })}
    </>
};

// export const getCoordinates = (angle, distance = 1) => {
//     angle *= Math.PI / 180
//     let x = distance * Math.cos(angle),
//         y = distance * Math.sin(angle)

//     return { x, y }
// }
