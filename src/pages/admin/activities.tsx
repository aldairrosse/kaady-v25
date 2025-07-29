import { Box } from "@mui/material";

export default function Activities() {
    return (
        <Box
            width={"100%"}
            height={"100%"}
            sx={{
                p: 4,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <h1 className="title-large">Actividades disponibles</h1>
            <p className="body-large opacity-80" style={{ marginTop: 8 }}>
                Actualiza la lista de actividades para identificar centros y
                tipos de clases.
            </p>
        </Box>
    );
}
