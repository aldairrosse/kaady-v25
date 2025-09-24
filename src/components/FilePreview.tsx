import { Dialog, Container, IconButton, Stack } from "@mui/material";
import { Close, InfoRounded } from "@mui/icons-material";
import { getDocUrl } from "@utils/docs";

interface FilePreviewProps {
    show: boolean;
    id: string;
    mime_type: string;
    base64?: string;
    onClose: () => void;
}

export default function FilePreview({
    show,
    id,
    mime_type,
    base64,
    onClose,
}: FilePreviewProps) {
    const isImage = mime_type.startsWith("image/");
    const isPdf = mime_type === "application/pdf";

    const renderPreview = () => {
        if (isImage) {
            let url = `data:${mime_type};base64,${base64}`;
            if (!base64) {
                url = getDocUrl(
                    { id, mime_type },
                    { fit: "contain", height: 400 }
                );
            }
            return (
                <img
                    src={url}
                    alt="Preview"
                    style={{
                        width: "100%",
                        minHeight: "100vh",
                        maxHeight: "100vh",
                        objectFit: "contain",
                    }}
                />
            );
        }

        if (isPdf) {
            let url = `data:${mime_type};base64,${base64}`;
            if (!base64) {
                url = getDocUrl({ id, mime_type });
            }
            return (
                <iframe
                    src={`${url}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&scrollbar=1`}
                    title="Preview"
                    style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                        background: "none",
                        padding: 0,
                        margin: 0,
                    }}
                />
            );
        }

        return (
            <Stack
                alignItems={"center"}
                justifyContent={"center"}
                sx={{ p: 2, color: "text.secondary" }}
                height={"100%"}
                gap={4}
            >
                <InfoRounded color="info" fontSize="large" />
                Vista previa no disponible para este tipo de archivo
            </Stack>
        );
    };

    return (
        <Dialog
            open={show}
            fullScreen
            slotProps={{ paper: { sx: { borderRadius: 0, p: 0 } } }}
        >
            <Container
                maxWidth="md"
                sx={{
                    p: 0,
                    m: 0,
                    px: "0 !important",
                    margin: "0 auto",
                    height: "100vh",
                    minHeight: "100vh",
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        top: 16,
                        right: 24,
                        zIndex: 1,
                        bgcolor: "rgba(0,0,0,0.5)",
                        color: "white",
                        "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                    }}
                    title="Cerrar"
                >
                    <Close />
                </IconButton>
                {renderPreview()}
            </Container>
        </Dialog>
    );
}
