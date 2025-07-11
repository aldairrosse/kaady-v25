import Context from "@components/Context";
import Logo from "@components/Logo";
import {
    FitnessCenterOutlined,
    MonetizationOnOutlined,
    PublicOutlined,
    QueryStatsOutlined,
    WidgetsOutlined,
} from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    Grid,
    Stack,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { useContext, useMemo } from "react";

export default function Partners() {
    const { theme, scheme } = useContext(Context);
    const isTablet = useMediaQuery(theme.breakpoints.down("md"));
    const imageSize = useMemo(() => "300px", []);

    const benefits = useMemo(
        () => [
            {
                icon: <QueryStatsOutlined fontSize="large" />,
                content: "Más visibilidad y visitas",
            },
            {
                icon: <MonetizationOnOutlined fontSize="large" />,
                content: "Aumenta ganancias y ventas",
            },
            {
                icon: <FitnessCenterOutlined fontSize="large" />,
                content: "Activación digital del centro",
            },
            {
                icon: <PublicOutlined fontSize="large" />,
                content: "Publicidad en nuestras plataformas",
            },
            {
                icon: <WidgetsOutlined fontSize="large" />,
                content: "Herramientas administrativas",
            },
        ],
        []
    );

    const activities = useMemo(
        () => [
            "Boxeo",
            "Danza",
            "Taekwondo",
            "Halterofilia",
            "Cardio",
            "Natación",
            "Crossfit",
            "Gimnasia",
            "Pesas",
            "Spinning",
            "Running",
        ],
        []
    );

    const benefits_content = benefits.map((item) => (
        <Grid
            key={item.content}
            alignSelf={"center"}
            size={{
                xs: 12,
                sm: 6,
            }}
        >
            <Stack direction={"row"} gap={"16px"} alignItems={"center"}>
                <Avatar
                    sx={{
                        bgcolor: scheme.primary,
                        color: scheme.onPrimary,
                        width: 64,
                        height: 64,
                    }}
                >
                    {item.icon}
                </Avatar>
                <Typography variant="h6" color="textSecondary">
                    {item.content}
                </Typography>
            </Stack>
        </Grid>
    ));

    const activities_content = activities.map((item) => (
        <Stack
            key={item}
            direction={"row"}
            padding={"6px 12px"}
            sx={{
                backgroundColor: scheme.secondaryContainer,
                color: scheme.onSecondaryContainer,
                borderRadius: "8px",
            }}
        >
            <h3 className="title-medium">{item}</h3>
        </Stack>
    ));

    return (
        <>
            <Stack
                sx={{
                    borderRadius: "48px",
                    borderWidth: 1,
                    borderColor: scheme.outline,
                    borderStyle: "solid",
                }}
                padding={6}
                marginTop={2}
                marginBottom={10}
                direction={isTablet ? "column-reverse" : "row"}
                alignItems="center"
            >
                <Stack>
                    <Typography variant="h3" component={"h1"}>
                        Conoce aquí los beneficios de socios
                    </Typography>
                    <Typography
                        variant="h6"
                        marginTop={4}
                        className="opacity-80"
                    >
                        Aprovecha los diferentes beneficios para nuestros socios
                        con una app personalizada
                    </Typography>
                </Stack>
                <Box
                    width={imageSize}
                    minWidth={imageSize}
                    height={imageSize}
                    sx={{
                        backgroundImage: `url('/images/pesas.png')`,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                />
            </Stack>
            <Stack gap={4} padding={"28px 0px"}>
                <Typography variant="h4" component={"h1"}>
                    Cada centro obtiene beneficios
                </Typography>
                <Grid container spacing={"48px"}>
                    {benefits_content}
                </Grid>
            </Stack>
            <Stack padding={"28px 0px"} marginTop={7}>
                <Typography variant="h4" component={"h1"}>
                    Diferentes actividades disponibles
                </Typography>
                <Stack display={"inline"} marginTop={"16px"}>
                    <Typography
                        variant="h6"
                        className="opacity-80"
                        display={"inline"}
                        sx={{
                            verticalAlign: "middle",
                        }}
                    >
                        Toda actividad física, de activación o acondicionamiento
                        físico está permitida para formar parte de{" "}
                    </Typography>
                    <Logo
                        type="isotype"
                        height="16px"
                        color={scheme.primary}
                        sx={{
                            verticalAlign: "middle",
                        }}
                    />
                </Stack>
                <Stack
                    marginTop={"48px"}
                    direction={"row"}
                    gap={"16px"}
                    flexWrap={"wrap"}
                >
                    {activities_content}
                </Stack>
            </Stack>
            <Stack
                sx={{
                    borderRadius: "48px",
                    bgcolor: scheme.primary,
                    color: scheme.onPrimary,
                }}
                padding={6}
                marginTop={10}
                marginBottom={4}
            >
                <Typography variant="h4" component="h1">
                    Solicita tu registro
                </Typography>
                <Typography
                    variant="h6"
                    marginTop={"16px"}
                    className="opacity-80"
                >
                    La activación digital y el convenio de asociados se lleva a
                    cabo personalmente con nuestros asesores. Solicita tu
                    registro en el siguiente enlace.
                </Typography>
                <Stack direction={"row"} marginTop={4}>
                    <Button
                        variant="elevated"
                        sx={{
                            padding: "12px 24px",
                        }}
                    >
                        Solicitar registro
                    </Button>
                </Stack>
            </Stack>
        </>
    );
}
