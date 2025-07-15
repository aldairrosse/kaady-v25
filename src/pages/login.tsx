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
import { useNavigate } from "react-router";

export default function Login() {
    const { scheme } = useContext(Context);
    const [show, setShow] = useState(false);

    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

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

    const login = () => {
        if (username === "admin" && password === "admin") {
            navigate("/user");
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    };

    return (
        <Stack
            sx={{ justifyContent: "center", alignItems: "center" }}
            height={"100dvh"}
            padding={2}
        >
            <Stack
                bgcolor={scheme.surfaceContainerLowest}
                sx={{
                    width: "100%",
                    maxWidth: "600px",
                    padding: 4,
                    borderRadius: 6,
                }}
                border={"1px solid"}
                borderColor={scheme.outlineVariant}
            >
                <Stack
                    marginBottom={4}
                    alignItems={"start"}
                >
                    <Logo type="horizontal" height="36px" />
                </Stack>
                <h1 className="headline-medium">Inicia tu sesión</h1>
                <p className="body-medium opacity-70" style={{ marginTop: 4 }}>
                    Tus credenciales se guardan en este dispositivo
                </p>
                <Stack gap={2} marginTop={2}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <TextField
                            fullWidth
                            placeholder="Usuario"
                            type="email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            slotProps={{
                                input: {
                                    sx: { borderRadius: 2 },
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircleOutlined
                                                sx={{ mr: 1 }}
                                            />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <TextField
                            fullWidth
                            placeholder="Contraseña"
                            type={show ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            slotProps={{
                                input: {
                                    sx: { borderRadius: 2 },
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOutline sx={{ mr: 1 }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: passEnd,
                                },
                            }}
                        />
                    </Box>
                </Stack>
                <Stack gap={2} marginTop={4} marginBottom={2}>
                    <Button
                        size="large"
                        variant="contained"
                        disableElevation
                        onClick={login}
                    >
                        Iniciar sesión
                    </Button>
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
