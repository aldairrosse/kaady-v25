import Context from "@components/Context";
import { ArrowBack, Map as MapIcon, SaveAlt } from "@mui/icons-material";
import {
    AppBar,
    Button,
    Card,
    Divider,
    IconButton,
    Stack,
    TextField,
    Toolbar,
} from "@mui/material";
import { Map } from "@vis.gl/react-google-maps";
import { useContext } from "react";
import { useNavigate } from "react-router";

export default function Location() {
    const navigate = useNavigate();
    const { theme } = useContext(Context);
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
                    <h1 className="title-large">Ubicación</h1>
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
                        <h2 className="title-medium">Ubicación en el mapa</h2>
                    </Stack>
                    <TextField label="Dirección" sx={{ mt: 2 }} />
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
                            defaultCenter={{
                                lat: 19.4320166,
                                lng: -99.1342471,
                            }}
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
                        ></Map>
                    </Card>
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
