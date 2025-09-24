import { useApiCenter } from "@api/center";
import { useApiDocs } from "@api/docs";
import FilePreview from "@components/FilePreview";
import ImagePlaceholder from "@components/ImagePlaceholder";
import SimpleDialog from "@components/SimpleDialog";
import { useCenter } from "@hooks/useCenter";
import { ApiError } from "@hooks/useRequest";
import { Documento } from "@models/Documento";
import {
    Add,
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
import { getDocUrl, readFileAsBase64 } from "@utils/docs";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

export default function CenterPicture() {
    const { actualizarCentro } = useApiCenter();
    const { uploadDocs, removeDocs } = useApiDocs();
    const navigate = useNavigate();
    const center = useCenter((s) => s.data);
    const update = useCenter((s) => s.setData);
    const input = useRef<HTMLInputElement>(null);
    let current = "";

    const [loaders, setLoaders] = useState(new Map<string, boolean>());

    const [alert, setAlert] = useState({
        show: false,
        message: "",
        title: "",
    });
    const [preview, setPreview] = useState({
        show: false,
        id: "",
        mime_type: "",
    });

    useEffect(() => {
        if (!center._id) navigate(-1);
    }, []);

    const showAlert = (title: string, message: string) => {
        setAlert({
            show: true,
            title,
            message,
        });
    };

    const showPreview = (d?: Documento) => {
        if (!d) return;
        setPreview({
            show: true,
            id: d.id,
            mime_type: d.mime_type,
        });
    };

    const selectFile = (c: string) => {
        if (!input.current) return;
        current = c;
        input.current.click();
    };

    const onSelectFile = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!center._id) return;
        const files = e.target.files;
        if (!files) return;
        const file = files[0];
        if (!file) return;
        if (!current) return;
        if (file.size > 3e6) {
            showAlert(
                "Archivo muy grande",
                "El archivo debe ser menor a 3MB, revise o comprima su archivo."
            );
            return;
        }
        const key = String(current);
        current = "";
        let prev = center.resources || [];

        if (key != "picture") {
            update({
                resources: [...prev, { id: "", mime_type: file.type }],
            });
        }

        setLoaders((p) => new Map(p.set(key, true)));

        try {
            const doc = await readFileAsBase64(file);
            const res = await uploadDocs([
                { key, base64: doc.base64, mime_type: doc.mime_type },
            ]);
            const uploaded = res[0];
            if (uploaded) {
                const { id, mime_type } = uploaded;
                if (key == "picture") {
                    await actualizarCentro(center._id, {
                        image: { id, mime_type },
                    });
                    update({
                        image: { id, mime_type },
                    });
                } else {
                    await actualizarCentro(center._id, {
                        resources: [...prev, { id, mime_type }],
                    });
                    update({
                        resources: [...prev, { id, mime_type }],
                    });
                }
            }
        } catch (error) {
            const err = error as ApiError;
            showAlert(
                err.message,
                (err.error as string) || "Se encontró un error desconocido"
            );
        }
        setLoaders((p) => new Map(p.set(key, false)));
    };

    const deleteFile = async (k: string, d?: Documento) => {
        if (!k || !d) return;
        if (!center._id) return;

        setLoaders((prev) => new Map(prev.set(k, true)));

        try {
            await removeDocs([d]);
            if (k == "picture") {
                await actualizarCentro(center._id, {
                    image: { id: "", mime_type: "" },
                });
                update({
                    image: { id: "", mime_type: "" },
                });
            } else {
                const index = parseInt(k);
                const docs = center.resources?.filter((_, i) => i != index);
                await actualizarCentro(center._id, {
                    resources: docs,
                });
                update({
                    resources: docs,
                });
            }
        } catch (error) {
            const err = error as ApiError;
            showAlert(
                err.message,
                (err.error as string) || "Se encontró un error desconocido"
            );
        }
        setLoaders((prev) => new Map(prev.set(k, false)));
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
                    <h1 className="title-large">Imágenes y recursos</h1>
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
                        <ImagePlaceholder
                            showProgress={loaders.get("picture") ?? false}
                            enableZoom={!!center.image?.id}
                            onZoom={() => showPreview(center.image)}
                            src={
                                center.image?.id
                                    ? getDocUrl(center.image, {
                                          width: 100,
                                          height: 100,
                                      })
                                    : ""
                            }
                        />
                        <Stack
                            direction={"row"}
                            alignItems={"center"}
                            marginTop={1}
                            gap={4}
                        >
                            {center.image?.id ? (
                                <Stack
                                    direction={"column"}
                                    alignItems={"center"}
                                    maxWidth={120}
                                >
                                    <IconButton
                                        color="primary"
                                        onClick={() =>
                                            deleteFile("picture", center.image)
                                        }
                                    >
                                        <Delete fontSize="small" />
                                    </IconButton>
                                    <p className="body-medium opacity-80">
                                        Eliminar
                                    </p>
                                </Stack>
                            ) : (
                                <Stack
                                    direction={"column"}
                                    alignItems={"center"}
                                    maxWidth={120}
                                >
                                    <IconButton
                                        color="primary"
                                        onClick={() => selectFile("picture")}
                                    >
                                        <FileUpload />
                                    </IconButton>
                                    <p className="body-medium opacity-80">
                                        Subir foto
                                    </p>
                                </Stack>
                            )}
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
                    <Grid container spacing={2} sx={{ pt: 1 }}>
                        {center.resources?.map((d, i) => (
                            <Grid
                                size={{
                                    xs: 6,
                                    sm: 4,
                                }}
                                key={i.toString()}
                            >
                                <ImagePlaceholder
                                    width={200}
                                    height={200}
                                    showProgress={
                                        loaders.get(i.toString()) ?? false
                                    }
                                    enableDelete={!!d.id}
                                    enableZoom={!!d.id}
                                    onZoom={() => showPreview(d)}
                                    onDelete={() => deleteFile(i.toString(), d)}
                                    src={
                                        d.id
                                            ? getDocUrl(d, {
                                                  width: 100,
                                                  height: 100,
                                              })
                                            : ""
                                    }
                                />
                            </Grid>
                        ))}
                        {(center.resources?.length ?? 0) < 10 && (
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
                                        bgcolor: (t) =>
                                            t.palette.background.paper,
                                    }}
                                >
                                    <Button
                                        startIcon={<Add />}
                                        sx={{ px: 2 }}
                                        onClick={() =>
                                            selectFile(
                                                String(
                                                    center.resources?.length ??
                                                        0
                                                )
                                            )
                                        }
                                    >
                                        Agregar foto
                                    </Button>
                                </Box>
                            </Grid>
                        )}
                    </Grid>

                    <input
                        ref={input}
                        style={{ display: "none" }}
                        type="file"
                        accept=".jpg,.png,.jpeg"
                        onChange={onSelectFile}
                    />
                </Stack>
            </Stack>

            <SimpleDialog
                {...alert}
                onClose={() => setAlert((prev) => ({ ...prev, show: false }))}
            />
            <FilePreview
                {...preview}
                onClose={() => setPreview((prev) => ({ ...prev, show: false }))}
            />
        </Stack>
    );
}
