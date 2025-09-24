import { ArrowBack, FileDownloadOutlined } from "@mui/icons-material";
import {
    Card,
    CardActionArea,
    CircularProgress,
    Container,
    Dialog,
    IconButton,
    Stack,
} from "@mui/material";
import { getDateFull, getEmailInfo } from "@utils/format";
import { useContext, useEffect, useState } from "react";
import Context from "./Context";
import { useApiMail } from "@api/mail";
import { Mail } from "@models/Mail";

export default function MailDetail({
    id = "",
    show,
    from,
    subject,
    date,
    onClose = () => {},
}: {
    id: string;
    from: string;
    subject: string;
    date: string;
    show: boolean;
    onClose?: () => void;
}) {
    const { scheme } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const [body, setBody] = useState("");
    const { leerEmail } = useApiMail();
    const [mail, setMail] = useState<Mail>();

    useEffect(() => {
        const load = async () => {
            if (!id) {
                setBody("");
                return;
            }
            setLoading(true);
            try {
                const res = await leerEmail(id);
                setBody(res.body ? res.body : "Sin contenido");
                setMail(res);
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        };
        load();
    }, [id]);

    function downloadFile(attachment: {
        filename: string;
        base64: string;
        mime_type: string;
    }) {
        const byteCharacters = atob(attachment.base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: attachment.mime_type });

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = attachment.filename;
        document.body.appendChild(a);
        a.click();
        a.remove();

        URL.revokeObjectURL(url);
    }

    return (
        <Dialog
            open={show}
            fullScreen
            slotProps={{ paper: { sx: { borderRadius: 0 } } }}
        >
            <Container
                maxWidth="md"
                sx={{
                    height: "100vh",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    pb: 2,
                }}
            >
                <Stack
                    component={"nav"}
                    direction={"row"}
                    alignItems={"center"}
                    py={3}
                    gap={2}
                >
                    <IconButton onClick={onClose}>
                        <ArrowBack />
                    </IconButton>
                    <h1 className="headline-small">{subject}</h1>
                </Stack>
                <Stack direction={"row"} gap={2} flexWrap={"wrap"} mb={1}>
                    <Stack
                        px={2}
                        py={1}
                        bgcolor={scheme.surfaceContainerLow}
                        border={"1px solid"}
                        borderColor={scheme.outlineVariant}
                        width={"max-content"}
                        borderRadius={2}
                    >
                        {getEmailInfo(from)?.name && (
                            <h3 className="title-medium">
                                {getEmailInfo(from)?.name}
                            </h3>
                        )}
                        <p className="body-medium">
                            {getEmailInfo(from)?.email}
                        </p>
                        <p
                            className="body-medium opacity-80"
                            style={{ marginTop: 4, whiteSpace: "nowrap" }}
                        >
                            {getDateFull(date)}
                        </p>
                    </Stack>
                    <Stack
                        sx={{ overflowX: "auto" }}
                        gap={2}
                        direction={"row"}
                        flexGrow={1}
                        alignItems={"center"}
                    >
                        {mail?.attachments.map((a, i) => (
                            <Card
                                key={i}
                                sx={{
                                    overflow: "unset",
                                    height: "min-content",
                                    marginBottom: 1,
                                }}
                            >
                                <CardActionArea
                                    sx={{
                                        px: 2,
                                        py: 1,
                                        bgcolor: scheme.primaryContainer,
                                        color: scheme.primary,
                                        display: "flex",
                                        gap: 1,
                                    }}
                                    onClick={() => downloadFile(a)}
                                >
                                    <FileDownloadOutlined fontSize="small" />
                                    <p
                                        className="body-small"
                                        style={{ whiteSpace: "nowrap" }}
                                    >
                                        {a.filename}
                                    </p>
                                </CardActionArea>
                            </Card>
                        ))}
                    </Stack>
                </Stack>
                <Stack
                    alignItems={"center"}
                    py={2}
                    px={2}
                    flexGrow={1}
                    overflow={"auto"}
                    borderRadius={2}
                    bgcolor={scheme.surfaceContainerLow}
                    border={"1px solid"}
                    borderColor={scheme.outlineVariant}
                >
                    {loading ? (
                        <Stack height={"100%"} justifyContent={"center"}>
                            <CircularProgress
                                color="primary"
                                variant="indeterminate"
                            />
                        </Stack>
                    ) : (
                        <div
                            dangerouslySetInnerHTML={{ __html: body }}
                            style={{ width: "100%" }}
                        ></div>
                    )}
                </Stack>
            </Container>
        </Dialog>
    );
}
