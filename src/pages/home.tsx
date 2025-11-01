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
    const [ruta, setRuta] = useState(0);
    const { pathname } = useLocation();
    const { theme } = useContext(Context);
    const [anchor, setAnchor] = useState<HTMLButtonElement>();
    const open = Boolean(anchor);

    const isLarge = useMediaQuery(theme.breakpoints.up("sm"));

    useEffect(() => {
        const cleaned = pathname.replace(/\/+$/, "");
        switch (cleaned) {
            case "/home": {
                setRuta(0);
                break;
            }
            case "/home/memberships": {
                setRuta(1);
                break;
            }
            case "/home/partners": {
                setRuta(2);
                break;
            }
            default: {
                setRuta(0);
                break;
            }
        }
    }, [pathname]);

    const sx: SxProps = {
        minHeight: "unset",
        padding: "8px 16px",
        minWidth: "auto",
    };

    const toHome = () => navigate("/home");
    const toMemberships = () => navigate("/home/memberships");
    const toPartners = () => navigate("/home/partners");
    const toRegister = () => navigate("/register");
    const close = () => setAnchor(undefined);

    return (
        <Root>
            <Stack direction={"row"} alignItems={"center"} gap={2} paddingY={2}>
                <a title="Inicio" onClick={() => navigate("/")}>
                    <Logo type="favicon" height="40px" />
                </a>
                {isLarge && (
                    <Stack flexGrow={1} direction={"row"} gap={4}>
                        <Tabs
                            value={ruta}
                            aria-label="navbar"
                            component="nav"
                            slotProps={{
                                indicator: {
                                    sx: {
                                        borderRadius: "6px 6px 0 0",
                                        height: "3px",
                                        transform: "scaleX(0.8)",
                                    },
                                },
                            }}
                            sx={{
                                minHeight: "unset",
                            }}
                        >
                            <Tab
                                label="Inicio"
                                onClick={toHome}
                                disableRipple
                                sx={sx}
                            />
                            <Tab
                                label="Membresías"
                                onClick={toMemberships}
                                disableRipple
                                sx={sx}
                            />
                            <Tab
                                label="Socios"
                                onClick={toPartners}
                                disableRipple
                                sx={sx}
                            />
                        </Tabs>
                    </Stack>
                )}
                <Stack flexGrow={1} direction={"row"} justifyContent={"end"}>
                    {isLarge ? (
                        <Button
                            variant="contained"
                            onClick={toRegister}
                            disableElevation
                        >
                            Registrame
                        </Button>
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
                                toHome();
                                close();
                            }}
                        >
                            Inicio
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                toMemberships();
                                close();
                            }}
                        >
                            Membresías
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                toPartners();
                                close();
                            }}
                        >
                            Socios
                        </MenuItem>

                        <Stack paddingY={2} paddingX={2}>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={toRegister}
                                disableElevation
                            >
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
