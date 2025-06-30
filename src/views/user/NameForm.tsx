import { Badge } from "@mui/icons-material";
import { Box, Icon, Stack, TextField } from "@mui/material";
import { forwardRef } from "react";

export default forwardRef(function (_, ref) {
    return (
        <Box ref={ref}>
            <h2 className="title-medium">
                <Icon sx={{ mr: 1, mb: "-2px" }}>
                    <Badge />
                </Icon>
                Nombre completo
            </h2>
            <p className="body-large opacity-70" style={{ marginTop: 4 }}>
                Tu nombre se usa para tu credencial de acceso a centros
                deportivos. Es posible que tengas que validar tu información
                mediante alguna identificación oficial.
            </p>

            <TextField label="Nombre(s)" sx={{ mt: 2 }} fullWidth />
            <Stack direction="row" sx={{ mt: 2 }} gap={2}>
                <TextField fullWidth label="Apellido paterno" />
                <TextField fullWidth label="Apellido materno" />
            </Stack>
        </Box>
    );
});
