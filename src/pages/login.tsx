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
                    padding: 2,
                    borderRadius: 4,
                }}
                border={"1px solid"}
                borderColor={scheme.outlineVariant}
            >
                <Stack
                    marginBottom={4}
                    marginLeft={7}
                    marginTop={2}
                    alignItems={"start"}
                >
                    <Logo type="horizontal" height="28px" />
                </Stack>
                <h1 className="headline-medium" style={{ marginLeft: 52 }}>
                    Inicia tu sesión
                </h1>
                <p
                    className="body-medium opacity-70"
                    style={{ marginTop: 4, marginLeft: 52 }}
                >
                    Tus credenciales se guardan en este dispositivo
                </p>
                <Stack gap={2} marginTop={2}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <AccountCircleOutlined
                            fontSize="large"
                            className="opacity-80"
                            sx={{ mr: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Usuario"
                            type="email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
