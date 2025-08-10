import { useApiMail } from "@api/mail";
import Context from "@components/Context";
import MailDetail from "@components/MailDetail";
import { Mail } from "@models/Mail";
import { StarBorder } from "@mui/icons-material";
import {
    Box,
    CircularProgress,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Stack,
} from "@mui/material";
import { getDateShort, getEmailInfo } from "@utils/format";
import { useContext, useEffect, useState } from "react";

export default function Outbox() {
    const { listarEmail } = useApiMail();
    const [mails, setMails] = useState<Mail[]>([]);
    const [loading, setLoading] = useState(false);
    const { scheme } = useContext(Context);
    const [detail, setDetail] = useState({
        id: "",
        show: false,
        from: "",
        subject: "",
        date: "",
    });

    const load = async () => {
        setLoading(true);
        try {
            const res = await listarEmail("enviados");
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
        const info = getEmailInfo(from);
        if (!info) return "Desconocido";
        if (info.name) return info.name;
        return info.email;
    };

    return (
        <Box
            width={"100%"}
            height={"100%"}
            sx={{
                px: 2,
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
            </Stack>
            {loading && (
                <Stack alignItems={"center"} py={2}>
                    <CircularProgress color="primary" variant="indeterminate" />
                </Stack>
            )}
            {!loading && !mails.length && (
                <Stack py={2}>
                    <p className="body-large opacity-80">
                        No se encontraron correos en esta bandeja
                    </p>
                </Stack>
            )}
            <List disablePadding>
                {mails.map((item, i) => (
                    <ListItem key={i} disablePadding>
                        <ListItemButton
                            sx={{ borderRadius: 4, gap: 2 }}
                            onClick={() =>
                                setDetail({
                                    show: true,
                                    id: item.key,
                                    from: item.to,
                                    subject: item.subject,
                                    date: item.date,
                                })
                            }
                        >
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
                                {getName(item.to)}
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

            <MailDetail
                {...detail}
                onClose={() =>
                    setDetail((p) => ({ ...p, show: false, id: "" }))
                }
            />
        </Box>
    );
}
