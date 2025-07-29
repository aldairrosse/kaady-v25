import {
    AccountCircle,
    ArrowBack,
    Check,
    FitnessCenter,
} from "@mui/icons-material";
import {
    AppBar,
    Button,
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
    const navigate = useNavigate();
    const [list, setList] = useState<string[]>([]);
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
    return (
        <Stack
            sx={{
                height: "100dvh",
                maxHeight: "100dvh",
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
                    <h1 className="title-large">Registra nuevo centro</h1>
                </Toolbar>
            </AppBar>
            <Stack
                flexGrow={1}
                sx={{ overflowY: "auto", pt: 4, pb: 6, px: 4 }}
                alignItems={"center"}
            >
                <Stack maxWidth={"sm"} width={"100%"}>
                    <Stack alignItems={"center"} direction={"row"} gap={2}>
                        <FitnessCenter />
                        <h2 className="title-medium">Información básica</h2>
                    </Stack>
                    <TextField label="Nombre de perfil" sx={{ mt: 2 }} />
                    <TextField
                        label="Descripción"
                        sx={{ mt: 2 }}
                        multiline
                        rows={3}
                    />
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>Actividades principales</InputLabel>
                        <Select
                            value={list}
                            label="Actividades principales"
                            onChange={(e) =>
                                setList(e.target.value as string[])
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
                    <Stack
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
                </Stack>
            </Stack>
            <Divider />
            <Stack direction={"row"} px={4} py={2} justifyContent={"center"}>
                <Button
                    startIcon={<Check />}
                    variant="contained"
                    size="large"
                    disableElevation
                >
                    Registrar centro
                </Button>
            </Stack>
        </Stack>
    );
}
