import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
export default function Box(props) {
    const scroll = useScroll()
    console.log(scroll);
    useFrame((state, delta) => {
        // const offset = 1 - scroll.offset

    })
    return <mesh {...props}>
        <boxGeometry args={[2, 2.5, 1]} />
        <meshNormalMaterial />
    </mesh>
};