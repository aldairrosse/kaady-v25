import Context from "@components/Context";
import Logo from "@components/Logo";
import {
    AccountCircleOutlined,
    LockOutline,
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";
import {
    Box,
    Button,
    Divider,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
} from "@mui/material";
import { useContext, useState } from "react";

export default function () {
    const { scheme } = useContext(Context);
    const [show, setShow] = useState(false);

    const passEnd = (
        <InputAdornment position="end">
            <IconButton
                onClick={() => setShow(!show)}
                onMouseDown={(e) => e.preventDefault()}
                onMouseUp={(e) => e.preventDefault()}
            >
                {show ? <VisibilityOff /> : <Visibility />}
            </IconButton>
        </InputAdornment>
    );

    return (
        <Stack
            sx={{ justifyContent: "center", alignItems: "center" }}
            height={"100dvh"}
            padding={4}
        >
            <Stack
                bgcolor={scheme.surfaceContainerLowest}
                sx={{
                    width: "100%",
                    maxWidth: "600px",
                    padding: 4,
                    borderRadius: 4,
                }}
                border={"1px solid"}
                borderColor={scheme.outlineVariant}
            >
                <Stack marginBottom={4}>
                    <Logo type="horizontal" />
                </Stack>
                <h1 className="headline-medium">Inicia tu sesión</h1>
                <p className="body-medium opacity-70" style={{ marginTop: 1 }}>
                    Tus credenciales se guardan en este dispositivo
                </p>
                <Stack gap={2} marginTop={2}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <AccountCircleOutlined
                            fontSize="large"
                            className="opacity-80"
                            sx={{ mr: 2 }}
                        />
                        <TextField fullWidth label="Usuario" type="email" />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <LockOutline
                            fontSize="large"
                            className="opacity-80"
                            sx={{ mr: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Contraseña"
                            type={show ? "text" : "password"}
                            slotProps={{
                                input: {
                                    endAdornment: passEnd,
                                },
                            }}
                        />
                    </Box>
                </Stack>
                <Stack gap={2} marginTop={4}>
                    <Button size="large" variant="contained">
                        Iniciar sesión
                    </Button>
                    <Button size="large">Registrarme</Button>
                </Stack>
                <Divider
                    sx={{
                        marginTop: 2,
                        display: "none",
                        borderColor: scheme.outlineVariant,
                    }}
                />
            </Stack>
        </Stack>
    );
}
