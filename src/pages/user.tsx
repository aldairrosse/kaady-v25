import Context from "@components/Context";
import Logo from "@components/Logo";
import {
    AccountCircle,
    Bookmark,
    FitnessCenter,
    Map,
    Menu,
    Segment,
} from "@mui/icons-material";
import {
    AppBar,
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Toolbar,
    useMediaQuery,
} from "@mui/material";
import { useContext, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

export default function User() {
    const [open, setOpen] = useState(false);
    const { scheme } = useContext(Context);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isTablet = useMediaQuery((theme) => theme.breakpoints.down("md"));
    const options = [
        {
            title: "Mapa",
            icon: <Map />,
            path: "/user",
        },
        {
            title: "Centros",
            icon: <FitnessCenter />,
            path: "/user/centers",
        },
        {
            title: "Actividades",
            icon: <Segment />,
            path: "/user/activities",
        },
        {
            title: "Reservaciones",
            icon: <Bookmark />,
            path: "/user/bookings",
        },
        {
            title: "Cuenta",
            icon: <AccountCircle />,
            path: "/user/account",
        },
    ];

    const isSelected = (path: string) => {
        const cleaned = pathname.replace(/\/+$/, "");
        return path == cleaned;
    };

    return (
        <Stack
            sx={{
                height: "100dvh",
                maxHeight: "100dvh",
                width: "100%",
                overflow: "hidden",
                position: "relative",
            }}
        >
            <AppBar
                sx={{
                    zIndex: (t) =>
                        isTablet ? t.zIndex.appBar : t.zIndex.drawer + 1,
                }}
                position="sticky"
            >
                <Toolbar>
                    {isTablet && (
                        <IconButton
                            edge="start"
                            color="inherit"
                            sx={{ mr: 2 }}
                            onClick={() => setOpen(true)}
                        >
                            <Menu />
                        </IconButton>
                    )}

                    <Logo height="28px" color="white" />
                </Toolbar>
            </AppBar>
            <Stack
                direction={"row"}
                sx={{
                    height: "100%",
                    width: "100%",
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <Drawer
                    open={open}
                    onClose={() => setOpen(false)}
                    variant={isTablet ? "temporary" : "permanent"}
                    sx={{
                        boxSizing: "border-box",
                        flexShrink: 0,
                        position: isTablet ? "" : "relative",
                        "& .MuiDrawer-paper": {
                            position: isTablet ? "" : "relative",
                        },
                    }}
                >
                    <Box sx={{ width: 250 }} onClick={() => setOpen(false)}>
                        <List>
                            {options.map((item, i) => (
                                <ListItem
                                    key={i}
                                    disablePadding
                                    sx={{ px: 1, pt: "2px" }}
                                >
                                    <ListItemButton
                                        sx={{
                                            borderRadius: 100,
                                            "&.Mui-selected": {
                                                backgroundColor:
                                                    scheme.primaryContainer,
                                                color: scheme.onPrimaryContainer,
                                            },
                                        }}
                                        selected={isSelected(item.path)}
                                        onClick={() => navigate(item.path)}
                                    >
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText>
                                            <h2 className="label-large opacity-90">
                                                {item.title}
                                            </h2>
                                        </ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Drawer>
                <Outlet />
            </Stack>
        </Stack>
    );
}
