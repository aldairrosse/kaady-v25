import Context from "@components/Context";
import {
    InstagramIcon,
    TiktokIcon,
    TwitterIcon,
    YoutubeIcon,
} from "@components/Icons";
import { useCenter } from "@hooks/useCenter";
import {
    FacebookOutlined,
    MiscellaneousServices,
    Public,
    ScheduleOutlined,
} from "@mui/icons-material";
import { Box, Card, IconButton, Stack } from "@mui/material";
import { useContext } from "react";

const Schedule = function () {
    const { scheme } = useContext(Context);
    const center = useCenter((s) => s.data);
    const sx = {
        p: 1,
        bgcolor: scheme.secondaryContainer,
        color: scheme.onSecondaryContainer,
    };
    const handleTo = (v?: string) => {
        if (!v) return;
        if (!v.startsWith("http")) return;
        window.open(v, "_blank");
    };
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                overflowY: "auto",
                pt: 4,
                pb: 6,
                px: 2,
            }}
        >
            <Stack direction={"row"} gap={2} mb={1}>
                <ScheduleOutlined />
                <h2 className="title-large">Horarios</h2>
            </Stack>
            <p className="body-medium opacity-80">Todos los días</p>

            {center.social_data && (
                <Stack direction={"row"} gap={2} mb={1} mt={4}>
                    <Public />
                    <h2 className="title-large">Redes sociales</h2>
                </Stack>
            )}
            <Stack direction={"row"} gap={2}>
                {center.social_data?.facebook && (
                    <IconButton
                        sx={sx}
                        onClick={() => handleTo(center.social_data?.facebook)}
                    >
                        <FacebookOutlined />
                    </IconButton>
                )}
                {center.social_data?.twitter && (
                    <IconButton
                        sx={sx}
                        onClick={() => handleTo(center.social_data?.twitter)}
                    >
                        <TwitterIcon />
                    </IconButton>
                )}
                {center.social_data?.instagram && (
                    <IconButton
                        sx={sx}
                        onClick={() => handleTo(center.social_data?.instagram)}
                    >
                        <InstagramIcon />
                    </IconButton>
                )}
                {center.social_data?.tiktok && (
                    <IconButton
                        sx={sx}
                        onClick={() => handleTo(center.social_data?.tiktok)}
                    >
                        <TiktokIcon />
                    </IconButton>
                )}
                {center.social_data?.youtube && (
                    <IconButton
                        sx={sx}
                        onClick={() => handleTo(center.social_data?.youtube)}
                    >
                        <YoutubeIcon />
                    </IconButton>
                )}
            </Stack>

            <Stack direction={"row"} gap={2} mb={1} mt={4}>
                <MiscellaneousServices />
                <h2 className="title-large">Servicios del centro</h2>
            </Stack>
            <Stack direction={"row"} gap={2} mt={2} flexWrap={"wrap"}>
                {center.services?.map((i) => (
                    <Card variant="outlined" key={i} sx={{ px: 2, py: 2 }}>
                        <p className="body-medium">{i}</p>
                    </Card>
                ))}
                {!center.services?.length && (
                    <p className="body-medium opacity-80">
                        No hay servicios disponibles
                    </p>
                )}
            </Stack>
        </Box>
    );
};

export default Schedule;
