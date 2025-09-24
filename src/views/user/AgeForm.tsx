import { useRegister } from "@hooks/useRegister";
import { Cake, Wc } from "@mui/icons-material";
import {
    Box,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField,
} from "@mui/material";
import { getDateInput, parseDateInput } from "@utils/format";
import { forwardRef, useEffect, useMemo, useState } from "react";
type Genre = "M" | "H" | "D";

const AgeForm = forwardRef(function (_, ref) {
    const setAge = useRegister((state) => state.setAge);
    const user = useRegister((state) => state.data);

    const max = new Date();
    max.setHours(0, 0, 0, 0);
    const min = new Date(max);

    min.setFullYear(min.getFullYear() - 80);
    max.setFullYear(max.getFullYear() - 18);

    const [sex, setSex] = useState<Genre>(user.genre || "M");
    const [day, setDay] = useState(
        getDateInput(user.birthday ? new Date(user.birthday) : max)
    );

    useEffect(() => {
        const date = parseDateInput(day);
        if (!date) return;
        setAge(date, sex);
    }, [sex, day, parseDateInput]);

    const validation = useMemo(() => {
        const date = parseDateInput(day);
        if (!date) {
            return {
                error: true,
                message: "La fecha ingresada es inválida",
            };
        }

        if (date > max || date < min) {
            return {
                error: true,
                message: "La fecha está fuera de rango",
            };
        }
        return {
            error: false,
            message: "",
        };
    }, [day]);

    return (
        <Box ref={ref}>
            <h2 className="title-medium">
                <Cake sx={{ mr: 1, mb: "-2px" }} />
                Fecha de nacimiento
            </h2>
            <p className="body-large opacity-70" style={{ marginTop: 4 }}>
                Debes ser mayor de edad para acceder a los centros deportivos.
                Si tienes niños, revisa la sección para Kids.
            </p>
            <TextField
                slotProps={{
                    inputLabel: { shrink: true },
                    htmlInput: {
                        max: getDateInput(max),
                        min: getDateInput(min),
                    },
                }}
                label="Día"
                sx={{ mt: 2 }}
                fullWidth
                type="date"
                value={day}
                error={validation.error}
                helperText={validation.message}
                onChange={(e) => setDay(e.target.value)}
            />

            <h2 className="title-medium" style={{ marginTop: 32 }}>
                <Wc sx={{ mr: 1, mb: "-2px" }} />
                Sexo
            </h2>
            <p className="body-large opacity-70" style={{ marginTop: 4 }}>
                Puedes recibir funciones y rutinas especializadas según tu sexo.
            </p>

            <RadioGroup value={sex} onChange={(_e, v) => setSex(v as Genre)}>
                <FormControlLabel
                    value={"M"}
                    control={<Radio />}
                    label="Mujer"
                />
                <FormControlLabel
                    value={"H"}
                    control={<Radio />}
                    label="Hombre"
                />
                <FormControlLabel
                    value={"D"}
                    control={<Radio />}
                    label="Ocultarlo"
                />
            </RadioGroup>
        </Box>
    );
});

export default AgeForm;
