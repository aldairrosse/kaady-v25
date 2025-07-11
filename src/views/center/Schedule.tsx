import Context from "@components/Context";
import {
    FacebookOutlined,
    Groups3Outlined,
    MiscellaneousServices,
    ScheduleOutlined,
} from "@mui/icons-material";
import { Box, Card, Icon, IconButton, Stack } from "@mui/material";
import { useContext } from "react";

const Schedule = function () {
    const { scheme } = useContext(Context);
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
                <Icon>
                    <ScheduleOutlined />
                </Icon>
                <h2 className="title-large">Horarios</h2>
            </Stack>
            <p className="body-medium opacity-80">Todos los días</p>
            <p className="body-medium opacity-80">10:00 am - 06:00 pm</p>

            <Stack direction={"row"} gap={2} mb={1} mt={4}>
                <Icon>
                    <Groups3Outlined />
                </Icon>
                <h2 className="title-large">Redes sociales</h2>
            </Stack>
            <Stack direction={"row"} gap={2}>
                <IconButton
                    sx={{
                        p: 1,
                        bgcolor: scheme.secondaryContainer,
                        color: scheme.onSecondaryContainer,
                    }}
                    onClick={() => {}}
                >
                    <FacebookOutlined />
                </IconButton>
            </Stack>

            <Stack direction={"row"} gap={2} mb={1} mt={4}>
                <Icon>
                    <MiscellaneousServices />
                </Icon>
                <h2 className="title-large">Servicios del centro</h2>
            </Stack>
            <Stack direction={"row"} gap={2} mt={2}>
                <Card variant="outlined" sx={{ px: 2, py: 2 }}>
                    <p className="body-medium">Estacionamiento</p>
                </Card>
                <Card variant="outlined" sx={{ px: 2, py: 2 }}>
                    <p className="body-medium">Baños</p>
                </Card>
                <Card variant="outlined" sx={{ px: 2, py: 2 }}>
                    <p className="body-medium">Regaderas</p>
                </Card>
                <Card variant="outlined" sx={{ px: 2, py: 2 }}>
                    <p className="body-medium">Wi-Fi</p>
                </Card>
            </Stack>
        </Box>
    );
};

export default Schedule;
