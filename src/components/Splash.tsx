import { CircularProgress, Stack } from "@mui/material";

export default function Splash() {
    return (
        <Stack
            height={"100vh"}
            justifyContent={"center"}
            padding={4}
            alignItems={"center"}
        >
            <CircularProgress sx={{ mb: 2 }} size={64} thickness={3} disableShrink />
            <p className="body-large">Iniciando...</p>
        </Stack>
    );
}
