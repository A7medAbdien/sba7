import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
// import Boxes from './Boxes'
import { Perf } from 'r3f-perf'

export default function Experience() {
    return <>
        <Canvas
            onWheel={(e) => console.log(e)}
            camera={{
                fov: 45,
                near: 0.1,
                far: 100,
                position: [0, 0, 9]
            }}
        >
            {/* <OrbitControls /> */}
            <Perf position='top-left' />
            <axesHelper args={[2, 2, 2]} />

            <Boxes count={5} />
        </Canvas>
    </>
}

function Boxes({ count }) {
    let i = -1
    const theta = 360 / count
    return <>{
        [...Array(count)].map(() => {
            i++
            let { x, y } = getCoordinates(i * theta, 3)
            // console.log(i * theta, x, y);
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