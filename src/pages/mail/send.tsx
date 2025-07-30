import {
    AttachFile,
    FormatBold,
    FormatItalic,
    FormatSize,
} from "@mui/icons-material";
import {
    Box,
    IconButton,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import { useState } from "react";

export default function Send() {
    const [type, setType] = useState("text");

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
            <h1 className="title-large">Enviar correo</h1>
            <TextField label="Para" sx={{ mt: 2 }} />
            <TextField label="Asunto" sx={{ mt: 2 }} />
            <Stack
                direction={"row"}
                mt={4}
                justifyContent={"end"}
                alignItems={"end"}
                gap={2}
            >
                <h2 className="title-medium" style={{ flexGrow: 1 }}>
                    Contenido
                </h2>
                <ToggleButtonGroup
                    value={type}
                    onChange={(_e, value) => setType(value)}
                    aria-label="format mail"
                    size="small"
                >
                    <ToggleButton value="text_strong">
                        <FormatBold />
                    </ToggleButton>
                    <ToggleButton value="text_italic">
                        <FormatItalic />
                    </ToggleButton>
                    <ToggleButton value="text_title">
                        <FormatSize />
                    </ToggleButton>
                </ToggleButtonGroup>
                <IconButton>
                    <AttachFile />
                </IconButton>
            </Stack>
            <TextField
                placeholder="Escribe un mensaje"
                multiline
                rows={8}
                sx={{ mt: 2 }}
            />
        </Box>
    );
}
