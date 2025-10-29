import { useRegister } from "@hooks/useRegister";
import { Badge } from "@mui/icons-material";
import { Box, Icon, Stack, TextField } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";

const NameForm = forwardRef(function (_, ref) {
    const setNames = useRegister((state) => state.setNames);
    const user = useRegister((state) => state.data);
    const [data, setData] = useState({
        name: user.name || "",
        first: user.paternal_surname || "",
        second: user.maternal_surname || "",
    });

    useEffect(() => {
        setNames(data.name.trim(), data.first.trim(), data.second.trim());
    }, [data]);

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

            <TextField
                label="Nombre(s)"
                sx={{ mt: 2 }}
                fullWidth
                value={data.name}
                onChange={(e) =>
                    setData((v) => ({
                        ...v,
                        name: e.target.value,
                    }))
                }
            />
            <Stack direction="row" sx={{ mt: 2 }} gap={2}>
                <TextField
                    fullWidth
                    label="Apellido paterno"
                    value={data.first}
                    onChange={(e) =>
                        setData((v) => ({
                            ...v,
                            first: e.target.value,
                        }))
                    }
                />
                <TextField
                    fullWidth
                    label="Apellido materno"
                    value={data.second}
                    onChange={(e) =>
                        setData((v) => ({
                            ...v,
                            second: e.target.value,
                        }))
                    }
                />
            </Stack>
        </Box>
    );
});

export default NameForm;
