import Context from "@components/Context";
import {
    BookRounded,
    FitnessCenterOutlined,
    WhereToVoteRounded,
} from "@mui/icons-material";
import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { useContext, useMemo } from "react";
import { useNavigate } from "react-router";

const Home = () => {
    const { scheme, theme } = useContext(Context);
    const navigate = useNavigate();
    const iconSize = useMemo(() => "250px", []);
    const isTablet = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <>
            <Stack
                sx={{
                    borderRadius: "48px",
                    borderWidth: 1,
                    borderColor: scheme.outline,
                    borderStyle: "solid",
                }}
                gap={8}
                padding={6}
                marginTop={2}
                marginBottom={10}
                direction={isTablet ? "column-reverse" : "row"}
                alignItems="center"
            >
                <Stack>
                    <Typography variant="h3" component="h1">
                        ¿Qué te ofrece Kaady Sport?
                    </Typography>
                    <Typography
                        variant="h6"
                        component="h2"
                        className="opacity-80"
                        marginTop={4}
                    >
                        Puedes tener acceso a centros deportivos o gimnasios
                        cerca de ti con una sola membresía a tu medida
                    </Typography>
                </Stack>
                <Stack direction={"row"} gap={4}>
                    <BookRounded sx={{ fontSize: 64 }} color="primary" />
                    <WhereToVoteRounded sx={{ fontSize: 64 }} color="success" />
                </Stack>
            </Stack>
            <Stack
                gap={4}
                alignItems={"center"}
                direction={isTablet ? "column-reverse" : "row"}
            >
                <Stack flexGrow={1}>
                    <Typography variant="h4" component={"h1"}>
                        ¿Piensas mejorar tu condición física?
                    </Typography>
                    <Typography
                        variant="h4"
                        marginTop={"16px"}
                        component={"h1"}
                    >
                        ¿Estás de viaje y quieres entrenar?
                    </Typography>
                    <Typography
                        variant="h6"
                        marginTop={"16px"}
                        className="opacity-80"
                    >
                        Busca ahora los diferentes centros deportivos asociados
                        y entrena una de las actividades disponibles con una de
                        nuestras membresías
                    </Typography>
                    <Stack direction={"row"} marginTop={"28px"}>
                        <Button
                            variant="tonal"
                            size="large"
                            sx={{ padding: "10px 20px" }}
                            onClick={() => navigate("/home/memberships")}
                        >
                            Ver membresías
                        </Button>
                    </Stack>
                </Stack>
                <Box
                    width={"350px"}
                    minWidth={"350px"}
                    height={"350px"}
                    sx={{
                        backgroundImage: "url(/images/woman.jpeg)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
            </Stack>
            <Stack
                sx={{
                    borderRadius: "48px",
                    bgcolor: scheme.primaryContainer,
                    color: scheme.onPrimaryContainer,
                    gap: "48px",
                }}
                padding={6}
                direction={isTablet ? "column-reverse" : "row"}
                alignItems={"center"}
                marginTop={10}
                marginBottom={4}
            >
                <Stack flexGrow={1}>
                    <Typography variant="h4" component={"h1"}>
                        ¿Administras un centro deportivo?
                    </Typography>
                    <Typography
                        variant="h6"
                        marginTop={4}
                        className="opacity-80"
                    >
                        Revisa los diferentes beneficios que ofrecemos para los
                        gimnasios o centros deportivos. Ahora podrás manejar tu
                        centro de forma digital.
                    </Typography>
                    <Stack direction={"row"} marginTop={4}>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate("/home/partners")}
                        >
                            Ver más
                        </Button>
                    </Stack>
                </Stack>
                <Box width={iconSize} minWidth={iconSize} height={iconSize}>
                    <FitnessCenterOutlined
                        fontSize="large"
                        sx={{
                            color: scheme.onSecondaryContainer,
                            fontSize: iconSize,
                        }}
                    />
                </Box>
            </Stack>
        </>
    );
};

export default Home;
