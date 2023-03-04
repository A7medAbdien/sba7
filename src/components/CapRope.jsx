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
            colliders={"ball"}
            type={type}
            position={position}
        >
            {component}
        </RigidBody >
    );
});

const RopeJoint = ({ a, b }) => {
    useSphericalJoint(a, b, [
        [0, -0.5, 0],
        [0, 0.5, 0]
    ]);
    return null;
};

export const CapRope = ({ anchor }) => {
    const { midAnchor, midAnchorMesh, midAnchorNode } = anchor

    const refs = useRef(
        Array.from({ length: 5 }).map(() => createRef())
    );

    useFrame(() => {
        // const pos = new Vector3()
        // midAnchorMesh.current.getWorldPosition(pos)
        // midAnchor.current.setTranslation(new Vector3(
        //     pos.x,
        //     pos.y,
        //     pos.z,
        // ))
    })

    return (
        <group >
            {refs.current.map((ref, i) => {
                return (
                    <RopeSegment
                        ref={ref}
                        key={i}
                        position-x={midAnchorNode.position.x}
                        position-y={midAnchorNode.position.y * i}
                        position-z={midAnchorNode.position.z}
                        component={
                            <Sphere args={[0.1]}>
                                <meshStandardMaterial />
                            </Sphere>
                        }
                        type={i === 0 ? "kinematicPosition" : "dynamic"}
                    />
                );
            })}

            {refs.current.map(
                (ref, i) =>
                    i > 0 && (
                        <RopeJoint a={refs.current[i]} b={refs.current[i - 1]} key={i} />
                    )
            )}
        </group>
    );
}
