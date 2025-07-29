import { Code, Image, MailOutline, TextFormat } from "@mui/icons-material";
import {
    Box,
    InputAdornment,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import { useState } from "react";

export default function Identity() {
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
            <h1 className="title-large">Identidad de correo</h1>
            <p className="body-large opacity-80" style={{ marginTop: 8 }}>
                Usa un nombre y firma con tu información actualizada
            </p>
            <TextField
                placeholder="Nombre de identidad"
                sx={{ mt: 2 }}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <MailOutline />
                            </InputAdornment>
                        ),
                    },
                }}
            />
            <Stack direction={"row"} mt={6} alignItems={"end"}>
                <p className="title-medium" style={{ flexGrow: 1 }}>
                    Firma de correo
                </p>
                <ToggleButtonGroup
                    value={type}
                    exclusive
                    onChange={(_e, value) => setType(value)}
                    aria-label="firma mail"
                    size="small"
                >
                    <ToggleButton value="text">
                        <TextFormat />
                    </ToggleButton>
                    <ToggleButton value="html">
                        <Code />
                    </ToggleButton>
                    <ToggleButton value="image">
                        <Image />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Stack>
            <TextField multiline rows={5} sx={{ mt: 2 }} />
        </Box>
    );
}
