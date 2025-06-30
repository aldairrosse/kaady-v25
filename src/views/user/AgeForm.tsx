import { Cake, Wc } from "@mui/icons-material";
import {
    Box,
    FormControlLabel,
    Icon,
    Radio,
    RadioGroup,
    TextField,
} from "@mui/material";
import { forwardRef, useState } from "react";

export default forwardRef(function (_, ref) {
    const [sex, setSex] = useState(0);
    return (
        <Box ref={ref}>
            <h2 className="title-medium">
                <Icon sx={{ mr: 1, mb: "-2px" }}>
                    <Cake />
                </Icon>
                Fecha de nacimiento
            </h2>
            <p className="body-large opacity-70" style={{ marginTop: 4 }}>
                Debes ser mayor de edad para acceder a los centros deportivos.
                Si tienes niños, revisa la sección para Kids.
            </p>
            <TextField
                slotProps={{ inputLabel: { shrink: true } }}
                label="Día"
                sx={{ mt: 2 }}
                fullWidth
                type="date"
            />

            <h2 className="title-medium" style={{ marginTop: 32 }}>
                <Icon sx={{ mr: 1, mb: "-2px" }}>
                    <Wc />
                </Icon>
                Sexo
            </h2>
            <p className="body-large opacity-70" style={{ marginTop: 4 }}>
                Puedes recibir funciones y rutinas especializadas según tu sexo.
            </p>

            <RadioGroup value={sex} onChange={(_e, v) => setSex(Number(v))}>
                <FormControlLabel value={0} control={<Radio />} label="Mujer" />
                <FormControlLabel
                    value={1}
                    control={<Radio />}
                    label="Hombre"
                />
                <FormControlLabel
                    value={2}
                    control={<Radio />}
                    label="Ocultarlo"
                />
            </RadioGroup>
        </Box>
    );
});
