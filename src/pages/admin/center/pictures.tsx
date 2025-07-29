import ImagePlaceholder from "@components/ImagePlaceholder";
import {
    ArrowBack,
    Delete,
    FileUpload,
    FitnessCenter,
    Image,
} from "@mui/icons-material";
import {
    AppBar,
    Box,
    Button,
    Grid,
    IconButton,
    Stack,
    Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router";

export default function Nuevo() {
    const navigate = useNavigate();
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
                    <h1 className="title-large">Imágenes</h1>
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
                        <h2 className="title-medium">Foto de perfil</h2>
                    </Stack>
                    <p
                        className="body-large opacity-80"
                        style={{ marginTop: 4 }}
                    >
                        Seleccione una imagen de máximo 3MB.
                    </p>
                    <Stack alignItems={"center"} mt={1}>
                        <Box
                            sx={{
                                height: 200,
                                width: 200,
                                borderRadius: 4,
                                overflow: "hidden",
                            }}
                        >
                            <ImagePlaceholder />
                        </Box>
                        <Stack
                            direction={"row"}
                            alignItems={"center"}
                            marginTop={1}
                            gap={4}
                        >
                            <Stack
                                direction={"column"}
                                alignItems={"center"}
                                maxWidth={120}
                            >
                                <IconButton color="primary">
                                    <FileUpload />
                                </IconButton>
                                <p className="body-medium">Subir</p>
                            </Stack>

                            <Stack
                                direction={"column"}
                                alignItems={"center"}
                                maxWidth={120}
                            >
                                <IconButton color="primary">
                                    <Delete fontSize="small" />
                                </IconButton>
                                <p className="body-medium">Eliminar</p>
                            </Stack>
                        </Stack>
                    </Stack>

                    <Stack
                        alignItems={"center"}
                        direction={"row"}
                        gap={2}
                        mt={6}
                    >
                        <Image />
                        <h2 className="title-medium">Galería del centro</h2>
                    </Stack>
                    <p
                        className="body-large opacity-80"
                        style={{ marginTop: 4 }}
                    >
                        Puedes mostrar fotos del lugar o de tu equipo a los
                        usuarios (máximo 10).
                    </p>
                    <Grid container spacing={1} sx={{ pt: 1 }}>
                        <Grid
                            size={{
                                xs: 6,
                                sm: 4,
                            }}
                        >
                            <Box
                                sx={{
                                    height: 200,
                                    width: 200,
                                    borderRadius: 4,
                                    overflow: "hidden",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    border: (t) =>
                                        `1px solid ${t.palette.divider}`,
                                    bgcolor: (t) => t.palette.background.paper,
                                }}
                            >
                                <Button
                                    startIcon={<FileUpload />}
                                    sx={{ px: 2 }}
                                >
                                    Subir
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Stack>
            </Stack>
        </Stack>
    );
}
