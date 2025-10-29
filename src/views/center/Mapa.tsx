import ChipList from "@components/ChipList";
import Context from "@components/Context";
import { FitnessCenter, LocationOn } from "@mui/icons-material";
import { Avatar, Box, Button, Card, Dialog, Icon, Stack } from "@mui/material";
import { useContext, useEffect, useState } from "react";

import { AdvancedMarker, Map, useMap } from "@vis.gl/react-google-maps";

import { useNavigate } from "react-router";
import { useApiCenter } from "@api/center";
import { Center } from "@models/Center";
import { useCenter } from "@hooks/useCenter";
import ImagePlaceholder from "@components/ImagePlaceholder";
import { getDocUrl } from "@utils/docs";

export default function Mapa() {
    const { listarCentros } = useApiCenter();
    const setCenter = useCenter((s) => s.setData);

    const navigate = useNavigate();
    const [zoom, setZoom] = useState(12);
    const [dialog, showDialog] = useState(false);
    const { scheme, theme } = useContext(Context);

    const [centers, setCenters] = useState<Center[]>([]);
    const [position, setPosition] = useState<{ lat: number; lng: number }>({
        lat: 19.4320166,
        lng: -99.1342471,
    });
    const [located, setLocated] = useState<{
        lat: number;
        lng: number;
        addr?: string;
    }>();
    const map = useMap("main-map");

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

    useEffect(() => {
        const load = async () => {
            try {
                const res = await listarCentros(
                    { limit: 100 },
                    {
                        lat: position?.lat,
                        lng: position?.lng,
                    }
                );
                setCenters(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        load();
    }, [position]);

    const handleUpdate = (
        results: google.maps.GeocoderResult[] | null,
        status: google.maps.GeocoderStatus
    ) => {
        if (status != "OK" || !results || !results[0].geometry?.location) {
            return;
        }
        const loc = results[0].geometry.location;
        const addr = results[0].formatted_address;
        const newPos = { lat: loc.lat(), lng: loc.lng() };
        setLocated({
            ...newPos,
            addr,
        });
    };

    const requestLocation = () => {
        showDialog(false);
        navigator.geolocation.getCurrentPosition(
            (p) => {
                const pos = {
                    lat: p.coords.latitude,
                    lng: p.coords.longitude,
                };
                setLocated(pos);
                setPosition(pos);
                map?.panTo(pos);
                map?.setZoom(16);

                const geocoder = new google.maps.Geocoder();
                geocoder.geocode({ location: pos }, handleUpdate);
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
                    defaultCenter={position}
                    defaultZoom={12}
                    gestureHandling={"greedy"}
                    disableDefaultUI={true}
                    mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
                    mapTypeId={"roadmap"}
                    colorScheme={
                        theme.palette.mode == "dark" ? "DARK" : "LIGHT"
                    }
                    clickableIcons={false}
                    reuseMaps
                    onZoomChanged={(e) => setZoom(e.detail.zoom)}
                    onCenterChanged={(e) => setPosition(e.detail.center)}
                    tiltInteractionEnabled={false}
                    headingInteractionEnabled={false}
                >
                    {centers
                        .filter((c) => !!c.location_data)
                        .map((item, i) => (
                            <AdvancedMarker
                                key={i}
                                title={item.name}
                                position={{
                                    lat: item.location_data?.latitude || 0,
                                    lng: item.location_data?.longitude || 0,
                                }}
                                onClick={() => {
                                    setCenter(item);
                                    navigate(`/user/center/${item._id}`);
                                }}
                            >
                                <Avatar
                                    sx={{
                                        color: scheme.onPrimary,
                                        bgcolor: scheme.primary,
                                        border:
                                            "2px solid " +
                                            scheme.outlineVariant,
                                    }}
                                >
                                    {item.image?.id ? (
                                        <ImagePlaceholder
                                            width={"100%"}
                                            height={"100%"}
                                            fit="cover"
                                            src={getDocUrl(item.image, {
                                                width: 100,
                                                height: 100,
                                            })}
                                            disableBorder
                                        />
                                    ) : (
                                        <Icon>
                                            <FitnessCenter />
                                        </Icon>
                                    )}
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
                                            {item.name}
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
                            {located?.addr ||
                                "Debes aceptar los permisos para ver los centros más cercanos a tu ubicación"}
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
