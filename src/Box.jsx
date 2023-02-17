import { useEffect, useRef, useState } from 'react'
import { Html } from "@react-three/drei"

export default function Box(props) {

    let { trigger } = props
    const [theta, setTheta] = useState(props.bTheta);
    console.log(theta);

    useEffect(() => {
        if (trigger) {
            roll(trigger);
        }
    }, [trigger]);

    const mesh = useRef()

    const roll = (e) => {
        if (e.altKey) {
            setTheta((theta) => (theta - 2) % 360)
            mesh.current.rotation.x -= 0.1
            mesh.current.rotation.y -= 0.1
        } else {
            setTheta((theta) => (theta + 2) % 360)
            mesh.current.rotation.x += 0.1
            mesh.current.rotation.y += 0.1
        }
        const { x, y } = getCoordinates(theta, 3)
        mesh.current.position.x = x
        mesh.current.position.y = y
        if (theta == 0)
            console.log({
                theta: theta,
                rX: mesh.current.rotation.x,
                rY: mesh.current.rotation.y
            });

    }

    return <>
        <mesh
            ref={mesh}
            {...props}
        >
            <boxGeometry args={[2, 2.5, 1]} />
            <meshNormalMaterial />
        </mesh>
    </>
};


export const getCoordinates = (angle, distance = 1) => {
    angle *= Math.PI / 180
    let x = distance * Math.cos(angle),
        y = distance * Math.sin(angle)

    return { x, y }
}