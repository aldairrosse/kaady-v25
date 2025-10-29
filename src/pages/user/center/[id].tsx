import Root from "@components/Root";
import { useNavigate, useParams } from "react-router";

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
import { ArrowBack, FitnessCenter, Image } from "@mui/icons-material";
import Schedule from "@views/center/Schedule";
import Location from "@views/center/Location";
import Activities from "@views/center/Activities";
import { useCenter } from "@hooks/useCenter";
import ImagePlaceholder from "@components/ImagePlaceholder";
import { getDocUrl } from "@utils/docs";
import FilePreview from "@components/FilePreview";
import { Documento } from "@models/Documento";

export default function Id() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tab, setTab] = useState(0);
    const center = useCenter((s) => s.data);
    const [preview, setPreview] = useState({
        show: false,
        id: "",
        mime_type: "",
    });

    if (!id) {
        return (
            <Root sx={{ px: 3, pt: 2, pb: 6 }}>
                <IconButton onClick={() => navigate(-1)} sx={{ mb: 3 }}>
                    <ArrowBack />
                </IconButton>
                <h1 className="title-large">Centro no encontrado</h1>
            </Root>
        );
    }
    if (!center || center._id != id) {
        return (
            <Root sx={{ px: 3, pt: 2, pb: 6 }}>
                <IconButton onClick={() => navigate(-1)} sx={{ mb: 3 }}>
                    <ArrowBack />
                </IconButton>
                <h1 className="title-large">Centro no encontrado</h1>
            </Root>
        );
    }

    const showPreview = (d?: Documento) => {
        if (!d) return;
        setPreview({
            show: true,
            id: d.id,
            mime_type: d.mime_type,
        });
    };

    return (
        <Root sx={{ pt: 2, pb: 6, px: 0, paddingX: 0 }}>
            <IconButton
                onClick={() => navigate(-1)}
                sx={{ mb: 3, ml: 2 }}
                title="Atrás"
            >
                <ArrowBack />
            </IconButton>
            <Stack direction={"row"} alignItems="center" gap={2} mx={3}>
                <Avatar
                    sx={{
                        bgcolor: (t) =>
                            center.image?.id ? "unset" : t.palette.primary.main,
                        height: 56,
                        width: 56,
                    }}
                >
                    {center.image?.id ? (
                        <ImagePlaceholder
                            width={"100%"}
                            height={"100%"}
                            fit="cover"
                            src={getDocUrl(center.image, {
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
                <h1 className="headline-medium">{center.name}</h1>
            </Stack>
            <p className="body-large opacity-80" style={{ padding: 24 }}>
                {center.description}
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
                    {center.resources?.map((i) => (
                        <Grid
                            key={i.id}
                            size={{
                                xs: 6,
                                sm: 4,
                            }}
                        >
                            <ImagePlaceholder
                                width={"100%"}
                                height={200}
                                enableZoom
                                onZoom={() => showPreview(i)}
                                src={getDocUrl(i, {
                                    width: 100,
                                    height: 100,
                                })}
                            />
                        </Grid>
                    ))}
                    {!center.resources?.length && (
                        <Grid size={{ xs: 12 }}>
                            <Stack alignItems={"center"} gap={2} paddingY={4}>
                                <Image />
                                <p className="body-medium opacity-80">
                                    No hay imagenes disponibles
                                </p>
                            </Stack>
                        </Grid>
                    )}
                </Grid>
            )}

            <FilePreview
                {...preview}
                onClose={() => setPreview((prev) => ({ ...prev, show: false }))}
            />
        </Root>
    );
}
