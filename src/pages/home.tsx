import Root from "@components/Root";
import { Box, Stack, Typography } from "@mui/material";

export default function Home() {
    return (
        <Root>
            <Stack
                direction={"row"}
                height={"100%"}
                alignItems={"center"}
                gap={2}
                flexWrap={"wrap-reverse"}
                justifyContent={'center'}
            >
                <Stack flexGrow={1}>
                    <Typography variant="h2">
                        Bienvenido
                    </Typography>
                </Stack>
                <Box
                    width={400}
                    height={400}
                    bgcolor={'GrayText'}
                    borderRadius={4}
                ></Box>
            </Stack>
        </Root>
    )
}