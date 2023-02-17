import { Html } from "@react-three/drei"
import Box from "./Box"

export default function Boxes({ count }) {
    let i = -1
    const theta = 360 / count
    return <>{
        [...Array(count)].map(() => {
            i++
            let { x, y } = getCoordinates(i * theta, 3)
            console.log(i * theta, x, y);
            return <mesh
                key={i}
                position-x={x}
                position-y={y}
                scale={0.5}

                onClick={(e) => {
                    console.log(e.object);
                }}

            >
                <Html>
                    {i * theta}
                </Html>
                <boxGeometry args={[2, 2.5, 1]} />
                <meshNormalMaterial />
            </mesh>
        })
    }
    </>
};

const getCoordinates = (angle, distance = 1) => {
    angle *= Math.PI / 180
    let x = distance * Math.cos(angle),
        y = distance * Math.sin(angle)

    return { x, y }
}
