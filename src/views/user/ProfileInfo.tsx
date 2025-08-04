import Context from "@components/Context";
import { useSession } from "@hooks/session";
import { Cake, Email, Logout, Sync, Wc } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
} from "@mui/material";
import { getCurrentRole } from "@utils/user";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router";

export default function ProfileInfo() {
    const { scheme } = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSession((state) => state.user);
    const name = useSession((state) => state.name());
    const logout = useSession((state) => state.logout);
    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    const sexo = {
        D: "Desconocido",
        H: "Hombre",
        M: "Mujer",
    };

    return (
        <Box
            sx={{
                px: 3,
                pt: 4,
                height: "100%",
                width: "100%",
                overflowY: "auto",
                pb: 4,
            }}
        >
            <Stack alignItems={"center"}>
                <Avatar
                    sx={{
                        height: 80,
                        width: 80,
                        mb: 2,
                        bgcolor: scheme.secondaryContainer,
                        color: scheme.onSecondaryContainer,
                        border: "1px solid",
                        borderColor: scheme.outlineVariant,
                    }}
                >
                    <h1 className="headline-large">
                        {user?.name.charAt(0) || "U"}
                    </h1>
                </Avatar>
                <h1 className="headline-medium">{name}</h1>
                <List sx={{ mt: 4, width: "100%" }}>
                    <ListItem>
                        <ListItemIcon>
                            <Email />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <h2 className="title-medium">
                                    Correo electrónico
                                </h2>
                            }
                            secondary={
                                <span className="body-large">
                                    {user?.email || "No registrado"}
                                </span>
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Cake />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <h2 className="title-medium">
                                    Fecha de nacimiento
                                </h2>
                            }
                            secondary={
                                <span className="body-large">
                                    {user?.birthday
                                        ? new Date(
                                              user.birthday
                                          ).toLocaleDateString()
                                        : "No registrado"}
                                </span>
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Wc />
                        </ListItemIcon>
                        <ListItemText
                            primary={<h2 className="title-medium">Sexo</h2>}
                            secondary={
                                <span className="body-large">
                                    {sexo[user?.genre || "D"]}
                                </span>
                            }
                        />
                    </ListItem>
                    {(user?.role.length || 1) > 1 && (
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => navigate("/role")}
                                sx={{ borderRadius: 4 }}
                            >
                                <ListItemIcon>
                                    <Sync />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <h2 className="title-medium">
                                            Cambiar role
                                        </h2>
                                    }
                                    secondary={
                                        <span className="body-large">
                                            {getCurrentRole(
                                                location.pathname,
                                                user?.role
                                            )}
                                        </span>
                                    }
                                />
                            </ListItemButton>
                        </ListItem>
                    )}
                </List>
                <Button
                    startIcon={<Logout />}
                    sx={{ px: 4, mt: 4 }}
                    color="error"
                    variant="outlined"
                    onClick={handleLogout}
                >
                    Cerrar sesión
                </Button>
            </Stack>
        </Box>
    );
}
