import ChipList from "@components/ChipList";
import Context from "@components/Context";
import { FitnessCenter, LocationOn } from "@mui/icons-material";
import { Avatar, Box, Button, Card, Icon, Stack } from "@mui/material";
import { useContext, useState } from "react";

import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";

import centers from "@config/kaady-centers.json";
import { useNavigate } from "react-router";

export default function Mapa() {
    const { scheme, theme } = useContext(Context);
    const [zoom, setZoom] = useState(12);
    const navigate = useNavigate();

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
                <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
                    <Map
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
                        onZoomChanged={(e) => setZoom(e.map.getZoom() || 0)}
                        onIdle={(e) => setZoom(e.map.getZoom() || 0)}
                    >
                        {centers.map((item, i) => (
                            <AdvancedMarker
                                key={i}
                                title={item.nombre}
                                position={{ lat: item.lat, lng: item.lng }}
                                onClick={() => navigate(`/center/${i}`)}
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
                                    <Icon>
                                        <FitnessCenter />
                                    </Icon>
                                </Avatar>
                                {zoom >= 16 && (
                                    <Card
                                        sx={{
                                            position: "absolute",
                                            px: "8px",
                                            py: "4px",
                                            bgcolor: scheme.surfaceVariant,
                                            color: scheme.onSurfaceVariant,
                                            transform:
                                                "translate(calc(-50% + 22px), 8px)",
                                        }}
                                        elevation={2}
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
                    </Map>
                </APIProvider>
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
                    }}
                >
                    <LocationOn />
                </Button>
            </Stack>
        </Box>
    );
}
