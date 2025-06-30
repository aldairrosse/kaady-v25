import Root from "@components/Root";
import { useNavigate, useParams } from "react-router";

import centers from "@config/kaady-centers.json";
import { Avatar, Icon, IconButton, Stack, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { ArrowBack, FitnessCenter } from "@mui/icons-material";

export default function () {
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
        <Root sx={{ px: 3, pt: 2, pb: 6 }}>
            <IconButton onClick={() => navigate(-1)} sx={{ mb: 3 }}>
                <ArrowBack />
            </IconButton>
            <Stack direction={"row"} alignItems="center" gap={2}>
                <Avatar>
                    <Icon>
                        <FitnessCenter />
                    </Icon>
                </Avatar>
                <h1 className="title-large">{center.nombre}</h1>
            </Stack>
            <p className="body-large" style={{ marginTop: 16 }}>
                Detalles del centro aquí
            </p>

            <Tabs value={tab} onChange={(_e, v) => setTab(v)} sx={{ mt: 4 }}>
                <Tab label="Información" value={0} />
                <Tab label="Actividades" value={1} />
                <Tab label="Ubicación" value={2} />
                <Tab label="Imagenes" value={3} />
            </Tabs>

            {tab === 0 && (
                <p className="body-medium" style={{ marginTop: 16 }}>
                    Información de horarios
                </p>
            )}
            {tab === 1 && (
                <p className="body-medium" style={{ marginTop: 16 }}>
                    Actividades disponibles
                </p>
            )}
            {tab === 2 && (
                <p className="body-medium" style={{ marginTop: 16 }}>
                    Ubicación del centro
                </p>
            )}
            {tab === 3 && (
                <p className="body-medium" style={{ marginTop: 16 }}>
                    Cargando imagenes
                </p>
            )}
        </Root>
    );
}
