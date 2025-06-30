import Context from "@components/Context";
import { Box, Card, Grid, Stack } from "@mui/material";
import { useContext } from "react";

export default function () {
    const { scheme } = useContext(Context);
    const activities = [
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
    ];
    return (
        <Box sx={{ px: 3, pt: 4, height: "100%", overflowY: "auto", pb: 4 }}>
            <Stack direction={"row"} gap={2}>
                <h1 className="title-large">Entrena tu actividad favorita</h1>
            </Stack>
            <p className="body-large opacity-80" style={{ marginTop: 8 }}>
                Puedes elegir diferentes actividades, cada vez se unen más
                centros deportivos. Revisa la lista.
            </p>
            <Grid container spacing={2} marginTop={4}>
                {activities.map((item, i) => (
                    <Grid
                        key={i}
                        size={{
                            xs: 6,
                            sm: 4,
                            xl: 3,
                        }}
                    >
                        <Card
                            elevation={0}
                            sx={{
                                bgcolor: scheme.secondaryContainer,
                                px: 2,
                                py: 4,
                            }}
                        >
                            <p className="title-medium">{item}</p>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
