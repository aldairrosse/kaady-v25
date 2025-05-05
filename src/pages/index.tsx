import { Box, Stack, Typography, useTheme } from "@mui/material";
import Root from "../components/Root";

const Welcome = () => {
    const theme = useTheme();
    return (
        <>
            <Root>
                <Stack
                    direction={"row"}
                    height={"100%"}
                    alignItems={"center"}
                    gap={16}
                    flexWrap={"wrap-reverse"}
                    justifyContent={'center'}
                    paddingBottom={16}
                >
                    <Typography variant="h2" flexGrow={1}>
                        Bienvenido
                    </Typography>
                    <Box
                        width={500}
                        height={500}
                        bgcolor={theme.palette.primary.main}
                        borderRadius={16}
                    ></Box>
                </Stack>
            </Root>
            <Root>
                <Typography variant="h3">Detalles</Typography>
            </Root>
        </>
    );
};

export default Welcome;
