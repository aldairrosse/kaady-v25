import { useApiUser } from "@api/user";
import Loading from "@components/Loading";
import Logo from "@components/Logo";
import SimpleDialog from "@components/SimpleDialog";
import { useRegister } from "@hooks/register";
import { ApiError } from "@hooks/request";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import {
    AppBar,
    Button,
    Container,
    Divider,
    IconButton,
    Slide,
    Stack,
    Toolbar,
} from "@mui/material";
import AccountForm from "@views/user/AccountForm";
import AgeForm from "@views/user/AgeForm";
import NameForm from "@views/user/NameForm";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Register() {
    const [step, setStep] = useState(1);
    const [dir, setDir] = useState<"right" | "left">("right");
    const navigate = useNavigate();
    const register = useRegister();
    const { registerUser } = useApiUser();
    const [loading, setLoading] = useState({ show: false, message: "" });
    const [alert, setAlert] = useState({
        show: false,
        message: "",
        title: "",
        text: "OK",
    });

    const showAlert = (title: string, message: string, text: string) => {
        setAlert({
            show: true,
            title,
            message,
            text,
        });
    };

    const handleRegister = async () => {
        setLoading({
            show: true,
            message: "Registrando tu cuenta...",
        });
        try {
            const msg = await registerUser(register.data);
            showAlert("Completado", msg, "Iniciar sesión");
        } catch (error) {
            const err = error as ApiError;
            showAlert(err.message, err.error as string, "OK");
        }
        setLoading({
            show: false,
            message: "",
        });
    };

    const handleComplete = () => {
        setAlert((v) => ({
            ...v,
            show: false,
        }));
        if (alert.text.includes("Iniciar")) {
            const now = new Date();
            now.setFullYear(now.getFullYear() - 18);
            now.setHours(0, 0, 0, 0);
            register.setAccount("", "");
            register.setAge(now, "D");
            register.setNames("", "", "");
            navigate("/login", { replace: true });
        }
    };

    return (
        <Stack>
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        sx={{ mr: 2 }}
                        onClick={() => navigate(-1)}
                    >
                        <ArrowBack />
                    </IconButton>
                    <Stack direction={"row"} gap={1} alignItems={"center"}>
                        <h1 className="title-large clamp-1">Registro</h1>
                        <Logo type="isotype" color="white" height="16px" />
                    </Stack>
                </Toolbar>
            </AppBar>

            <Container maxWidth="sm" sx={{ py: 4, overflowX: "hidden" }}>
                <Slide
                    direction={dir}
                    in={step === 1}
                    mountOnEnter
                    unmountOnExit
                    timeout={{ enter: 300, exit: 0 }}
                >
                    <NameForm />
                </Slide>
                <Slide
                    direction={dir}
                    in={step === 2}
                    mountOnEnter
                    unmountOnExit
                    timeout={{ enter: 300, exit: 0 }}
                >
                    <AgeForm />
                </Slide>
                <Slide
                    direction={dir}
                    in={step === 3}
                    mountOnEnter
                    unmountOnExit
                    timeout={{ enter: 300, exit: 0 }}
                >
                    <AccountForm />
                </Slide>

                <Stack direction={"row"} marginTop={6} gap={2}>
                    {step > 1 && (
                        <Button
                            size="large"
                            variant="outlined"
                            startIcon={<ArrowBack />}
                            onClick={() => {
                                setDir("right");
                                setStep(step - 1);
                            }}
                        >
                            Atrás
                        </Button>
                    )}
                    {step < 3 && (
                        <Button
                            size="large"
                            variant="outlined"
                            startIcon={<ArrowForward />}
                            onClick={() => {
                                setDir("left");
                                setStep(step + 1);
                            }}
                        >
                            Continuar
                        </Button>
                    )}
                    {step == 3 && (
                        <Button
                            size="large"
                            variant="contained"
                            disabled={!register.isValid()}
                            onClick={handleRegister}
                        >
                            Registrame
                        </Button>
                    )}
                </Stack>

                <Divider sx={{ mt: 4, mb: 1 }} />
                <Stack direction={"row"} gap={1} alignItems={"center"}>
                    <h2 className="title-medium">¿Ya tienes una cuenta?</h2>
                    <Button onClick={() => navigate("/login")}>
                        Inicia sesión
                    </Button>
                </Stack>
            </Container>

            <Loading show={loading.show} message={loading.message} />
            <SimpleDialog
                show={alert.show}
                title={alert.title}
                message={alert.message}
                okText={alert.text}
                onClose={handleComplete}
            />
        </Stack>
    );
}
