import { CircularProgress, Stack } from "@mui/material";
import Logo from "./Logo";

export default function Splash() {
    return (
        <Stack
            height={"100vh"}
            justifyContent={"center"}
            padding={4}
            alignItems={"center"}
        >
            <Logo type="square" height="150px" />
            <CircularProgress
                sx={{ mb: 2, mt: 4 }}
                size={48}
                thickness={3}
                disableShrink
            />
            <p className="body-large">Cargando...</p>
        </Stack>
    );
}
