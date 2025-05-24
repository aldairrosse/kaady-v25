import Context from "@components/Context";
import { FitnessCenterOutlined } from "@mui/icons-material";
import { alpha, Box, Button, Stack, Typography } from "@mui/material";
import { useContext, useMemo } from "react";

const Home = () => {
    const { scheme } = useContext(Context);

    const iconSize = useMemo(() => "250px", []);
    return (
        <>
            <Stack marginTop={6} marginBottom={10} gap={2} maxWidth={450}>
                <Typography variant="h4" component="h1">
                    ¿Qué te ofrece Kaady Sport?
                </Typography>
                <Typography variant="h6" component="h2" className="opacity-80">
                    Puedes tener acceso a centros deportivos o gimnasios cerca
                    de ti con una sola membresía a tu medida
                </Typography>
            </Stack>
            <Stack direction={"row"} gap={4}>
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
                        <Button variant="tonal" size="large">
                            Ver membresías
                        </Button>
                    </Stack>
                </Stack>
                <Box
                    width={"300px"}
                    minWidth={"300px"}
                    height={"300px"}
                    sx={{
                        borderRadius: "28px",
                        backgroundImage: "url(/images/woman.jpeg)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
            </Stack>
            <Stack
                sx={{
                    alignItems: "center",
                    borderRadius: "48px",
                    bgcolor: scheme.primaryContainer,
                    color: scheme.onPrimaryContainer,
                    gap: "48px",
                }}
                padding={6}
                direction={"row"}
                marginTop={10}
                marginBottom={2}
            >
                <Stack flexGrow={1}>
                    <Typography variant="h4" component={"h1"}>
                        ¿Administras un centro deportivo?
                    </Typography>
                    <Typography
                        variant="h6"
                        marginTop={"16px"}
                        sx={{
                            color: alpha(scheme.onPrimaryContainer, 0.8),
                        }}
                    >
                        Revisa los diferentes beneficios que ofrecemos para los
                        gimnasios o centros deportivos. Ahora podrás manejar tu
                        centro de forma digital.
                    </Typography>
                    <Stack
                        direction={"row"}
                        marginTop={"28px"}
                        marginBottom={"28px"}
                    >
                        <Button variant="contained" size="large">
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
