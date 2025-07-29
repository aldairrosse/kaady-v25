import { Stack } from "@mui/material";
import Logo from "./Logo";
import { useContext } from "react";
import Context from "./Context";

export default function ImagePlaceholder() {
    const { scheme } = useContext(Context);

    return (
        <Stack
            width={"100%"}
            height={"100%"}
            alignItems={"center"}
            justifyContent={"center"}
            bgcolor={scheme.primaryContainer}
        >
            <Logo
                type="icon"
                height="calc(100% - 48px)"
                color={scheme.primary}
                sx={{ opacity: 0.6 }}
            />
        </Stack>
    );
}
