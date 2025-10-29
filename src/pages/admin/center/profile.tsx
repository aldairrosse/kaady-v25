import { useApiCenter } from "@api/center";
import Loading from "@components/Loading";
import SimpleDialog from "@components/SimpleDialog";
import { useCenter } from "@hooks/useCenter";
import { ApiError } from "@hooks/useRequest";
import {
    // AccountCircle,
    ArrowBack,
    ArrowForward,
    Check,
    ContentCopy,
    FitnessCenter,
    InfoRounded,
} from "@mui/icons-material";
import {
    AppBar,
    Button,
    Card,
    Divider,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Toolbar,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Nuevo() {
    const { actualizarCentro } = useApiCenter();
    const center = useCenter((s) => s.data);
    const update = useCenter((s) => s.setData);
    const navigate = useNavigate();
    const [loading, setLoading] = useState({ show: false, message: "" });
    const [alert, setAlert] = useState({
        show: false,
        message: "",
        title: "",
    });
    const activities = [
        "Boxeo",
        "Danza",
        "Taekwondo",
        "Halterofilia",
        "Cardio",
        "Natación",
        "Crossfit",
        "Gimnasia",
        "Pesas",
        "Spinning",
        "Running",
        "Otro",
    ];
    const showAlert = (title: string, message: string) => {
        setAlert({
            show: true,
            title,
            message,
        });
    };
    const handleAction = async () => {
        if (!center._id) {
            navigate("/admin/center/location");
            return;
        }
        setLoading({
            show: true,
            message: "Actualizando perfil...",
        });
        try {
            await actualizarCentro(center._id, {
                name: center.name,
                description: center.description,
                activities: center.activities,
            });
            navigate(-1);
        } catch (error) {
            const err = error as ApiError;
            showAlert(err.message, err.error as string);
        }
        setLoading({
            show: false,
            message: "",
        });
    };
    const isInvalid = () => {
        return (
            !center.name || !center.description || !center.activities?.length
        );
    };
    return (
        <Stack
            sx={{
                height: "100vh",
                maxHeight: "100vh",
                width: "100%",
                overflow: "hidden",
                position: "relative",
            }}
        >
            <AppBar position="sticky" component={"nav"} elevation={0}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        sx={{ mr: 2 }}
                        onClick={() => navigate(-1)}
                    >
                        <ArrowBack />
                    </IconButton>
                    <h1 className="title-large">
                        {center._id
                            ? "Actualiza el perfil"
                            : "Registra nuevo centro"}
                    </h1>
                </Toolbar>
            </AppBar>
            <Stack
                flexGrow={1}
                sx={{ overflowY: "auto", pt: 4, pb: 6, px: 4 }}
                alignItems={"center"}
                component={"form"}
                autoComplete="off"
            >
                <Stack maxWidth={"sm"} width={"100%"}>
                    <Stack alignItems={"center"} direction={"row"} gap={2}>
                        <FitnessCenter />
                        <h2 className="title-medium">Información básica</h2>
                    </Stack>
                    <TextField
                        label="Nombre de perfil"
                        sx={{ mt: 2 }}
                        value={center.name || ""}
                        onChange={(e) => update({ name: e.target.value })}
                    />
                    <TextField
                        label="Descripción"
                        sx={{ mt: 2 }}
                        multiline
                        rows={3}
                        value={center.description || ""}
                        onChange={(e) =>
                            update({ description: e.target.value })
                        }
                    />
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>Actividades principales</InputLabel>
                        <Select
                            value={center.activities || []}
                            label="Actividades principales"
                            onChange={(e) =>
                                update({
                                    activities: e.target.value as string[],
                                })
                            }
                            multiple
                            MenuProps={{
                                slotProps: {
                                    paper: {
                                        sx: {
                                            maxHeight: "250px",
                                        },
                                    },
                                },
                            }}
                        >
                            {activities.map((item) => (
                                <MenuItem value={item}>{item}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {center._id && (
                        <>
                            <Stack
                                alignItems={"center"}
                                direction={"row"}
                                gap={2}
                                mt={6}
                            >
                                <InfoRounded />
                                <h2 className="title-medium">Identificador</h2>
                            </Stack>
                            <Card
                                sx={{
                                    width: "min-content",
                                    padding: "4px 8px",
                                    mt: 1,
                                }}
                                variant="outlined"
                            >
                                <Stack
                                    direction={"row"}
                                    alignItems={"center"}
                                    gap={2}
                                >
                                    <p className="body-large opacity-80">
                                        {center._id}
                                    </p>
                                    <IconButton
                                        size="small"
                                        color="primary"
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                center._id || ""
                                            );
                                        }}
                                    >
                                        <ContentCopy />
                                    </IconButton>
                                </Stack>
                            </Card>
                        </>
                    )}

                    {/* <Stack
                        alignItems={"center"}
                        direction={"row"}
                        gap={2}
                        mt={6}
                    >
                        <AccountCircle />
                        <h2 className="title-medium">
                            Información de contacto
                        </h2>
                    </Stack>
                    <TextField label="Nombre completo" sx={{ mt: 2 }} />
                    <Stack direction={"row"} gap={2} mt={2}>
                        <TextField label="Apellido paterno" fullWidth />
                        <TextField label="Apellido materno" fullWidth />
                    </Stack>
                    <Stack direction={"row"} gap={2} mt={2}>
                        <TextField label="Correo electrónico" fullWidth />
                        <TextField label="Teléfono" fullWidth />
                    </Stack>
                    <TextField label="Contraseña" sx={{ mt: 2 }} /> */}
                </Stack>
            </Stack>
            <Divider className="opacity-30" />
            <Stack
                direction={"row"}
                px={4}
                py={2}
                justifyContent={"end"}
                bgcolor={(t) => t.palette.background.paper}
            >
                <Button
                    startIcon={center._id ? <Check /> : <ArrowForward />}
                    variant="contained"
                    size="large"
                    disableElevation
                    onClick={handleAction}
                    disabled={isInvalid()}
                >
                    {center._id ? "Actualizar perfil" : "Siguiente"}
                </Button>
            </Stack>

            <Loading {...loading} />
            <SimpleDialog
                {...alert}
                onClose={() => setAlert((prev) => ({ ...prev, show: false }))}
            />
        </Stack>
    );
}
