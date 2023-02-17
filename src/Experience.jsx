import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import { getCoordinates } from './Boxes'
import Boxes from './Boxes'
import { Perf } from 'r3f-perf'
import { useRef } from 'react'

export default function Experience() {
    let theta = 0
    let { x, y } = getCoordinates(theta, 3)
    const mesh = useRef()
    const roll = (e) => {
        if (e.altKey) {
            theta -= 2
            mesh.current.rotation.x -= 0.1
            mesh.current.rotation.y -= 0.1
        } else {
            theta += 2
            mesh.current.rotation.x += 0.1
            mesh.current.rotation.y += 0.1
        }
        const { x, y } = getCoordinates(theta, 3)
        mesh.current.position.x = x
        mesh.current.position.y = y

    }

    return <>
        <Canvas
            onWheel={(e) => roll(e)}
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

            <mesh
                ref={mesh}
                position-x={x}
                position-y={y}
            >
                <boxGeometry args={[2, 2.5, 1]} />
                <Html>
                    {theta}
                </Html>
                <meshNormalMaterial />
            </mesh>

            {/* <Boxes count={5} /> */}
        </Canvas>
    </>
}

