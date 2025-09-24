import {
    ArrowBack,
    ArrowForward,
    Cancel,
    Check,
    CheckCircle,
    Delete,
    FileUpload,
    Folder,
    Pending,
    PriceCheck,
    Receipt,
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
import { ChangeEvent, useRef, useState } from "react";
import { useNavigate } from "react-router";

import banks from "@config/mexico-banks.json";
import { useCenter } from "@hooks/useCenter";
import Loading from "@components/Loading";
import SimpleDialog from "@components/SimpleDialog";
import { CenterDocument, CenterPayment } from "@models/Center";
import { getDocName, readFileAsBase64 } from "@utils/docs";
import FilePreview from "@components/FilePreview";
import { useApiCenter } from "@api/center";
import { ApiError } from "@hooks/useRequest";
import { Documento64 } from "@models/Documento";
import { useApiDocs } from "@api/docs";

export default function Payment() {
    const { actualizarCentro } = useApiCenter();
    const { uploadDocs, removeDocs } = useApiDocs();
    const center = useCenter((s) => s.data);
    const update = useCenter((s) => s.setData);
    const docs = useCenter((s) => s.docs);
    const setDocs = useCenter((s) => s.setDocs);
    const navigate = useNavigate();
    const input = useRef<HTMLInputElement>(null);
    let currentDoc = "";
    const [loading, setLoading] = useState({ show: false, message: "" });
    const [alert, setAlert] = useState({
        show: false,
        message: "",
        title: "",
    });
    const [preview, setPreview] = useState({
        show: false,
        id: "",
        mime_type: "",
        base64: "",
    });

    const showAlert = (title: string, message: string) => {
        setAlert({
            show: true,
            title,
            message,
        });
    };
    const updatePayment = (v: Partial<CenterPayment>) => {
        if (!center.payment_data) {
            update({
                payment_data: {
                    banco: v.banco ?? "",
                    name: v.name ?? "",
                    address: v.address ?? "",
                    rfc: v.rfc ?? "",
                    clabe: v.clabe ?? "",
                },
            });
            return;
        }
        update({
            payment_data: {
                ...center.payment_data,
                ...v,
            },
        });
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
    ): CenterDocument => {
        const getDoc = (k: string) => {
            const doc = res.find((d) => d.key == k);
            if (!doc) return;
            setDocs({
                [k]: {
                    mime_type: doc.mime_type,
                    key: doc.id,
                    base64: "",
                },
            });
            return { id: doc.id, mime_type: doc.mime_type };
        };
        return {
            banco: getDoc("banco"),
            rfc: getDoc("rfc"),
            ine: getDoc("ine"),
            contrato: getDoc("contrato"),
        };
    };
    const handleAction = async () => {
        if (!center._id) {
            navigate("/admin/center/social");
            return;
        }
        setLoading({
            show: true,
            message: "Actualizando datos de pago...",
        });
        try {
            await actualizarCentro(center._id, {
                payment_by_class: center.payment_by_class,
                available_from: center.available_from,
                payment_data: center.payment_data,
            });
            const upload = getToUpload();
            if (upload.length) {
                setLoading({
                    show: true,
                    message: "Subiendo documentos...",
                });
                const res = await uploadDocs(upload);
                await actualizarCentro(center._id, {
                    document_data: getDocData(res),
                });
                setDocs({
                    ine: {},
                    banco: {},
                    rfc: {},
                    contrato: {},
                });
            }
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
        return !center.payment_by_class;
    };
    const getDocState = (k: string) => {
        const doc = docs[k as keyof typeof docs];
        if (center.document_data) {
            const file = center.document_data[k as keyof typeof docs];
            if (file) {
                return "uploaded";
            }
        }
        if (!doc?.base64) {
            return "missing";
        }
        return "pending";
    };
    const selectFile = () => {
        if (!input.current) return;
        input.current.click();
    };
    const onSelectFile = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        const file = files[0];
        if (!file) return;
        if (!currentDoc) return;
        const doc = await readFileAsBase64(file);
        setDocs({
            [currentDoc]: {
                mime_type: doc.mime_type,
                key: doc.filename,
                base64: doc.base64,
            },
        });
        e.target.value = "";
        currentDoc = "";
    };
    const removeFile = async (key: string) => {
        if (getDocState(key) == "pending") {
            setDocs({
                [key]: {},
            });
            return;
        }
        if (!center.document_data || !center._id) return;
        const doc = center.document_data[key as keyof typeof docs];
        if (!doc) return;
        setLoading({
            show: true,
            message: "Eliminando archivo...",
        });
        try {
            await removeDocs([doc]);
            delete center.document_data[key as keyof typeof docs];
            await actualizarCentro(center._id, {
                document_data: {
                    ...center.document_data,
                },
            });
            update({
                document_data: {
                    ...center.document_data,
                },
            });
            setDocs({
                [key]: {},
            });
            showAlert(
                "Documento eliminado",
                "Se ha eliminado el documento en el servidor"
            );
        } catch (error) {
            const err = error as ApiError;
            showAlert(err.message, err.error as string);
        }
        setLoading({
            show: false,
            message: "",
        });
    };
    const showPreview = (key: string) => {
        if (center.document_data) {
            const uploaded = center.document_data[key as keyof typeof docs];
            if (uploaded) {
                setPreview({
                    show: true,
                    id: uploaded.id,
                    mime_type: uploaded.mime_type,
                    base64: "",
                });
                return;
            }
        }
        const doc = docs[key as keyof typeof docs];
        if (!doc) return;
        setPreview({
            show: true,
            id: doc.key ?? "",
            mime_type: doc.mime_type ?? "",
            base64: doc.base64 ?? "",
        });
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
                    <h1 className="title-large">Información de pago</h1>
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
                                value={center.available_from || 1}
                                label="Disponible desde"
                                onChange={(e) =>
                                    update({
                                        available_from: Number(e.target.value),
                                    })
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
                            value={center.payment_by_class ?? 0}
                            slotProps={{
                                htmlInput: { min: 0, max: 100000 },
                            }}
                            onChange={(e) =>
                                update({
                                    payment_by_class: Number(e.target.value),
                                })
                            }
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
                        value={center.payment_data?.name ?? ""}
                        onChange={(e) =>
                            updatePayment({ name: e.target.value })
                        }
                        sx={{ mt: 2 }}
                    />

                    <TextField
                        label="Domicilio de facturación"
                        fullWidth
                        value={center.payment_data?.address ?? ""}
                        onChange={(e) =>
                            updatePayment({ address: e.target.value })
                        }
                        sx={{ mt: 2 }}
                    />
                    <Stack direction={"row"} gap={2} mt={2}>
                        <Autocomplete
                            options={banks.sort()}
                            fullWidth
                            value={center.payment_data?.banco ?? null}
                            onChange={(_, v) =>
                                updatePayment({ banco: v ?? "" })
                            }
                            renderInput={(params) => (
                                <TextField {...params} label="Banco" />
                            )}
                        />
                        <TextField
                            label="RFC"
                            fullWidth
                            value={center.payment_data?.rfc ?? ""}
                            onChange={(e) =>
                                updatePayment({ rfc: e.target.value })
                            }
                        />
                    </Stack>
                    <TextField
                        label="Clabe interbancaria"
                        fullWidth
                        value={center.payment_data?.clabe ?? ""}
                        onChange={(e) =>
                            updatePayment({ clabe: e.target.value })
                        }
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
                        {Object.keys(docs).map((k) => (
                            <Stack
                                key={k}
                                direction={"row"}
                                gap={1}
                                alignItems={"center"}
                                bgcolor={(t) => t.palette.background.paper}
                                borderRadius={2}
                                px={2}
                                py={1}
                            >
                                {getDocState(k) == "uploaded" && (
                                    <CheckCircle color="success" />
                                )}
                                {getDocState(k) == "pending" && (
                                    <Pending color="info" />
                                )}
                                {getDocState(k) == "missing" && (
                                    <Cancel color="error" />
                                )}
                                <h3
                                    className="title-small"
                                    style={{ flexGrow: 1 }}
                                >
                                    {getDocName(k)}
                                </h3>
                                {getDocState(k) != "missing" && (
                                    <IconButton onClick={() => showPreview(k)}>
                                        <Visibility />
                                    </IconButton>
                                )}
                                {getDocState(k) == "missing" && (
                                    <IconButton
                                        onClick={() => {
                                            currentDoc = k;
                                            selectFile();
                                        }}
                                    >
                                        <FileUpload />
                                    </IconButton>
                                )}
                                {getDocState(k) != "missing" && (
                                    <IconButton onClick={() => removeFile(k)}>
                                        <Delete />
                                    </IconButton>
                                )}
                            </Stack>
                        ))}
                        <input
                            ref={input}
                            style={{ display: "none" }}
                            type="file"
                            accept=".pdf,.png,.jpeg"
                            onChange={onSelectFile}
                        />
                    </Stack>
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
                    {center._id ? "Actualizar información" : "Siguiente"}
                </Button>
            </Stack>

            <Loading {...loading} />
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
