import { CircularProgress, Box } from '@chakra-ui/react'

export default function Loading() {
    return (
        <Box textAlign={"center"} margin={"10px 0px"}>
            <CircularProgress isIndeterminate color='green.300' />
        </Box>
    )
}