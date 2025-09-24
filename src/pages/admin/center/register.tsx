import { useApiCenter } from "@api/center";
import { useApiDocs } from "@api/docs";
import Context from "@components/Context";
import SimpleDialog from "@components/SimpleDialog";
import { useCenter } from "@hooks/useCenter";
import { ApiError } from "@hooks/useRequest";
import { Documento64 } from "@models/Documento";
import { ArrowBack, Check, LocationPin } from "@mui/icons-material";
import {
    AppBar,
    Avatar,
    Button,
    Card,
    Dialog,
    IconButton,
    Stack,
    Toolbar,
} from "@mui/material";
import { getMembershipFrom } from "@utils/format";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function RegisterCenter() {
    const { registrarCentro, actualizarCentro } = useApiCenter();
    const { uploadDocs } = useApiDocs();

    const center = useCenter((s) => s.data);
    const docs = useCenter((s) => s.docs);
    const { scheme } = useContext(Context);
    const navigate = useNavigate();
    const [completed, setCompleted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({
        show: false,
        message: "",
        title: "",
    });

    useEffect(() => {
        if (center._id || !center.name) navigate(-1);
    }, []);

    const cancel = () => {
        useCenter.getState().reset();
        navigate(-5);
    };

    const register = async () => {
        setLoading(true);
        try {
            const c = await registrarCentro(center);
            const upload = getToUpload();
            if (upload.length) {
                const res = await uploadDocs(upload);
                await actualizarCentro(c.data._id, {
                    document_data: getDocData(res),
                });
            }
            setCompleted(true);
        } catch (error) {
            const err = error as ApiError;
            setAlert({
                show: true,
                title: err.message,
                message: err.error as string,
            });
        }
        setLoading(false);
    };

    const getToUpload = () => {
        const toUpload: Documento64[] = [];
        const getDoc = (k: string) => {
            const d = docs[k as keyof typeof docs];
            if (d.mime_type && d.base64) {
                toUpload.push({
                    key: k,
                    mime_type: d.mime_type,
                    base64: d.base64,
                });
            }
        };
        getDoc("banco");
        getDoc("ine");
        getDoc("rfc");
        getDoc("contrato");
        return toUpload;
    };

    const getDocData = (
        res: { id: string; key: string; mime_type: string }[]
    ) => {
        const getDoc = (k: string) => {
            const doc = res.find((d) => d.key == k);
            if (!doc) return;
            return { id: doc.id, mime_type: doc.mime_type };
        };
        return {
            banco: getDoc("banco"),
            rfc: getDoc("rfc"),
            ine: getDoc("ine"),
            contrato: getDoc("contrato"),
        };
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
            <AppBar
                position="sticky"
                component={"nav"}
                elevation={0}
                color="transparent"
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        sx={{ mr: 2 }}
                        onClick={() => navigate(-1)}
                        disabled={loading}
                    >
                        <ArrowBack />
                    </IconButton>
                    <h1 className="title-large">Completar registro</h1>
                </Toolbar>
            </AppBar>

            <Stack
                flexGrow={1}
                sx={{ overflowY: "auto", pt: 4, pb: 6, px: 4 }}
                alignItems={"center"}
            >
                <Stack maxWidth={"sm"} width={"100%"} alignItems={"center"}>
                    <h2 className="headline-medium">{center.name || ""}</h2>
                    <Stack direction={"row"} sx={{ mt: 2, mb: 4 }}>
                        <Card
                            elevation={0}
                            sx={{
                                px: "8px",
                                py: "4px",
                                bgcolor: scheme.surfaceContainer,
                                color: scheme.onSurface,
                            }}
                        >
                            <p className="body-medium">
                                {getMembershipFrom(center.available_from)}
                            </p>
                        </Card>
                    </Stack>
                    <p className="body-large opacity-80">
                        {center.description || ""}
                    </p>

                    <Stack
                        direction={"row"}
                        sx={{ mt: 4, gap: 2 }}
                        alignItems={"center"}
                    >
                        <LocationPin color="primary" />
                        <p className="body-medium">
                            {center.location_data?.address || "Sin dirección"}
                        </p>
                    </Stack>

                    <Stack direction={"row"} sx={{ mt: 8, gap: 1 }}>
                        <Button
                            size="large"
                            onClick={cancel}
                            disabled={loading}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="contained"
                            disableElevation
                            size="large"
                            startIcon={<Check />}
                            onClick={register}
                            disabled={loading || completed}
                        >
                            Registrar centro
                        </Button>
                    </Stack>
                </Stack>
            </Stack>

            <SimpleDialog
                {...alert}
                onClose={() => setAlert((prev) => ({ ...prev, show: false }))}
            />
            <Dialog
                open={completed}
                maxWidth="xs"
                slotProps={{
                    paper: { sx: { pt: 3, px: 4, pb: 4, minWidth: 320 } },
                }}
            >
                <Stack alignItems={"center"}>
                    <Avatar sx={{ bgcolor: "success.main", mb: 2 }}>
                        <Check fontSize="large" />
                    </Avatar>
                    <h2 className="title-medium">{center.name}</h2>
                    <p
                        className="body-large opacity-80"
                        style={{ textAlign: "center", marginTop: 16 }}
                    >
                        El centro deportivo se ha registrado correctamente,
                        agregue imágenes o usuarios.
                    </p>
                    <Button onClick={cancel} sx={{ mt: 4 }} variant="tonal">
                        Listo
                    </Button>
                </Stack>
            </Dialog>
        </Stack>
    );
}
