import { Email, Lock } from "@mui/icons-material";
import { Box, Icon, TextField } from "@mui/material";
import { forwardRef } from "react";

const AccountForm = forwardRef((_, ref) => {
    return (
        <Box ref={ref}>
            <h2 className="title-medium">
                <Icon sx={{ mr: 1, mb: "-2px" }}>
                    <Email />
                </Icon>
                Correo electrónico
            </h2>
            <p className="body-large opacity-70" style={{ marginTop: 4 }}>
                Con este correo se crea tu cuenta, además podrás recibir
                notificaciones o alertas.
            </p>
            <TextField label="Correo" sx={{ mt: 2 }} fullWidth type="email" />

            <h2 className="title-medium" style={{ marginTop: 32 }}>
                <Icon sx={{ mr: 1, mb: "-2px" }}>
                    <Lock />
                </Icon>
                Contraseña
            </h2>
            <p className="body-large opacity-70" style={{ marginTop: 4 }}>
                Elige una contraseña segura, con mayúsculas, minúsculas, números
                y símbolos.
            </p>
            <TextField
                label="Contraseña"
                sx={{ mt: 2 }}
                fullWidth
                type="password"
            />
        </Box>
    );
});

export default AccountForm;
