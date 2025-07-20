import Logo from "@components/Logo";
import Rights from "@components/Rights";
import Root from "@components/Root";
import { CloudOffOutlined } from "@mui/icons-material";
import { Card, Stack } from "@mui/material";
import { useLocation } from "react-router";

export default function All() {
    const location = useLocation();

    return (
        <Root
            sx={{ display: "flex", flexDirection: "column", paddingBottom: 4 }}
        >
            <Stack pt={4}>
                <Logo height="40px" />
            </Stack>
            <h1 className="headline-large" style={{ marginTop: 56 }}>
                Ruta no encontrada
            </h1>
            <Card
                elevation={0}
                sx={{
                    mb: 2,
                    bgcolor: (t) => t.palette.background.paper,
                    width: "max-content",
                    py: 1,
                    px: 2,
                    mt: 1,
                }}
            >
                <Stack direction={"row"} alignItems={"center"} gap={2}>
                    <CloudOffOutlined color="primary" />
                    <p className="body-large opacity-80">{location.pathname}</p>
                </Stack>
            </Card>
            <p
                className="body-medium opacity-80"
                style={{ marginTop: 8, marginBottom: 120, flexGrow: 1 }}
            >
                Es posible que la ruta sea incorrecta o haya dejado de existir.
            </p>
            <Rights />
        </Root>
    );
}
