import { StarBorder } from "@mui/icons-material";
import {
    Box,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Stack,
} from "@mui/material";

export default function Outbox() {
    const mails = [1, 2, 3];
    return (
        <Box
            width={"100%"}
            height={"100%"}
            sx={{
                p: 4,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Stack
                direction={"row"}
                justifyContent={"end"}
                alignItems={"center"}
                gap={4}
            >
                <IconButton color="primary">
                    <StarBorder />
                </IconButton>
            </Stack>
            <List disablePadding>
                {mails.map((i) => (
                    <ListItem key={i} disablePadding>
                        <ListItemButton sx={{ borderRadius: 4, gap: 2 }}>
                            <h2
                                className="title-medium"
                                style={{
                                    minWidth: 140,
                                    maxWidth: 140,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                Google Play Store
                            </h2>
                            <ListItemText
                                primary={
                                    <p className="body-large">
                                        Título del correo
                                    </p>
                                }
                                secondary={"Este es el contenido del correo"}
                            />
                            <p className="body-medium">10 abr</p>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
