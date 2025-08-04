import { useApiMail } from "@api/mail";
import Context from "@components/Context";
import { Mail } from "@models/Mail";
import { StarBorder, Sync } from "@mui/icons-material";
import {
    Box,
    Button,
    CircularProgress,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Stack,
} from "@mui/material";
import { getDateShort, parseEmailInfo } from "@utils/format";
import { useContext, useEffect, useState } from "react";

export default function Inbox() {
    const { listarEmail } = useApiMail();
    const [mails, setMails] = useState<Mail[]>([]);
    const [loading, setLoading] = useState(false);
    const { scheme } = useContext(Context);

    const load = async () => {
        setLoading(true);
        try {
            const res = await listarEmail("recibidos");
            setMails(res);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        load();
    }, []);

    const getName = (from: string) => {
        const info = parseEmailInfo(from);
        if (!info) return "Desconocido";
        if (info.name) return info.name;
        return info.email;
    };

    return (
        <Box
            width={"100%"}
            height={"100%"}
            sx={{
                px: 4,
                pt: 2,
                pb: 10,
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
                pb={2}
            >
                <IconButton>
                    <StarBorder />
                </IconButton>
                <Button
                    color="inherit"
                    onClick={load}
                    disabled={loading}
                    startIcon={<Sync />}
                >
                    Actualizar
                </Button>
            </Stack>
            {loading && (
                <Stack alignItems={"center"} py={2}>
                    <CircularProgress color="primary" variant="indeterminate" />
                </Stack>
            )}
            {!loading && !mails.length && (
                <Stack py={2}>
                    <p className="body-large opacity-80">
                        No se encontraron correos en tu bandeja
                    </p>
                </Stack>
            )}
            <List disablePadding>
                {mails.map((item, i) => (
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
                                {getName(item.from)}
                            </h2>
                            <ListItemText
                                primary={
                                    <p
                                        className="body-large"
                                        style={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {item.subject}
                                    </p>
                                }
                                secondary={
                                    <span className="body-medium opacity-80">
                                        {item.preview}...
                                    </span>
                                }
                            />
                            <p
                                className="body-medium"
                                style={{
                                    whiteSpace: "nowrap",
                                    color: scheme.primary,
                                }}
                            >
                                {getDateShort(item.date)}
                            </p>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
