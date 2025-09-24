import { useApiMail } from "@api/mail";
import { useApiUser } from "@api/user";
import Context from "@components/Context";
import Loading from "@components/Loading";
import Logo from "@components/Logo";
import SimpleDialog from "@components/SimpleDialog";
import { ApiError } from "@hooks/useRequest";
import { useSession } from "@hooks/useSession";
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
import { getRedirect } from "@utils/user";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export default function Login() {
    const { loginUser, userProfile } = useApiUser();
    const { verIdentidad } = useApiMail();
    const { scheme } = useContext(Context);
    const [show, setShow] = useState(false);

    const [data, setData] = useState({ user: "", pass: "" });
    const [loading, setLoading] = useState({ show: false, message: "" });
    const [alert, setAlert] = useState({
        show: false,
        message: "",
        title: "",
        icon: "",
    });
    const session = useSession();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const init = async () => {
            if (!session.token) return;
            try {
                await loadProfile();
            } catch (error) {
                console.error(error);
            }
        };
        init();
    }, []);

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

    const showAlert = (title: string, message: string, icon: string = "") => {
        setAlert({
            show: true,
            title,
            message,
            icon,
        });
    };

    const login = async () => {
        if (!data.pass || !data.user) {
            showAlert(
                "Faltan datos",
                "Debe ingresar su usuario y contraseña para iniciar",
                "account_circle"
            );
            return;
        }
        setLoading({
            show: true,
            message: "Iniciando sesión...",
        });
        try {
            const res = await loginUser(data.user, data.pass);
            session.setToken(res.token);
            setLoading({
                show: true,
                message: `Bienvenido ${res.data.name.trim()}, buscando perfil...`,
            });
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await loadProfile();
        } catch (error) {
            setLoading({
                show: false,
                message: "",
            });
            const err = error as ApiError;
            showAlert(err.message, err.error as string, "error");
            session.logout();
        }
    };

    const updateForm = (d: { user?: string; pass?: string }) => {
        setData((v) => {
            return {
                user: d.user ?? v.user,
                pass: d.pass ?? v.pass,
            };
        });
    };

    const loadProfile = async () => {
        const user = await userProfile();
        session.setUser(user);
        const res = await verIdentidad();
        if (res) {
            session.setIdentity(res);
        }
        if (!user.role.length) {
            throw new ApiError(
                "Usuario sin perfil",
                "El usuario no tiene un rol o está sin perfil"
            );
        }
        const from = location.state?.from;
        if (from) {
            navigate(from);
            return;
        }

        if (user.role.length > 1) {
            navigate("/role");
            return;
        }
        const redirect = getRedirect(user.role[0]);
        navigate(redirect.to);
    };

    return (
        <Stack
            sx={{ justifyContent: "center", alignItems: "center" }}
            height={"100vh"}
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
                <Stack marginBottom={4} alignItems={"start"}>
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
                            value={data.user}
                            onChange={(e) =>
                                updateForm({ user: e.target.value })
                            }
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
                            value={data.pass}
                            onChange={(e) =>
                                updateForm({ pass: e.target.value })
                            }
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

            <Loading {...loading} />
            <SimpleDialog
                {...alert}
                onClose={() => setAlert((prev) => ({ ...prev, show: false }))}
            />
        </Stack>
    );
}
