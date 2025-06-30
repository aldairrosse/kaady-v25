import Logo from "@components/Logo";
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

export default function () {
    const [step, setStep] = useState(1);
    const [dir, setDir] = useState<"right" | "left">("right");
    const navigate = useNavigate();

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
                        <Button size="large" variant="contained">
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
        </Stack>
    );
}
