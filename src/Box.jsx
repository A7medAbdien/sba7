import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'


export default function Box(props) {

    const scroll = useScroll()

    console.log(scroll)

    useFrame((state, delta) => {
        const offset = 1 - scroll.offset
        state.camera.position.y = - scroll.offset * 16
        // state.camera.lookAt(0, 0, 0)
    })
    return <mesh {...props}>
        <boxGeometry args={[2, 2, 1]} />
        <meshNormalMaterial wireframe />
    </mesh>
};