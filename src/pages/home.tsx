import Context from "@components/Context";
import Logo from "@components/Logo";
import Rights from "@components/Rights";
import Root from "@components/Root";
import { MenuRounded } from "@mui/icons-material";
import {
    Button,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    SxProps,
    Tab,
    Tabs,
    useMediaQuery,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

export default function Home() {
    const navigate = useNavigate();
    const [ruta, setRuta] = useState("/home");
    const { pathname } = useLocation();
    const { theme } = useContext(Context);
    const [anchor, setAnchor] = useState<HTMLButtonElement>();
    const open = Boolean(anchor);

    const isLarge = useMediaQuery(theme.breakpoints.up("sm"));

    useEffect(() => {
        navigate(ruta);
    }, [ruta]);

    useEffect(() => {
        setRuta(pathname);
    }, [pathname]);

    const sx: SxProps = {
        minHeight: 30,
        padding: "8px 12px",
    };

    const close = () => setAnchor(undefined);

    return (
        <Root>
            <Stack direction={"row"} alignItems={"center"} gap={2} paddingY={2}>
                <Logo type="favicon" height="40px" />
                {isLarge && (
                    <Stack flexGrow={1} direction={"row"} gap={4}>
                        <Tabs
                            value={ruta}
                            onChange={(_e, v) => setRuta(v)}
                            aria-label="navbar"
                            component="nav"
                            sx={{ minHeight: 36 }}
                        >
                            <Tab
                                label="Inicio"
                                value="/home"
                                disableRipple
                                sx={sx}
                            />
                            <Tab
                                label="Membresías"
                                value="/home/memberships"
                                disableRipple
                                sx={sx}
                            />
                            <Tab
                                label="Socios"
                                value="/home/partners"
                                disableRipple
                                sx={sx}
                            />
                        </Tabs>
                    </Stack>
                )}
                <Stack flexGrow={1} direction={"row"} justifyContent={"end"}>
                    {isLarge ? (
                        <Button variant="contained">Registrame</Button>
                    ) : (
                        <IconButton onClick={(e) => setAnchor(e.currentTarget)}>
                            <MenuRounded />
                        </IconButton>
                    )}
                    <Menu
                        open={open}
                        anchorEl={anchor}
                        onClose={close}
                        slotProps={{
                            paper: {
                                sx: { minWidth: 220 },
                            },
                        }}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                    >
                        <MenuItem
                            onClick={() => {
                                setRuta("/home");
                                close();
                            }}
                        >
                            Inicio
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                setRuta("/home/memberships");
                                close();
                            }}
                        >
                            Membresías
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                setRuta("/home/partners");
                                close();
                            }}
                        >
                            Socios
                        </MenuItem>

                        <Stack paddingY={2} paddingX={2}>
                            <Button variant="contained" fullWidth>
                                Registrame
                            </Button>
                        </Stack>
                    </Menu>
                </Stack>
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
