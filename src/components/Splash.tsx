import { CircularProgress, Stack } from "@mui/material";

export default function () {
    return (
        <Stack
            height={"100dvh"}
            justifyContent={"center"}
            padding={4}
            alignItems={"center"}
        >
            <CircularProgress sx={{ mb: 2 }} size={64} thickness={2} disableShrink />
            <p className="body-large">Cargando...</p>
        </Stack>
    );
}
