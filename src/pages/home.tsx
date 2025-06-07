import Logo from "@components/Logo";
import Rights from "@components/Rights";
import Root from "@components/Root";
import { Button, Link, Stack } from "@mui/material";
import { Outlet, useNavigate } from "react-router";

export default function Home() {
    const navigate = useNavigate();

    return (
        <Root>
            <Stack direction={"row"} alignItems={"center"} gap={6} paddingY={2}>
                <Logo type="icon" height="40px" />
                <Stack flexGrow={1} direction={"row"} gap={4}>
                    <Link underline="none" onClick={() => navigate("/home")}>
                        Inicio
                    </Link>
                    <Link
                        color="textPrimary"
                        underline="none"
                        onClick={() => navigate("/home/memberships")}
                    >
                        Membresías
                    </Link>
                    <Link color="textPrimary" underline="none">
                        Socios
                    </Link>
                </Stack>
                <Button variant="contained">Registrame</Button>
            </Stack>
            <Outlet />
            <Stack>
                <Stack alignItems={"center"} paddingY={4}>
                    <Rights />
                </Stack>
            </Stack>
        </Root>
    );
}
