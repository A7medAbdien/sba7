import { Float, ScrollControls, useHelper } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useControls } from 'leva';
import { createRef, forwardRef, useEffect, useRef, useState } from 'react';
import { SpotLightHelper, Vector3 } from 'three';


export const Box = forwardRef(({ color, ...props }, ref) => {
    return <>
        <mesh ref={ref} {...props}>
            <boxGeometry args={[2, 2.5, 1]} />
            <meshBasicMaterial color={`rgb(${color + 100},0,0)`} />
        </mesh>
    </>
})


