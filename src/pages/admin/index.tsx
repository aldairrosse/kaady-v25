import { useApiAdmin } from "@api/admin";
import Context from "@components/Context";
import { Resumen as ResumenType } from "@models/Admin";
import { Box, Card, Stack } from "@mui/material";
import { useContext, useEffect, useState } from "react";

export default function Resumen() {
    const { scheme } = useContext(Context);
    const { verResumen } = useApiAdmin();
    const [data, setData] = useState<ResumenType>();
    useEffect(() => {
        const load = async () => {
            try {
                const res = await verResumen();
                setData(res);
            } catch (error) {
                console.error(error);
            }
        };
        load();
    }, []);
    return (
        <Box width={"100%"} height={"100%"} sx={{ p: 4 }}>
            <Stack>
                <h1 className="title-large">Resumen 2025</h1>
            </Stack>
            <Stack direction={"row"} flexWrap={"wrap"} gap={4} mt={4}>
                <Card
                    elevation={0}
                    sx={{
                        bgcolor: scheme.surfaceContainerHigh,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        py: 2,
                        px: 4,
                    }}
                >
                    <p className="title-large">{data?.users ?? 0}</p>
                    <h2 className="body-medium opacity-80">Usuarios</h2>
                </Card>
                <Card
                    elevation={0}
                    sx={{
                        bgcolor: scheme.surfaceContainerHigh,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        py: 2,
                        px: 4,
                    }}
                >
                    <p className="title-large">{data?.centers ?? 0}</p>
                    <h2 className="body-medium opacity-80">Centros</h2>
                </Card>
                <Card
                    elevation={0}
                    sx={{
                        bgcolor: scheme.surfaceContainerHigh,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        py: 2,
                        px: 4,
                    }}
                >
                    <p className="title-large">{data?.stores ?? 0}</p>
                    <h2 className="body-medium opacity-80">Tiendas</h2>
                </Card>
                <Card
                    elevation={0}
                    sx={{
                        bgcolor: scheme.surfaceContainerHigh,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        py: 2,
                        px: 4,
                    }}
                >
                    <p className="title-large">{data?.memberships ?? 0}</p>
                    <h2 className="body-medium opacity-80">Membresías</h2>
                </Card>
            </Stack>
        </Box>
    );
}
