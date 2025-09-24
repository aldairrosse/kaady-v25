import { useApiCenter } from "@api/center";
import Context from "@components/Context";
import Loading from "@components/Loading";
import SimpleDialog from "@components/SimpleDialog";
import { useCenter } from "@hooks/useCenter";
import { ApiError } from "@hooks/useRequest";
import {
    ArrowBack,
    ArrowForward,
    Check,
    Map as MapIcon,
} from "@mui/icons-material";
import {
    AppBar,
    Autocomplete,
    Button,
    Card,
    Divider,
    IconButton,
    Stack,
    TextField,
    Toolbar,
} from "@mui/material";
import { AdvancedMarker, Map, useMap } from "@vis.gl/react-google-maps";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";

type Suggestion = {
    title: string;
    subtitle: string;
    description: string;
    place_id: string;
};

export default function Location() {
    let sessionToken: google.maps.places.AutocompleteSessionToken | undefined;
    const { actualizarCentro } = useApiCenter();
    const { theme } = useContext(Context);
    const center = useCenter((s) => s.data);
    const update = useCenter((s) => s.setData);
    const navigate = useNavigate();
    const [suggestions, setSuggestions] = useState<Suggestion[]>(
        center.location_data?.address
            ? [
                  {
                      description: center.location_data.address,
                      place_id: "",
                      title: center.location_data.address.split(", ")[0],
                      subtitle: center.location_data.address
                          .split(", ")
                          .slice(1)
                          .join(", "),
                  },
              ]
            : []
    );
    const [address, setAddress] = useState<Suggestion>({
        description: center.location_data?.address || "",
        place_id: "",
        title: center.location_data?.address.split(", ")[0] || "",
        subtitle: "",
    });
    const [position, setPosition] = useState<{ lat: number; lng: number }>({
        lat: center.location_data?.latitude || 19.4320166,
        lng: center.location_data?.longitude || -99.1342471,
    });
    const [loading, setLoading] = useState({ show: false, message: "" });
    const [alert, setAlert] = useState({
        show: false,
        message: "",
        title: "",
    });

    const map = useMap("location-map");
    const showAlert = (title: string, message: string) => {
        setAlert({
            show: true,
            title,
            message,
        });
    };
    const handleSearch = async (value: string) => {
        if (value.trim() == address.title) return;
        if (value.trim().length < 3) {
            setSuggestions([]);
            return;
        }
        if (!sessionToken) {
            sessionToken = new google.maps.places.AutocompleteSessionToken();
        }

        const response =
            await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
                {
                    input: value,
                    sessionToken,
                    language: "es",
                    region: "mx",
                    origin: {
                        lat: 19.4320166,
                        lng: -99.1342471,
                    },
                }
            );
        if (response?.suggestions?.length) {
            setSuggestions(
                response.suggestions.slice(0, 5).map((s) => ({
                    description: s.placePrediction?.text?.text ?? "",
                    title: s.placePrediction?.mainText?.text ?? "",
                    subtitle: s.placePrediction?.secondaryText?.text ?? "",
                    place_id: s.placePrediction?.placeId ?? "",
                }))
            );
        }
    };

    const handleUpdate = (
        results: google.maps.GeocoderResult[] | null,
        status: google.maps.GeocoderStatus
    ) => {
        if (status != "OK" || !results || !results[0].geometry?.location) {
            return;
        }

        sessionToken = undefined;
        const loc = results[0].geometry.location;
        const addr = results[0].formatted_address;
        const newPos = { lat: loc.lat(), lng: loc.lng() };
        setPosition(newPos);
        if (map) {
            map.panTo(newPos);
            map.setZoom(16);
        }
        update({
            location_data: {
                address: addr,
                latitude: newPos.lat,
                longitude: newPos.lng,
            },
        });
        setAddress({
            description: addr,
            place_id: "",
            title: addr.split(", ")[0],
            subtitle: "",
        });
        setSuggestions([
            {
                place_id: "",
                description: addr,
                title: addr.split(", ")[0],
                subtitle: addr.split(", ").slice(1).join(", "),
            },
        ]);
    };

    const handleSelect = (v: Suggestion | null) => {
        if (!v) return;
        setAddress(v);
        if (!v.place_id) return;
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ placeId: v.place_id }, handleUpdate);
    };

    const handleAction = async () => {
        if (!center._id) {
            navigate("/admin/center/payment");
            return;
        }
        setLoading({
            show: true,
            message: "Actualizando ubicación...",
        });
        try {
            await actualizarCentro(center._id, {
                location_data: center.location_data,
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

    const isInvalid = () => {
        return !center.location_data?.address;
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
                    <h1 className="title-large">Ubicación del centro</h1>
                </Toolbar>
            </AppBar>
            <Stack
                flexGrow={1}
                sx={{ overflowY: "auto", pt: 4, pb: 6, px: 4 }}
                alignItems={"center"}
            >
                <Stack maxWidth={"sm"} width={"100%"}>
                    <Stack alignItems={"center"} direction={"row"} gap={2}>
                        <MapIcon />
                        <h2 className="title-medium">Mapa y dirección</h2>
                    </Stack>
                    <Autocomplete
                        noOptionsText="Sin resultados"
                        options={suggestions}
                        fullWidth
                        filterOptions={(x) => x}
                        filterSelectedOptions
                        disableClearable
                        value={address}
                        onChange={(_, v) => handleSelect(v)}
                        sx={{ mt: 2 }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                autoComplete="off"
                                placeholder="Buscar dirección"
                            />
                        )}
                        onInputChange={(_, v) => {
                            handleSearch(v);
                        }}
                        getOptionLabel={(x) => x.title}
                        renderOption={(props, option) => {
                            const { key, ...p } = props;
                            return (
                                <li
                                    key={option.description}
                                    {...p}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "start",
                                        padding: "8px 16px",
                                    }}
                                >
                                    <p className="body-large">{option.title}</p>
                                    <span className="body-medium opacity-80">
                                        {option.subtitle}
                                    </span>
                                </li>
                            );
                        }}
                    />

                    <Card
                        sx={{
                            width: "100%",
                            height: 280,
                            mt: 2,
                            bgcolor: "Background",
                        }}
                        variant="outlined"
                    >
                        <Map
                            id="location-map"
                            style={{ width: "100%", height: "100%" }}
                            defaultCenter={position}
                            defaultZoom={16}
                            gestureHandling={"greedy"}
                            disableDefaultUI={true}
                            mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
                            mapTypeId={"roadmap"}
                            colorScheme={
                                theme.palette.mode == "dark" ? "DARK" : "LIGHT"
                            }
                            clickableIcons={false}
                            reuseMaps
                        >
                            <AdvancedMarker
                                position={position}
                                draggable={true}
                                onDragEnd={(e) => {
                                    const lat = e.latLng?.lat();
                                    const lng = e.latLng?.lng();
                                    if (!lat || !lng) return;

                                    setPosition({ lat, lng });
                                    const geocoder = new google.maps.Geocoder();
                                    geocoder.geocode(
                                        { location: { lat, lng } },
                                        handleUpdate
                                    );
                                }}
                            />
                        </Map>
                    </Card>
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
                    {center._id ? "Actualizar ubicación" : "Siguiente"}
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
