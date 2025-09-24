import {
    AppBar,
    Box,
    Divider,
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
import { JSX, useContext, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import Context from "./Context";
import Logo from "./Logo";
import { Menu } from "@mui/icons-material";

interface ItemLink {
    title: string;
    icon: JSX.Element;
    path: string;
    titleMobile?: boolean;
    divider?: boolean;
}

export default function Dashboard({
    children,
    options,
    color = "primary",
}: {
    options: ItemLink[];
    color?:
        | "transparent"
        | "error"
        | "info"
        | "success"
        | "warning"
        | "primary";
    children?: JSX.Element;
}) {
    const [open, setOpen] = useState(false);
    const { scheme } = useContext(Context);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isTablet = useMediaQuery((theme) => theme.breakpoints.down("md"));

    const isSelected = (path: string) => {
        const cleaned = pathname.replace(/\/+$/, "");
        return path == cleaned;
    };

    const isIndex = () => {
        const cleaned = pathname.replace(/\/+$/, "");
        return options[0]?.path == cleaned;
    };

    const getTitle = () => {
        const cleaned = pathname.replace(/\/+$/, "");
        const item = options.find((o) => o.path == cleaned);
        return item?.title ?? "";
    };

    const showTitle = () => {
        if (!isTablet) return false;
        const cleaned = pathname.replace(/\/+$/, "");
        const item = options.find((o) => o.path == cleaned);
        return item?.titleMobile ?? false;
    };

    const isOptionRoute = () => {
        const cleaned = pathname.replace(/\/+$/, "");
        const item = options.find((o) => o.path == cleaned);
        return !!item;
    };

    return (
        <Stack
            sx={{
                height: "100vh",
                maxHeight: "100vh",
                width: "100%",
                overflow: "hidden",
                position: "relative",
            }}
        >
            <AppBar
                sx={{
                    zIndex: (t) =>
                        isTablet ? t.zIndex.appBar : t.zIndex.drawer + 1,
                    display: !isOptionRoute() ? "none" : "",
                }}
                position="sticky"
                component={"nav"}
                color={color}
                elevation={0}
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

                    {showTitle() ? (
                        <h1 className="title-large">{getTitle()}</h1>
                    ) : (
                        <Logo height="28px" color="white" />
                    )}
                </Toolbar>
            </AppBar>
            <Stack
                direction={"row"}
                sx={{
                    height: "100%",
                    width: "100%",
                    overflow: isOptionRoute() ? "hidden" : "auto",
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
                        display: !isOptionRoute() ? "none" : "",
                        "& .MuiDrawer-paper": {
                            position: isTablet ? "" : "relative",
                            bgcolor: scheme.surfaceContainerLowest,
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
                                    {item.divider && <Divider />}
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Drawer>
                <Outlet />
                {!!children && (
                    <Box
                        sx={{
                            width: "100%",
                            height: "100%",
                            position: "relative",
                            display: isIndex() ? "block" : "none",
                        }}
                    >
                        {children}
                    </Box>
                )}
            </Stack>
        </Stack>
    );
}
