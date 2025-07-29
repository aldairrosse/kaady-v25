import {
    ArrowBack,
    Cancel,
    CheckCircle,
    Delete,
    FileUpload,
    Folder,
    PriceCheck,
    Receipt,
    SaveAlt,
    Visibility,
} from "@mui/icons-material";
import {
    AppBar,
    Autocomplete,
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

import banks from "@config/mexico-banks.json";

export default function Payment() {
    const navigate = useNavigate();
    const [membership, setMembership] = useState(1);
    const [bank, setBank] = useState<string | null>(null);
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
                    <h1 className="title-large">Forma de pago</h1>
                </Toolbar>
            </AppBar>
            <Stack
                flexGrow={1}
                sx={{ overflowY: "auto", pt: 4, pb: 6, px: 4 }}
                alignItems={"center"}
            >
                <Stack maxWidth={"sm"} width={"100%"}>
                    <Stack alignItems={"center"} direction={"row"} gap={2}>
                        <PriceCheck />
                        <h2 className="title-medium">Contrato</h2>
                    </Stack>
                    <Stack direction={"row"} gap={2} mt={2}>
                        <FormControl fullWidth>
                            <InputLabel>Disponible desde</InputLabel>
                            <Select
                                value={membership}
                                label="Disponible desde"
                                onChange={(e) =>
                                    setMembership(Number(e.target.value))
                                }
                            >
                                <MenuItem value={1}>BASIC</MenuItem>
                                <MenuItem value={2}>SILVER</MenuItem>
                                <MenuItem value={3}>GOLD</MenuItem>
                                <MenuItem value={4}>BLACK</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Pago por clase"
                            type="number"
                            fullWidth
                        />
                    </Stack>

                    <Stack
                        alignItems={"center"}
                        direction={"row"}
                        gap={2}
                        mt={6}
                    >
                        <Receipt />
                        <h2 className="title-medium">Facturación</h2>
                    </Stack>
                    <TextField
                        label="Nombre de la cuenta"
                        fullWidth
                        sx={{ mt: 2 }}
                    />

                    <TextField
                        label="Domicilio de facturación"
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                    <Stack direction={"row"} gap={2} mt={2}>
                        <Autocomplete
                            options={banks.sort()}
                            fullWidth
                            value={bank}
                            onChange={(_, v) => setBank(v)}
                            renderInput={(params) => (
                                <TextField {...params} label="Banco" />
                            )}
                        />
                        <TextField label="RFC" fullWidth />
                    </Stack>
                    <TextField
                        label="Clabe interbancaria"
                        fullWidth
                        sx={{ mt: 2 }}
                    />

                    <Stack
                        alignItems={"center"}
                        direction={"row"}
                        gap={2}
                        mt={6}
                    >
                        <Folder />
                        <h2 className="title-medium">Documentos</h2>
                    </Stack>
                    <Stack gap={1} mt={1}>
                        <p className="body-large opacity-80">
                            Agregue los documentos indicados
                        </p>
                        <Stack
                            direction={"row"}
                            gap={1}
                            alignItems={"center"}
                            bgcolor={(t) => t.palette.background.paper}
                            borderRadius={2}
                            px={2}
                            py={1}
                            boxShadow={(t) => t.shadows[1]}
                        >
                            <CheckCircle color="success" />
                            <Cancel color="error" />
                            <h3 className="title-small" style={{ flexGrow: 1 }}>
                                Comprobante de cuenta
                            </h3>
                            <IconButton>
                                <Visibility />
                            </IconButton>
                            <IconButton>
                                <FileUpload />
                            </IconButton>
                            <IconButton>
                                <Delete />
                            </IconButton>
                        </Stack>
                        <Stack
                            direction={"row"}
                            gap={1}
                            alignItems={"center"}
                            bgcolor={(t) => t.palette.background.paper}
                            borderRadius={2}
                            px={2}
                            py={1}
                            boxShadow={(t) => t.shadows[1]}
                        >
                            <CheckCircle color="success" />
                            <Cancel color="error" />
                            <h3 className="title-small" style={{ flexGrow: 1 }}>
                                Identificación oficial (INE)
                            </h3>
                            <IconButton>
                                <Visibility />
                            </IconButton>
                            <IconButton>
                                <FileUpload />
                            </IconButton>
                            <IconButton>
                                <Delete />
                            </IconButton>
                        </Stack>
                        <Stack
                            direction={"row"}
                            gap={1}
                            alignItems={"center"}
                            bgcolor={(t) => t.palette.background.paper}
                            borderRadius={2}
                            px={2}
                            py={1}
                            boxShadow={(t) => t.shadows[1]}
                        >
                            <CheckCircle color="success" />
                            <Cancel color="error" />
                            <h3 className="title-small" style={{ flexGrow: 1 }}>
                                Contrato Kaady Sport
                            </h3>
                            <IconButton>
                                <Visibility />
                            </IconButton>
                            <IconButton>
                                <FileUpload />
                            </IconButton>
                            <IconButton>
                                <Delete />
                            </IconButton>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
            <Divider />
            <Stack direction={"row"} px={4} py={2} justifyContent={"center"}>
                <Button
                    startIcon={<SaveAlt />}
                    variant="contained"
                    size="large"
                    disableElevation
                >
                    Guardar
                </Button>
            </Stack>
        </Stack>
    );
}
