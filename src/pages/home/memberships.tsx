import Context from "@components/Context";
import { Button, Card, Divider, Grid, Stack, Typography } from "@mui/material";
import { useContext } from "react";

import cards from "@config/kaady-memberships.json";
import { CheckCircle } from "@mui/icons-material";
import { getPriceFormat } from "@utils/format";

function Memberships() {
    const { scheme } = useContext(Context);

    const saveText = (price_1: number, price: number, months: number) => {
        return `Ahorra ${Math.round(
            100 * ((price_1 - price / months) / price_1)
        )} %`;
    };

    const cards_content = cards.map((item) => (
        <Grid
            key={item.title}
            size={{
                xs: 12,
                sm: 6,
            }}
        >
            <Card
                variant="outlined"
                sx={{
                    borderColor: scheme.outlineVariant,
                    height: "100%",
                    display: "flex",
                    borderRadius: "16px",
                    flexDirection: "column",
                }}
            >
                <Stack
                    component={"header"}
                    padding={"16px"}
                    color={scheme.onPrimary}
                    bgcolor={scheme.primary}
                >
                    <Typography variant="h5" component={"h1"}>
                        {item.title}
                    </Typography>
                </Stack>
                <Divider
                    sx={{
                        borderColor: scheme.outlineVariant,
                    }}
                />
                <Stack direction={"column"} gap={"12px"} padding={"28px 16px"}>
                    {item.description.map((value, i) => (
                        <Stack
                            key={i}
                            alignItems={"center"}
                            direction={"row"}
                            gap={"16px"}
                        >
                            <CheckCircle color="success" />
                            <Typography>{value}</Typography>
                        </Stack>
                    ))}
                </Stack>
                <Stack direction={"column"} padding={"16px"}>
                    <Stack direction={"row"}>
                        <Typography variant="body1">1 mes</Typography>
                        <h2
                            className="title-medium"
                            style={{ flexGrow: 1, textAlign: "end" }}
                        >
                            {getPriceFormat(item.price_1)}
                        </h2>
                    </Stack>
                </Stack>
                <Stack direction={"column"} padding={"16px"}>
                    <Stack direction={"row"}>
                        <Typography variant="body1">3 meses</Typography>
                        <h2
                            className="title-medium"
                            style={{ flexGrow: 1, textAlign: "end" }}
                        >
                            {getPriceFormat(item.price_3)}
                        </h2>
                    </Stack>
                    <Stack direction={"row"} className="opacity-80">
                        <Typography variant="caption">
                            {saveText(item.price_1, item.price_3, 3)}
                        </Typography>
                        <Typography
                            variant="caption"
                            flexGrow={1}
                            textAlign={"end"}
                            className="text-strike"
                        >
                            {getPriceFormat(item.price_1 * 3)}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack direction={"column"} padding={"16px"}>
                    <Stack direction={"row"}>
                        <Typography variant="body1">6 meses</Typography>
                        <h2
                            className="title-medium"
                            style={{ flexGrow: 1, textAlign: "end" }}
                        >
                            {getPriceFormat(item.price_6)}
                        </h2>
                    </Stack>
                    <Stack direction={"row"} className="opacity-80">
                        <Typography variant="caption">
                            {saveText(item.price_1, item.price_6, 6)}
                        </Typography>
                        <Typography
                            variant="caption"
                            flexGrow={1}
                            textAlign={"end"}
                            className="text-strike"
                        >
                            {getPriceFormat(item.price_1 * 6)}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack direction={"column"} padding={"8px 16px"}>
                    <Stack direction={"row"}>
                        <Typography variant="body1">1 año</Typography>
                        <h2
                            className="title-medium"
                            style={{ flexGrow: 1, textAlign: "end" }}
                        >
                            {getPriceFormat(item.price_12)}
                        </h2>
                    </Stack>
                    <Stack direction={"row"} className="opacity-80">
                        <Typography variant="caption">
                            {saveText(item.price_1, item.price_6, 6)}
                        </Typography>
                        <Typography
                            variant="caption"
                            flexGrow={1}
                            textAlign={"end"}
                            className="text-strike"
                        >
                            {getPriceFormat(item.price_1 * 12)}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack
                    flexGrow={1}
                    justifyContent={"end"}
                    padding={"28px 16px"}
                >
                    <Button
                        variant="tonal"
                        sx={{
                            padding: "10px 20px",
                        }}
                    >
                        Suscribirme
                    </Button>
                </Stack>
            </Card>
        </Grid>
    ));

    return (
        <>
            <Stack
                sx={{
                    borderRadius: "48px",
                    bgcolor: scheme.secondaryContainer,
                    color: scheme.onSecondaryContainer,
                }}
                padding={6}
                marginTop={2}
                marginBottom={10}
            >
                <Typography variant="h3" component={"h1"}>
                    Usa una membresía con varias opciones
                </Typography>
                <Typography variant="h6" className="opacity-80" marginTop={4}>
                    En Kaady Sport obtienes más ventajas con una membresía a tu
                    medida, elije y organiza varias actividades a tu gusto en el
                    lugar más cerca de ti
                </Typography>
            </Stack>
            <Stack direction={"column"} gap={"8px"}>
                <Typography variant={"h4"} component={"h1"}>
                    Todas las membresías incluyen acceso a centros deportivos
                </Typography>
                <Typography variant={"h6"} className="opacity-80">
                    Elije la mejor opción a tu medida y cancela cuando quieras.
                    *
                </Typography>
            </Stack>
            <Grid
                container
                spacing={3}
                justifyContent={"center"}
                padding={"28px 0px"}
            >
                {cards_content}
            </Grid>
            <Typography variant="body1" marginBottom={4}>
                * Aplica términos y condiciones según el periodo de la
                membresía. Consulta Términos y Condiciones.
            </Typography>
        </>
    );
}

export default Memberships;
