import { Bookmark } from "@mui/icons-material";
import { Box, Icon, Stack } from "@mui/material";

export default function Bookings() {
    return (
        <Box sx={{ px: 3, pt: 4 }}>
            <Stack direction={"row"} gap={2}>
                <Icon color="primary">
                    <Bookmark />
                </Icon>
                <h1 className="title-large">Mis reservaciones</h1>
            </Stack>
            <p className="body-large opacity-80" style={{ marginTop: 8 }}>
                Aún no haz relizado una actividad, revisa las clases disponibles
                en los centros deportivos.
            </p>
        </Box>
    );
}
