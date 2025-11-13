import {
    ArrowBack,
    Badge,
    CheckCircle,
    FitnessCenter,
} from "@mui/icons-material";
import {
    AppBar,
    Button,
    Container,
    Dialog,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useCenter } from "@hooks/useCenter";
import { useRegister } from "@hooks/useRegister";
import { useState } from "react";
import Loading from "@components/Loading";
import SimpleDialog from "@components/SimpleDialog";
import { ApiError } from "@hooks/useRequest";
import { useApiCenter } from "@api/center";

function CenterRequest() {
    const { registrarCentroUsuario } = useApiCenter();
    const navigate = useNavigate();
    const center = useCenter((s) => s.data);
    const updateCenter = useCenter((s) => s.setData);

    const [user, setUser] = useState({
        name: "",
        first: "",
        second: "",
        email: "",
    });

    const [completed, setCompleted] = useState(false);

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

    const mexicanStates = [
        "Aguascalientes",
        "Baja California",
        "Baja California Sur",
        "Campeche",
        "Chiapas",
        "Chihuahua",
        "Ciudad de México",
        "Coahuila",
        "Colima",
        "Durango",
        "Estado de México",
        "Guanajuato",
        "Guerrero",
        "Hidalgo",
        "Jalisco",
        "Michoacán",
        "Morelos",
        "Nayarit",
        "Nuevo León",
        "Oaxaca",
        "Puebla",
        "Querétaro",
        "Quintana Roo",
        "San Luis Potosí",
        "Sinaloa",
        "Sonora",
        "Tabasco",
        "Tamaulipas",
        "Tlaxcala",
        "Veracruz",
        "Yucatán",
        "Zacatecas",
    ];

    const isValid = () => {
        return (
            center.name &&
            center.description &&
            center.activities?.length &&
            center.location_data?.state &&
            user.name &&
            user.first &&
            user.email
        );
    };

    const handleRequest = async () => {
        setLoading({
            show: true,
            message: "Solicitando registro de socio...",
        });
        try {
            await registrarCentroUsuario({
                center,
                user: user,
            });
            setCompleted(true);
        } catch (error) {
            const err = error as ApiError;
            setAlert({
                show: true,
                title: err.message,
                message: err.error as string,
            });
        }
        setLoading({
            show: false,
            message: "",
        });
    };
    return (
        <Stack>
            <AppBar position="sticky" elevation={0} color="inherit">
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
                        <h1 className="title-large clamp-1">
                            Solicitar registro de tu centro
                        </h1>
                    </Stack>
                </Toolbar>
            </AppBar>
            <Container maxWidth="sm" sx={{ py: 4, overflowX: "hidden" }}>
                <h2 className="title-medium" style={{ marginBottom: 8 }}>
                    <FitnessCenter sx={{ mr: 1, mb: "-2px" }} />
                    Acerca del centro deportivo
                </h2>
                <p className="body-large opacity-80">
                    Describe las actividades principales de tu centro
                </p>
                <TextField
                    label="Nombre del centro"
                    sx={{ mt: 2 }}
                    fullWidth
                    value={center.name || ""}
                    onChange={(e) => updateCenter({ name: e.target.value })}
                />

                <TextField
                    label="Descripción"
                    sx={{ mt: 2 }}
                    fullWidth
                    multiline
                    rows={3}
                    value={center.description || ""}
                    onChange={(e) =>
                        updateCenter({ description: e.target.value })
                    }
                />

                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Actividades principales</InputLabel>
                    <Select
                        value={center.activities || []}
                        label="Actividades principales"
                        onChange={(e) =>
                            updateCenter({
                                activities: e.target.value as string[],
                            })
                        }
                        multiple
                        MenuProps={{
                            slotProps: {
                                paper: {
                                    sx: { maxHeight: "250px" },
                                },
                            },
                        }}
                    >
                        {activities.map((item) => (
                            <MenuItem key={item} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Estado del país</InputLabel>
                    <Select
                        value={center.location_data?.state || ""}
                        label="Estado del país"
                        onChange={(e) =>
                            updateCenter({
                                location_data: {
                                    address: "",
                                    state: e.target.value,
                                    latitude: 0,
                                    longitude: 0,
                                },
                            })
                        }
                        MenuProps={{
                            slotProps: {
                                paper: {
                                    sx: { maxHeight: "250px" },
                                },
                            },
                        }}
                    >
                        {mexicanStates.map((state) => (
                            <MenuItem key={state} value={state}>
                                {state}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <h2
                    className="title-medium"
                    style={{ marginTop: 32, marginBottom: 8 }}
                >
                    <Badge sx={{ mr: 1, mb: "-2px" }} />
                    Acerca de ti
                </h2>
                <p className="body-large opacity-80">
                    Agrega los datos para contactarte
                </p>

                <TextField
                    label="Nombre(s)"
                    sx={{ mt: 2 }}
                    fullWidth
                    value={user.name}
                    onChange={(e) =>
                        setUser((v) => ({ ...v, name: e.target.value }))
                    }
                />

                <Stack direction="row" sx={{ mt: 2 }} gap={2}>
                    <TextField
                        fullWidth
                        label="Apellido paterno"
                        value={user.first}
                        onChange={(e) =>
                            setUser((v) => ({
                                ...v,
                                first: e.target.value,
                            }))
                        }
                    />
                    <TextField
                        fullWidth
                        label="Apellido materno"
                        value={user.second}
                        onChange={(e) =>
                            setUser((v) => ({
                                ...v,
                                second: e.target.value,
                            }))
                        }
                    />
                </Stack>
                <TextField
                    label="Correo electrónico"
                    sx={{ mt: 2 }}
                    fullWidth
                    type="email"
                    value={user.email}
                    onChange={(e) =>
                        setUser((v) => ({ ...v, email: e.target.value }))
                    }
                />

                <Stack direction={"row"} justifyContent={"center"} mt={8}>
                    <Button
                        size="large"
                        variant="contained"
                        disabled={!isValid()}
                        onClick={handleRequest}
                    >
                        Solicitar registro
                    </Button>
                </Stack>
            </Container>

            <Loading {...loading} />
            <SimpleDialog
                {...alert}
                onClose={() => setAlert({ ...alert, show: false })}
            />

            <Dialog open={completed}>
                <Stack sx={{ py: 3, px: 4 }}>
                    <CheckCircle
                        fontSize="large"
                        color="success"
                        sx={{ mb: 2, fontSize: 40 }}
                    />
                    <h2 className="title-large" style={{ marginBottom: 8 }}>
                        Listo {user.name}, tu registro ha sido enviado
                    </h2>
                    <p className="body-large opacity-80">
                        En breve recibirás un correo electrónico con los pasos
                        necesarios para activar tu centro{" "}
                        <strong>{center.name}</strong>
                    </p>
                    <Button
                        sx={{ mb: 1, mt: 2 }}
                        onClick={() => {
                            useCenter.setState({ data: {} });
                            useRegister.setState({ data: {} });
                            navigate(-1);
                        }}
                    >
                        Okey
                    </Button>
                </Stack>
            </Dialog>
        </Stack>
    );
}

export default CenterRequest;
