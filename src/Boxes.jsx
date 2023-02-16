import Box from "./Box"

export default function Boxes({ count }) {
    let i = -1

    return <>{
        [...Array(count)].map(() => {
            i++
            return <Box key={i} position-y={-i * 4} />
        })
    }
    </>
};
