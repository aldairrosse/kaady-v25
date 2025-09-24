import { Button, Dialog, Icon, Stack } from "@mui/material";

export default function SimpleDialog({
    title = "Modal básico",
    message = "Este es un dialogo modal básico",
    icon = "",
    okText = "OK",
    show = false,
    onClose = () => {},
}: {
    title: string;
    message: string;
    icon?: string;
    okText?: string;
    show: boolean;
    onClose: () => void;
}) {
    return (
        <Dialog
            open={show}
            maxWidth="xs"
            slotProps={{
                paper: { sx: { pt: 3, px: 4, pb: 2, minWidth: 320 } },
            }}
        >
            <Stack alignItems={"center"}>
                {icon && (
                    <Icon
                        sx={{ mb: 2, fontSize: 40 }}
                        fontSize="large"
                        className="opacity-80"
                    >
                        {icon}
                    </Icon>
                )}
            </Stack>
            <Stack width={"100%"} gap={1}>
                <h2 className="title-large" style={{ textAlign: "center" }}>
                    {title}
                </h2>
                <p className="body-large opacity-80">{message}</p>
            </Stack>
            <Stack direction={"row"} justifyContent={"end"} mt={2}>
                <Button onClick={onClose}>{okText}</Button>
            </Stack>
        </Dialog>
    );
}
