import { useEffect, useRef, useState } from 'react'
import { Float } from '@react-three/drei'
export default function Box(props) {

    let { trigger, color } = props
    const [theta, setTheta] = useState(props.bTheta);

    useEffect(() => {
        if (trigger) {
            roll(trigger);
        }
    }, [trigger]);

    const mesh = useRef()

    const roll = (e) => {
        const { x: z, y, distance } = getCoordinates(theta)

        e.altKey ?
            setTheta((theta) => (theta - 2) % 360) :
            setTheta((theta) => (theta + 2) % 360)
        mesh.current.rotation.z = z + distance
        mesh.current.rotation.y = -y
        mesh.current.position.z = z
        mesh.current.position.y = y
        // if (color == 0) {
        //     console.log({
        //         theta: color,
        //         rX: mesh.current.rotation.x,
        //         rY: mesh.current.rotation.y,
        //         rZ: mesh.current.rotation.z,
        //     });
        // }
    }

    return <>
        <Float
            speed={1.5}
            rotationIntensity={0.5}
            floatingRange={[0, 0.01]}
        >
            <mesh
                ref={mesh}
                {...props}
            >
                <boxGeometry args={[2, 2.5, 1]} />
                <meshStandardMaterial color={`rgb(${color + 100},0,0)`} />
            </mesh>
        </Float>
    </>
};


export const getCoordinates = (angle, distance = 3.5) => {
    angle *= Math.PI / 180
    let x = -distance * Math.cos(angle),
        y = -distance * Math.sin(angle)

    return { x, y, distance }
}