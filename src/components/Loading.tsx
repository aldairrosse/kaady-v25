import { CircularProgress, Dialog, Stack } from "@mui/material";
import Logo from "./Logo";

export default function Loading({
    message = "Cargando...",
    show = false,
}: {
    message?: string;
    show: boolean;
}) {
    return (
        <Dialog
            open={show}
            fullScreen
            slotProps={{ paper: { sx: { borderRadius: 0 } } }}
        >
            <Stack alignItems={"center"} justifyContent={"center"} height={'100%'}>
                <Logo type="square" height="180px" />

                <CircularProgress
                    sx={{ mb: 2, mt: 4 }}
                    size={40}
                    thickness={3}
                    disableShrink
                />
                <p className="body-large">{message}</p>
            </Stack>
        </Dialog>
    );
}
