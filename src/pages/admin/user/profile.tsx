import { useUser } from "@hooks/useUser";
import {
    AccountCircle,
    ArrowBack,
    Check,
    Security,
    AdminPanelSettings,
} from "@mui/icons-material";
import {
    AppBar,
    Button,
    IconButton,
    Stack,
    TextField,
    Toolbar,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Chip,
    Box,
} from "@mui/material";
import { useNavigate } from "react-router";
import { getDateInput, parseDateInput } from "@utils/format";
import { useState, useEffect } from "react";

export default function Profile() {
    const navigate = useNavigate();
    const user = useUser((s) => s.data);
    const update = useUser((s) => s.setData);

    const max = new Date();
    max.setHours(0, 0, 0, 0);
    const min = new Date(max);
    min.setFullYear(min.getFullYear() - 80);
    max.setFullYear(max.getFullYear() - 18);

    const [birthday, setBirthday] = useState(
        getDateInput(user.birthday ? new Date(user.birthday) : max)
    );

    useEffect(() => {
        const date = parseDateInput(birthday);
        if (date) {
            update({ birthday: date.toISOString() });
        }
    }, [birthday]);

    const handleAction = async () => {};
    const isInvalid = () => {
        const basicRequired = !user.name;
        const accessRequired = !user._id && (!user.email || !user.password);
        const adminRequired = !user.role?.length;
        const centerIdInvalid = !!user.center && user.center.length !== 24;

        return (
            basicRequired || accessRequired || adminRequired || centerIdInvalid
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
                        {user._id
                            ? "Actualiza el perfil"
                            : "Registra nuevo usuario"}
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
                <Stack maxWidth={"sm"} width={"100%"} gap={4}>
                    {/* Información Básica */}
                    <Stack>
                        <Stack
                            alignItems={"center"}
                            direction={"row"}
                            gap={2}
                            mb={2}
                        >
                            <AccountCircle />
                            <h2 className="title-medium">Información básica</h2>
                        </Stack>
                        <TextField
                            label="Nombre(s)"
                            value={user.name || ""}
                            onChange={(e) => update({ name: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                        <Stack direction={"row"} gap={2} mb={2}>
                            <TextField
                                label="Apellido paterno"
                                value={user.paternal_surname || ""}
                                onChange={(e) =>
                                    update({ paternal_surname: e.target.value })
                                }
                                fullWidth
                            />
                            <TextField
                                label="Apellido materno"
                                value={user.maternal_surname || ""}
                                onChange={(e) =>
                                    update({ maternal_surname: e.target.value })
                                }
                                fullWidth
                            />
                        </Stack>
                        <Stack direction={"row"} gap={2}>
                            <TextField
                                label="Fecha de nacimiento"
                                type="date"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                                slotProps={{
                                    inputLabel: { shrink: true },
                                    htmlInput: {
                                        max: getDateInput(max),
                                        min: getDateInput(min),
                                    },
                                }}
                                fullWidth
                            />
                            <FormControl fullWidth>
                                <InputLabel>Género</InputLabel>
                                <Select
                                    value={user.genre || ""}
                                    label="Género"
                                    onChange={(e) =>
                                        update({
                                            genre: e.target.value as
                                                | "D"
                                                | "H"
                                                | "M",
                                        })
                                    }
                                >
                                    <MenuItem value="H">Hombre</MenuItem>
                                    <MenuItem value="M">Mujer</MenuItem>
                                    <MenuItem value="D">Otro</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                    </Stack>

                    {!user._id && (
                        <Stack>
                            <Stack
                                alignItems={"center"}
                                direction={"row"}
                                gap={2}
                                mb={2}
                            >
                                <Security />
                                <h2 className="title-medium">Acceso</h2>
                            </Stack>
                            <TextField
                                label="Correo electrónico"
                                type="email"
                                value={user.email || ""}
                                onChange={(e) =>
                                    update({ email: e.target.value })
                                }
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Contraseña"
                                type="password"
                                value={user.password || ""}
                                onChange={(e) =>
                                    update({ password: e.target.value })
                                }
                            />
                        </Stack>
                    )}

                    {/* Administración */}
                    <Stack>
                        <Stack
                            alignItems={"center"}
                            direction={"row"}
                            gap={2}
                            mb={2}
                        >
                            <AdminPanelSettings />
                            <h2 className="title-medium">Administración</h2>
                        </Stack>
                        <FormControl sx={{ mb: 2 }}>
                            <InputLabel>Roles</InputLabel>
                            <Select
                                multiple
                                value={user.role || []}
                                label="Roles"
                                onChange={(e) =>
                                    update({ role: e.target.value as number[] })
                                }
                                renderValue={(selected) => (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: 0.5,
                                        }}
                                    >
                                        {selected.map((value) => {
                                            const roleNames = {
                                                1: "Usuario",
                                                2: "Centro",
                                                3: "Email",
                                                10: "Administrador",
                                            };
                                            return (
                                                <Chip
                                                    key={value}
                                                    label={
                                                        roleNames[
                                                            value as keyof typeof roleNames
                                                        ]
                                                    }
                                                    size="small"
                                                />
                                            );
                                        })}
                                    </Box>
                                )}
                            >
                                <MenuItem value={1}>Usuario</MenuItem>
                                <MenuItem value={2}>Panel del centro</MenuItem>
                                <MenuItem value={3}>Web email</MenuItem>
                                <MenuItem value={10}>
                                    Panel administrador
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Centro (ID MongoDB)"
                            value={user.center || ""}
                            onChange={(e) => update({ center: e.target.value })}
                            helperText="El usuario es asignado a este centro"
                            slotProps={{
                                htmlInput: {
                                    pattern: "[a-f0-9]{24}",
                                    minLength: 24,
                                    maxLength: 24,
                                },
                            }}
                        />
                    </Stack>
                </Stack>
                <Stack
                    direction={"row"}
                    px={4}
                    py={2}
                    mt={6}
                    justifyContent={"center"}
                    width={"100%"}
                >
                    <Button
                        startIcon={<Check />}
                        variant="contained"
                        size="large"
                        disableElevation
                        onClick={handleAction}
                        disabled={isInvalid()}
                    >
                        {user._id ? "Actualizar perfil" : "Registrar usuario"}
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
}
