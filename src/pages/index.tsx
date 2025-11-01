import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import Root from "@components/Root";
import Logo from "@components/Logo";
import { useContext } from "react";
import Context from "@components/Context";
import Rights from "@components/Rights";
import { useNavigate } from "react-router";
import InfoLinks from "@components/InfoLinks";
import { FitnessCenter } from "@mui/icons-material";

function Welcome() {
    const { theme } = useContext(Context);
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const navigate = useNavigate();

    const toHome = () => navigate("/home");
    const toRegister = () => navigate("/register");

    return (
        <div className="bg-main">
            <Root>
                <Stack
                    paddingTop={2}
                    paddingBottom={1}
                    alignItems={isMobile ? "center" : "start"}
                >
                    <Logo height={isMobile ? "32px" : "40px"} />
                </Stack>
                <Stack
                    direction={isMobile ? "column-reverse" : "row"}
                    gap={4}
                    alignItems={"center"}
                    width={"100%"}
                    paddingBottom={isMobile ? 10 : 0}
                    minHeight={"calc(100vh - 148px)"}
                >
                    <Stack
                        maxWidth={450}
                        justifyContent={"end"}
                        alignItems={isMobile ? "center" : ""}
                        textAlign={isMobile ? "center" : "start"}
                    >
                        <Typography
                            variant={isMobile ? "h4" : "h2"}
                            component="h1"
                        >
                            Empieza a entrenar ya
                        </Typography>
                        <Typography
                            variant="h6"
                            component="h2"
                            marginTop={2}
                            style={{ opacity: 0.7 }}
                        >
                            Con una sola membresía accede a todos tus
                            entrenamientos en donde te encuentres
                        </Typography>
                        <Stack
                            direction="row"
                            marginTop={8}
                            gap={2}
                            flexWrap={"wrap"}
                            justifyContent={isMobile ? "center" : ""}
                        >
                            <Button
                                size="large"
                                variant="contained"
                                onClick={toRegister}
                            >
                                Registrarme
                            </Button>
                            <Button
                                onClick={() => navigate("/login")}
                                size="large"
                            >
                                Iniciar sesión
                            </Button>
                        </Stack>
                        <Stack direction={"row"} mt={4}>
                            <Button
                                size="large"
                                onClick={toHome}
                                sx={{ px: 2 }}
                                variant="outlined"
                                startIcon={<FitnessCenter />}
                            >
                                Conocer servicios
                            </Button>
                        </Stack>
                    </Stack>
                    <Box
                        width={"100%"}
                        maxWidth={400}
                        height={300}
                        flexGrow={1}
                    >
                        <img
                            src="/images/ia/training_draw.png"
                            width="100%"
                            height="100%"
                            style={{
                                objectFit: "contain",
                            }}
                            alt="Personas entrenando"
                            title="training"
                        />
                    </Box>
                </Stack>
                <Stack padding={4} gap={4} component={"footer"}>
                    <InfoLinks />
                    <Rights />
                </Stack>
            </Root>
        </div>
    );
}

export default Welcome;
