import { Box, Card, Stack } from "@mui/material";
import { useParams } from "react-router";
import centers from "@config/kaady-centers.json";

export default function Activities() {
    const { id } = useParams();

    const center = centers[Number(id)];

    return (
        <Box sx={{ pt: 4, pb: 6, px: 2 }}>
            <Stack gap={2} sx={{ px: 1 }}>
                {center.actividades.map((v) => (
                    <Card
                        elevation={0}
                        key={v}
                        sx={{ bgcolor: "Background", py: 2, px: 2 }}
                    >
                        <p className="title-large">
                            {v.charAt(0).toUpperCase() + v.slice(1)}
                        </p>
                    </Card>
                ))}
            </Stack>
        </Box>
    );
}
