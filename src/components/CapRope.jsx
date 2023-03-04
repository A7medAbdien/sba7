import { Clone, Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
    RigidBody,
    useSphericalJoint,
    // vec3
} from "@react-three/rapier";

import { forwardRef, useRef, createRef } from "react";
import { Vector3 } from "three";


const RopeSegment = forwardRef(({ position, component, type }, ref) => {
    return (
        <RigidBody
            restitution={0}
            ref={ref}
            type={type}
            position={position}
        // friction={3}
        >
            {component}
        </RigidBody >
    );
});

const RopeJoint = ({ a, b, radius }) => {
    const jointRadius = radius
    useSphericalJoint(a, b, [
        [0, jointRadius, 0],
        [0, -jointRadius, 0]
    ]);
    return null;
};

export const CapRope = ({ anchor }) => {
    const { midAnchorConnector, midAnchorPos } = anchor
    const radius = 0.05
    const refs = useRef(
        Array.from({ length: 8 }).map(() => createRef())
    );

    useFrame(() => {
        const pos = new Vector3()
        midAnchorConnector.current.getWorldPosition(pos)
        refs.current[0].current.setTranslation(new Vector3(
            pos.x,
            pos.y,
            pos.z,
        ))
    })

    return (
        <group>
            {refs.current.map((ref, i) => {
                return (<RopeSegment
                    ref={ref}
                    key={i}
                    position={[
                        midAnchorPos.x,
                        midAnchorPos.y - i * 2 * radius,
                        midAnchorPos.z]}
                    component={
                        <Sphere args={[radius]}>
                            <meshStandardMaterial />
                        </Sphere>
                    }
                    type={i === 0 ? "kinematicPosition" : "dynamic"}
                />)
            })}

            {refs.current.map(
                (ref, i) =>
                    i > 0 && (
                        <RopeJoint a={refs.current[i]} b={refs.current[i - 1]} key={i} radius={radius} />
                    )
            )}
        </group>
    );
}
