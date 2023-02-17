import { useEffect, useRef, useState } from 'react'

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
        const { x, y } = getCoordinates(theta, 3)
        if (e.altKey) {
            setTheta((theta) => (theta - 2) % 360)
            mesh.current.rotation.x = x - 3
            mesh.current.rotation.y = -y
        } else {
            setTheta((theta) => (theta + 2) % 360)
            mesh.current.rotation.x = x - 3
            mesh.current.rotation.y = -y
        }
        mesh.current.position.x = x
        mesh.current.position.y = y
        if (color == 0) {
            console.log({
                theta: color,
                rX: mesh.current.rotation.x,
                rY: mesh.current.rotation.y
            });
        }
    }

    return <>
        <mesh
            ref={mesh}
            {...props}
        >
            <boxGeometry args={[2, 2.5, 1]} />
            <meshStandardMaterial color={`rgb(${color + 100},0,0)`} />
        </mesh>
    </>
};


export const getCoordinates = (angle, distance = 1) => {
    angle *= Math.PI / 180
    let x = distance * Math.cos(angle),
        y = distance * Math.sin(angle)

    return { x, y }
}