import { useApiCenter } from "@api/center";
import {
    InstagramIcon,
    TiktokIcon,
    TwitterIcon,
    YoutubeIcon,
} from "@components/Icons";
import Loading from "@components/Loading";
import SimpleDialog from "@components/SimpleDialog";
import { useCenter } from "@hooks/useCenter";
import { ApiError } from "@hooks/useRequest";
import { CenterSocial } from "@models/Center";
import {
    ArrowBack,
    ArrowForward,
    Check,
    FacebookRounded,
    Public,
} from "@mui/icons-material";
import {
    AppBar,
    Button,
    Divider,
    IconButton,
    Stack,
    TextField,
    Toolbar,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Nuevo() {
    const { actualizarCentro } = useApiCenter();
    const navigate = useNavigate();
    const center = useCenter((s) => s.data);
    const update = useCenter((s) => s.setData);
    const [loading, setLoading] = useState({ show: false, message: "" });
    const [alert, setAlert] = useState({
        show: false,
        message: "",
        title: "",
    });

    const updateSocial = (v: Partial<CenterSocial>) => {
        if (!center.social_data) {
            update({ social_data: v });
            return;
        }
        update({ social_data: { ...center.social_data, ...v } });
    };

    const handleTo = (v?: string) => {
        if (!v) return;
        if (!v.startsWith("http")) return;
        window.open(v, "_blank");
    };

    const showAlert = (title: string, message: string) => {
        setAlert({
            show: true,
            title,
            message,
        });
    };

    const handleAction = async () => {
        if (!center._id) {
            navigate("/admin/center/register");
            return;
        }
        setLoading({
            show: true,
            message: "Actualizando redes sociales...",
        });

        try {
            await actualizarCentro(center._id, {
                social_data: center.social_data,
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
                    <h1 className="title-large">Redes sociales</h1>
                </Toolbar>
            </AppBar>
            <Stack
                flexGrow={1}
                sx={{ overflowY: "auto", pt: 4, pb: 6, px: 4 }}
                alignItems={"center"}
            >
                <Stack maxWidth={"sm"} width={"100%"}>
                    <Stack alignItems={"center"} direction={"row"} gap={2}>
                        <Public />
                        <h2 className="title-medium">Enlaces de redes</h2>
                    </Stack>
                    <Stack
                        direction={"row"}
                        gap={2}
                        alignItems={"center"}
                        mt={2}
                    >
                        <TextField
                            label="Facebook"
                            fullWidth
                            value={center.social_data?.facebook ?? ""}
                            onChange={(e) =>
                                updateSocial({ facebook: e.target.value })
                            }
                        />
                        <IconButton
                            color="primary"
                            onClick={() =>
                                handleTo(center.social_data?.facebook)
                            }
                        >
                            <FacebookRounded />
                        </IconButton>
                    </Stack>
                    <Stack
                        direction={"row"}
                        gap={2}
                        alignItems={"center"}
                        mt={2}
                    >
                        <TextField
                            label="Twitter (X)"
                            fullWidth
                            value={center.social_data?.twitter ?? ""}
                            onChange={(e) =>
                                updateSocial({ twitter: e.target.value })
                            }
                        />
                        <IconButton
                            color="primary"
                            onClick={() =>
                                handleTo(center.social_data?.twitter)
                            }
                        >
                            <TwitterIcon />
                        </IconButton>
                    </Stack>
                    <Stack
                        direction={"row"}
                        gap={2}
                        alignItems={"center"}
                        mt={2}
                    >
                        <TextField
                            label="Instagram"
                            fullWidth
                            value={center.social_data?.instagram ?? ""}
                            onChange={(e) =>
                                updateSocial({ instagram: e.target.value })
                            }
                        />
                        <IconButton
                            color="primary"
                            onClick={() =>
                                handleTo(center.social_data?.instagram)
                            }
                        >
                            <InstagramIcon />
                        </IconButton>
                    </Stack>
                    <Stack
                        direction={"row"}
                        gap={2}
                        alignItems={"center"}
                        mt={2}
                    >
                        <TextField
                            label="Tiktok"
                            fullWidth
                            value={center.social_data?.tiktok ?? ""}
                            onChange={(e) =>
                                updateSocial({ tiktok: e.target.value })
                            }
                        />
                        <IconButton
                            color="primary"
                            onClick={() => handleTo(center.social_data?.tiktok)}
                        >
                            <TiktokIcon />
                        </IconButton>
                    </Stack>
                    <Stack
                        direction={"row"}
                        gap={2}
                        alignItems={"center"}
                        mt={2}
                    >
                        <TextField
                            label="Youtube"
                            fullWidth
                            value={center.social_data?.youtube ?? ""}
                            onChange={(e) =>
                                updateSocial({ youtube: e.target.value })
                            }
                        />
                        <IconButton
                            color="primary"
                            onClick={() =>
                                handleTo(center.social_data?.youtube)
                            }
                        >
                            <YoutubeIcon />
                        </IconButton>
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
                >
                    {center._id ? "Actualizar redes" : "Revisar registro"}
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
