import {
    ContactShadows,
    Float,
    OrbitControls,
    useGLTF,
} from "@react-three/drei";
import {
    Debug,
    Physics,
} from "@react-three/rapier";
import { Rope } from "./components/Rope";
import { Cap } from "./components/Cap";
import { useControls } from "leva";
import { createRef, forwardRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Model } from "./components/Model";
import { Perf } from "r3f-perf";
import { CapRope } from "./components/CapRope";


const RopeContainer = ({ nodes, anchor }) => {

    const { scale, loss, radius } = useControls('Drop', {
        scale: {
            value: 0.1,
            step: 0.001,
            min: 0,
            max: 0.2
        },
        length: {
            value: 13,
            step: 1,
            min: 0,
            max: 100
        },
        radius: {
            value: 1,
            step: 0.01,
            min: 0.1,
            max: 3
        },
        loss: {
            value: 0.05,
            step: 0.01,
            min: 0,
            max: 1
        },
    })

    return (
        <group>
            <Rope
                anchor={anchor}
                nodes={nodes}
                scale={scale}
                radius={radius}
                loss={loss}
            />
            {/* <ContactShadows
                scale={20}
                blur={0.4}
                opacity={0.5}
                position={[-0, -2, 0]}
            /> */}

        </group>
    );
}


export const Box = forwardRef(({ ...props }, model) => {

    // const model = createRef()
    const leftAnchorConnector = useRef()
    const rightAnchorConnector = useRef()
    const midAnchorConnector = useRef()
    const midAnchor = useRef()
    const midAnchorMesh = useRef()
    const freeCap = useRef()
    const freeCapMesh = useRef()

    /**
     * Leva
    */
    const { angle, rotation, intensity, rangeS, rangeE } = useControls({
        angle: {
            value: 0,
            step: 0.1,
            min: 0,
            max: 360
        },
        rotation: {
            value: 0.3,
            step: 0.1,
            min: 0,
            max: 0.8
        },
        intensity: {
            value: 0.1,
            step: 0.1,
            min: 0,
            max: 0.8
        },
        rangeS: {
            value: 0,
            step: 0.1,
            min: 0,
            max: 0.8
        },
        rangeE: {
            value: 0.2,
            step: 0.1,
            min: 0,
            max: 0.8
        },
    })

    /**
     * Model
    */
    const { nodes, materials, scene } = useGLTF("/boxWithSb7a.glb");
    const ropeNodes = scene.children.slice(24, 38)
    const leftAnchorPos = nodes.Sphere018.position
    const rightAnchorPos = nodes.Sphere031.position
    const midAnchorPos = nodes.Sphere036.position
    const midAnchorNode = nodes.Sphere036
    const freeCapNode = { big: nodes.Sphere014, small: nodes.Sphere }
    useLayoutEffect(() => {
        Object.values(materials).forEach((material) => {
            material.roughness = 0.5
            material.metalness = 0
        })
    }, [])

    useEffect(() => {
        model.current.add(leftAnchorConnector.current)
        model.current.add(rightAnchorConnector.current)
        model.current.add(midAnchorConnector.current)
        model.current.add(midAnchorMesh.current)
    })

    return (
        <>
            {/* <group ref={ref}> */}
            <Float
                speed={1}
                rotationIntensity={rotation}
                floatIntensity={intensity}
                floatingRange={[rangeS, rangeE]}
            >
                <Model ref={model} rotation-z={angle * (Math.PI / 180)} nodes={nodes} />
            </Float>
            <group ref={leftAnchorConnector} position={leftAnchorPos} />
            <group ref={rightAnchorConnector} position={rightAnchorPos} />
            <group ref={midAnchorConnector} position={midAnchorPos} />

            <group>
                <Physics
                    // paused
                    gravity={[0, -11, 0]}
                >
                    <RopeContainer anchor={{ leftAnchorConnector, rightAnchorConnector }} nodes={ropeNodes} />
                    <Cap anchor={{ midAnchor, midAnchorMesh, midAnchorNode }} free={{ freeCap, freeCapMesh, freeCapNode }} />
                    {/* <CapRope anchor={{ midAnchorConnector, midAnchorPos }} /> */}
                    {/* <Debug /> */}
                </Physics>
            </group>
            {/* </group> */}
        </>
    );
})

useGLTF.preload("/boxWithSb7a.glb");