import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { Perf } from 'r3f-perf'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
        // onWheel={(e) => console.log('wheel spins')}
        camera={{
            fov: 45,
            near: 0.1,
            far: 100,
            // position: [ -3, 1.5, 4 ]
        }}
    >
        <Perf position='top-left' />
        <Experience />
    </Canvas>
)