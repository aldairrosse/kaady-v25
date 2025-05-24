import { Stack, Typography } from "@mui/material";
import Logo from "./Logo";
import { useContext } from "react";
import Context from "./Context";

function Rights() {
    const year = new Date().getFullYear();
    const { scheme } = useContext(Context);

    return (
        <Stack direction={"row"} gap={2} alignItems={"center"}>
            <Logo type="icon" height="24px" color={scheme.onSurfaceVariant} />
            <Typography variant="body2" style={{ opacity: 0.7 }}>
                © Kaady Sport. México. {year}
            </Typography>
        </Stack>
    );
}

export default Rights;
