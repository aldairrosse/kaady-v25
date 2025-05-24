import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import Root from "@components/Root";
import Logo from "@components/Logo";
import { useContext } from "react";
import Context from "@components/Context";
import Rights from "@components/Rights";

function Welcome() {
    const { theme } = useContext(Context);
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Root>
            <Stack
                paddingX={6}
                paddingTop={4}
                paddingBottom={1}
                alignItems={isMobile ? "center" : ""}
            >
                <Logo height={isMobile ? "32px" : "48px"} />
            </Stack>
            <Stack
                paddingX={6}
                direction={isMobile ? "column-reverse" : "row"}
                gap={4}
                alignItems={"center"}
                width={"100%"}
                paddingBottom={isMobile ? 10 : 0}
                height={"auto"}
                minHeight={"calc(100% - 148px)"}
            >
                <Stack
                    maxWidth={450}
                    justifyContent={"end"}
                    alignItems={isMobile ? "center" : ""}
                    textAlign={isMobile ? "center" : "start"}
                >
                    <Typography variant={isMobile ? "h4" : "h2"} component="h1">
                        Empieza a entrenar ya
                    </Typography>
                    <Typography
                        variant="h6"
                        component="h2"
                        marginTop={2}
                        style={{ opacity: 0.7 }}
                    >
                        Con una sola membresía accede a todos tus entrenamientos
                        en donde te encuentres
                    </Typography>
                    <Stack
                        direction="row"
                        marginTop={8}
                        gap={2}
                        flexWrap={"wrap"}
                        justifyContent={isMobile ? "center" : ""}
                    >
                        <Button size="large" variant="contained">
                            Registrarme
                        </Button>
                        <Button size="large">Conocer más</Button>
                    </Stack>
                </Stack>
                <Box width={"100%"} maxWidth={400} height={300} flexGrow={1}>
                    <img
                        src="/images/ia/training_draw.png"
                        width="100%"
                        height="100%"
                        style={{
                            objectFit: "contain",
                        }}
                    />
                </Box>
            </Stack>
            <Stack
                direction="row"
                justifyContent="center"
                paddingX={4}
                paddingY={2}
            >
                <Rights />
            </Stack>
        </Root>
    );
}

export default Welcome;
