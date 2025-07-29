import ChipList from "@components/ChipList";
import Context from "@components/Context";
import { FitnessCenter, LocationOn } from "@mui/icons-material";
import { Avatar, Box, Button, Card, Dialog, Icon, Stack } from "@mui/material";
import { useCallback, useContext, useState } from "react";

import {
    AdvancedMarker,
    Map,
    MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";

import centers from "@config/kaady-centers.json";
import { useNavigate } from "react-router";

export default function Mapa() {
    const navigate = useNavigate();
    const [zoom, setZoom] = useState(12);
    const [dialog, showDialog] = useState(false);
    const { scheme, theme } = useContext(Context);
    const [center, setCenter] = useState({ lat: 19.4320166, lng: -99.1342471 });
    const [located, setLocated] = useState<{ lat: number; lng: number }>();

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
    ];

    const handleCamera = useCallback((e: MapCameraChangedEvent) => {
        setCenter(e.detail.center);
        setZoom(e.detail.zoom);
    }, []);

    const requestLocation = () => {
        showDialog(false);
        navigator.geolocation.getCurrentPosition(
            (p) => {
                const pos = {
                    lat: p.coords.latitude,
                    lng: p.coords.longitude,
                };
                setCenter(pos);
                setZoom(18);
                setLocated(pos);
            },
            (e) => {
                console.error(e.message);
                setLocated(undefined);
            }
        );
    };

    return (
        <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
            <div
                style={{
                    position: "absolute",
                    background: "gray",
                    width: "100%",
                    height: "100%",
                    zIndex: 0,
                }}
            >
                <Map
                    id="main-map"
                    style={{ width: "100%", height: "100%" }}
                    defaultCenter={{ lat: 19.4320166, lng: -99.1342471 }}
                    defaultZoom={12}
                    gestureHandling={"greedy"}
                    disableDefaultUI={true}
                    mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
                    mapTypeId={"roadmap"}
                    colorScheme={
                        theme.palette.mode == "dark" ? "DARK" : "LIGHT"
                    }
                    center={center}
                    zoom={zoom}
                    clickableIcons={false}
                    reuseMaps
                    onCameraChanged={handleCamera}
                >
                    {centers.map((item, i) => (
                        <AdvancedMarker
                            key={i}
                            title={item.nombre}
                            position={item}
                            onClick={() => navigate(`/user/center/${i}`)}
                        >
                            <Avatar
                                sx={{
                                    color: scheme.onPrimary,
                                    bgcolor: scheme.primary,
                                    border:
                                        "2px solid " + scheme.outlineVariant,
                                }}
                            >
                                <Icon>
                                    <FitnessCenter />
                                </Icon>
                            </Avatar>
                            {zoom >= 14 && (
                                <Card
                                    sx={{
                                        position: "absolute",
                                        px: "8px",
                                        py: "4px",
                                        bgcolor: scheme.surfaceVariant,
                                        color: scheme.onSurfaceVariant,
                                        pointerEvents: "none",
                                        transform:
                                            "translate(calc(-50% + 22px), 8px)",
                                    }}
                                    elevation={3}
                                >
                                    <p
                                        className="title-small"
                                        style={{
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            maxWidth: "120px",
                                            display: "inline-block",
                                            marginBottom: "-3px",
                                        }}
                                    >
                                        {item.nombre}
                                    </p>
                                </Card>
                            )}
                        </AdvancedMarker>
                    ))}
                    <AdvancedMarker
                        title="Mi ubicación"
                        position={located}
                        onClick={requestLocation}
                    >
                        <Avatar
                            sx={{
                                width: 32,
                                height: 32,
                                bgcolor: theme.palette.info.main,
                                border: "2px solid " + scheme.outlineVariant,
                                display: "flex",
                                alignContent: "center",
                                justifyContent: "center",
                            }}
                        />
                    </AdvancedMarker>
                </Map>
            </div>

            <Stack
                zIndex={1}
                position={"absolute"}
                width={"100%"}
                overflow={"hidden"}
            >
                <ChipList
                    sx={{ px: 2, pt: 2, pb: 2 }}
                    chips={activities}
                    bgcolor={scheme.surfaceContainer}
                    color="inherit"
                />
            </Stack>

            <Stack
                sx={{
                    position: "absolute",
                    bottom: 0,
                    px: 2,
                    pb: 4,
                    zIndex: 1,
                    width: "100%",
                    pointerEvents: "none",
                }}
                alignItems={"end"}
            >
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                        width: 48,
                        height: 48,
                        minWidth: 48,
                        borderRadius: 3,
                        pointerEvents: "auto",
                    }}
                    onClick={() => showDialog(true)}
                >
                    <LocationOn />
                </Button>
            </Stack>

            <Dialog
                open={dialog}
                onClose={() => showDialog(false)}
                fullWidth
                maxWidth="xs"
            >
                <Card
                    sx={{
                        px: 3,
                        py: 4,
                    }}
                >
                    <Stack direction={"row"} gap={2}>
                        <Icon>
                            <LocationOn />
                        </Icon>
                        <h2 className="title-large">Cerca de mí</h2>
                    </Stack>
                    <Stack my={2}>
                        <p className="body-large opacity-80">
                            Debes aceptar los permisos para ver los centros más
                            cercanos a tu ubicación, consulta ahora.
                        </p>
                    </Stack>
                    <Stack pt={1}>
                        <Button onClick={requestLocation}>
                            Ir a mi ubicación
                        </Button>
                    </Stack>
                </Card>
            </Dialog>
        </Box>
    );
}
