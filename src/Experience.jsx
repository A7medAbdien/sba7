import { ScrollControls } from '@react-three/drei'
import { useEffect } from 'react'
import Boxes from './Boxes'
import ReactDOM from 'react-dom/client'


export default function Experience() {
    return <>
        {/* <OrbitControls makeDefault /> */}
        <axesHelper args={[2, 2, 2]} />

        <ScrollControls pages={5}>
            <Boxes count={5} />
        </ScrollControls>
    </>
}