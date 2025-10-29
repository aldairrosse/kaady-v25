import { Box, Card, Stack } from "@mui/material";
import { useCenter } from "@hooks/useCenter";
import { ListAlt } from "@mui/icons-material";

export default function Activities() {
    const { data: center } = useCenter();

    return (
        <Box sx={{ pt: 4, pb: 6, px: 2 }}>
            <Stack gap={2} sx={{ px: 1 }}>
                {center.activities?.map((v) => (
                    <Card
                        elevation={0}
                        key={v}
                        sx={{
                            bgcolor: "Background",
                            py: 2,
                            px: 2,
                            border: "1px solid",
                            borderColor: (t) => t.palette.background.paper,
                        }}
                    >
                        <p className="title-large">
                            {v.charAt(0).toUpperCase() + v.slice(1)}
                        </p>
                    </Card>
                ))}
                {!center.activities?.length && (
                    <Stack alignItems={"center"} gap={2} paddingY={4}>
                        <ListAlt />
                        <p className="body-medium opacity-80">
                            No hay actividades registradas
                        </p>
                    </Stack>
                )}
            </Stack>
        </Box>
    );
}
