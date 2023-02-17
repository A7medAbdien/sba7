import Box from "./Box"

export default function Boxes({ count, trigger }) {

    let i = -1
    const theta = 360 / count

    return <>{
        [...Array(count)].map(() => {
            i++
            let { x, y } = getCoordinates(i * theta, 3)

            return <Box
                trigger={trigger}
                bTheta={i * theta}
                color={i * theta}
                key={i}
                position-x={x}
                position-y={y}
                rotation-x={3.6 * i}
                rotation-y={3.6 * i}
                scale={0.5}
            />
        })
    }
    </>
};

export const getCoordinates = (angle, distance = 1) => {
    angle *= Math.PI / 180
    let x = distance * Math.cos(angle),
        y = distance * Math.sin(angle)

    return { x, y }
}
