import Context from "@components/Context";
import Logo from "@components/Logo";
import Rights from "@components/Rights";
import Root from "@components/Root";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { useContext, useMemo } from "react";

function About() {
    const { theme, scheme } = useContext(Context);
    const isTablet = useMediaQuery(theme.breakpoints.down("md"));
    const iconSize = useMemo(() => "225px", []);

    const values = useMemo(
        () => [
            "Transparencia",
            "Honestidad",
            "Respeto",
            "Adaptabilidad",
            "Diligencia",
            "Constancia",
            "Integridad",
            "Pasión",
            "Trabajo en equipo",
            "Liderazgo",
        ],
        []
    );

    const values_content = values.map((item) => (
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
        <Root>
            <Stack
                sx={{
                    borderRadius: "48px",
                    borderWidth: 1,
                    borderColor: scheme.outlineVariant,
                    borderStyle: "solid",
                }}
                padding={6}
                marginTop={4}
                marginBottom={10}
                gap={2}
                direction={isTablet ? "column-reverse" : "row"}
                alignItems="center"
            >
                <Stack
                    alignItems={isTablet ? "center" : ""}
                    flexGrow={1}
                    textAlign={isTablet ? "center" : "start"}
                >
                    <Typography variant="h3" component={"h1"}>
                        Conoce acerca de nosotros
                    </Typography>
                    <Typography
                        variant="h6"
                        marginTop={1}
                        className="opacity-80"
                    >
                        Haz ejercicio en Kaady Sport
                    </Typography>
                </Stack>
                <Box width={iconSize} minWidth={iconSize} height={iconSize}>
                    <Logo height={iconSize} type="icon" />
                </Box>
            </Stack>

            <Stack gap={4} padding={"28px 0px"} maxWidth={800}>
                <Typography variant="h4" component={"h1"}>
                    ¿Quiénes somos?
                </Typography>
                <Stack display={"inline"}>
                    <Typography
                        variant="h6"
                        color="textSecondary"
                        display={"inline"}
                        sx={{
                            verticalAlign: "middle",
                        }}
                    >
                        En{" "}
                    </Typography>
                    <Logo
                        type="isotype"
                        height="16px"
                        color={scheme.primary}
                        sx={{
                            verticalAlign: "middle",
                        }}
                    />
                    <Typography
                        variant="h6"
                        color="textSecondary"
                        display={"inline"}
                        sx={{
                            verticalAlign: "middle",
                        }}
                    >
                        {" "}
                        somos una empresa enfocada a la venta de membresías
                        deportivas para que los clientes puedan asistir a
                        distintos lugares donde quiera que se encuentren y
                        llevar a cabo entrenamientos o actividades físicas
                        diversas de su gusto.
                    </Typography>
                </Stack>
                <Typography variant="h6" color="textSecondary">
                    Nos distinguimos por reconocer a toda la ciudadanía fitness
                    y al público en general para apoyarlos en conseguir sus
                    objetivos personales por medio de la activación física que
                    además puede ayudar en áreas psicológicas y emocionales.
                </Typography>
            </Stack>
            <Stack gap={3}>
                <Stack
                    sx={{
                        bgcolor: scheme.primaryContainer,
                        color: scheme.onPrimaryContainer,
                        gap: "16px",
                        padding: "24px",
                        borderRadius: "24px",
                    }}
                >
                    <h2 className="headline-small">Misión</h2>
                    <p className="opacity-80 body-large">
                        Consolidarnos como la empresa tecnológica nacional
                        número uno en venta de membresías en apoyo a gente que
                        quiere mejorar su estado físico, psicológico y mental,
                        así como impulsar un programa de inclusión gratuito para
                        personas con capacidades diferentes para que puedan
                        reforzar su sistema físico y emocional.
                    </p>
                </Stack>
                <Stack
                    sx={{
                        bgcolor: scheme.primaryContainer,
                        color: scheme.onPrimaryContainer,
                        gap: "16px",
                        padding: "24px",
                        borderRadius: "24px",
                    }}
                >
                    <h2 className="headline-small">Visión</h2>
                    <p className="opacity-80 body-large">
                        Ser una empresa reconocida en todo el país agregando
                        valor humano y generando calidad de vida, haciendo que
                        el mayor número de ciudadanos se conviertan en fitness y
                        realicen distintas actividades físicas para mejorar la
                        salud mundial.
                    </p>
                </Stack>
            </Stack>

            <Stack padding={"28px 0px"} marginTop={8} gap={4}>
                <Typography variant="h4" component={"h1"}>
                    Objetivo y valores
                </Typography>
                <Typography variant="h6" color="textSecondary" maxWidth={800}>
                    Nuestro objetivo es lograr que cada vez más gente realice
                    alguna actividad física para acabar con la obesidad mundial
                    e inculcar buenos hábitos y costumbres rutinarias.
                </Typography>
                <Typography variant="h6" color="textSecondary">
                    Los valores de la empresa nos ayudan a cumplir ese objetivo.
                </Typography>
                <Stack direction={"row"} gap={"16px"} flexWrap={"wrap"}>
                    {values_content}
                </Stack>
            </Stack>

            <Stack pt={8} pb={4} component={"footer"}>
                <Rights />
            </Stack>
        </Root>
    );
}

export default About;
