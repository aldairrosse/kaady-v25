import Root from "@components/Root";
import { useNavigate, useParams } from "react-router";

import centers from "@config/kaady-centers.json";
import {
    Avatar,
    Box,
    Grid,
    Icon,
    IconButton,
    Stack,
    Tab,
    Tabs,
} from "@mui/material";
import { useState } from "react";
import { ArrowBack, FitnessCenter, ImageOutlined } from "@mui/icons-material";
import Schedule from "@views/center/Schedule";
import Location from "@views/center/Location";
import Activities from "@views/center/Activities";

export default function Id() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tab, setTab] = useState(0);
    if (id === undefined || isNaN(Number(id))) {
        return (
            <Root sx={{ px: 3, pt: 2, pb: 6 }}>
                <IconButton onClick={() => navigate(-1)} sx={{ mb: 3 }}>
                    <ArrowBack />
                </IconButton>
                <h1 className="title-large">Centro no encontrado</h1>
            </Root>
        );
    }

    const center = centers[Number(id)];
    if (!center) {
        return (
            <Root sx={{ px: 3, pt: 2, pb: 6 }}>
                <IconButton onClick={() => navigate(-1)} sx={{ mb: 3 }}>
                    <ArrowBack />
                </IconButton>
                <h1 className="title-large">Centro no encontrado</h1>
            </Root>
        );
    }

    return (
        <Root sx={{ pt: 2, pb: 6, px: 0, paddingX: 0, overflowY: 'auto' }}>
            <IconButton onClick={() => navigate(-1)} sx={{ mb: 3, ml: 2 }}>
                <ArrowBack />
            </IconButton>
            <Stack direction={"row"} alignItems="center" gap={2} mx={3}>
                <Avatar sx={{ bgcolor: (t) => t.palette.primary.main }}>
                    <Icon>
                        <FitnessCenter />
                    </Icon>
                </Avatar>
                <h1 className="headline-medium">{center.nombre}</h1>
            </Stack>
            <p className="body-large opacity-80" style={{ padding: 24 }}>
                Suspendisse sodales dolor justo, sit amet ornare eros convallis
                ultricies. Phasellus luctus nisi rutrum, posuere justo ut,
                feugiat mauris. Quisque porttitor sapien enim, a hendrerit augue
                tincidunt sit amet. Pellentesque imperdiet nunc eget lacinia
                bibendum.
            </p>

            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    maxWidth: "100%",
                }}
            >
                <Tabs
                    value={tab}
                    onChange={(_e, v) => setTab(v)}
                    sx={{ width: "100%" }}
                    variant="scrollable"
                    scrollButtons={"auto"}
                    allowScrollButtonsMobile
                >
                    <Tab label="Información" value={0} />
                    <Tab label="Actividades" value={1} />
                    <Tab label="Ubicación" value={2} />
                    <Tab label="Imagenes" value={3} />
                </Tabs>
            </Box>

            {tab === 0 && <Schedule />}
            {tab === 1 && <Activities />}
            {tab === 2 && <Location />}
            {tab === 3 && (
                <Grid container spacing={1} sx={{ p: 2 }}>
                    {Array.from({ length: 5 }, (_, i) => i).map((i) => (
                        <Grid
                            key={i}
                            size={{
                                xs: 6,
                                sm: 4,
                            }}
                        >
                            <Box
                                sx={{
                                    bgcolor: "Background",
                                    width: "100%",
                                    height: "100%",
                                    minHeight: "200px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Icon className="opacity-60">
                                    <ImageOutlined />
                                </Icon>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Root>
    );
}
