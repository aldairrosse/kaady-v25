import Context from "@components/Context";
import { Cake, Email, Logout, Wc } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
} from "@mui/material";
import { useContext } from "react";

export default function () {
    const { scheme } = useContext(Context);
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
                    E
                </Avatar>
                <h1 className="headline-medium">Eduardo Medina</h1>
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
                                    eduardo@kaadysport.com
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
                                <span className="body-large">01/01/2000</span>
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
                                <span className="body-large">Hombre</span>
                            }
                        />
                    </ListItem>
                </List>
                <Button
                    startIcon={<Logout />}
                    sx={{ px: 4, mt: 4 }}
                    color="error"
                    variant="outlined"
                >
                    Cerrar sesión
                </Button>
            </Stack>
        </Box>
    );
}
