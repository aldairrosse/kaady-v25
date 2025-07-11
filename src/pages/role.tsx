import Context from "@components/Context";
import { Login } from "@mui/icons-material";
import {
    Button,
    FormControlLabel,
    Radio,
    RadioGroup,
    Stack,
} from "@mui/material";
import { useContext, useState } from "react";

export default function Role() {
    const { scheme } = useContext(Context);
    const [role, setRole] = useState(0);

    return (
        <Stack
            sx={{ justifyContent: "center", alignItems: "center" }}
            height={"100dvh"}
            padding={2}
        >
            <Stack
                bgcolor={scheme.surfaceContainerLowest}
                sx={{
                    width: "100%",
                    maxWidth: "600px",
                    padding: 2,
                    borderRadius: 4,
                }}
                border={"1px solid"}
                borderColor={scheme.outlineVariant}
            >
                <h1 className="headline-medium">Elige un rol para continuar</h1>
                <p className="body-medium opacity-70" style={{ marginTop: 4 }}>
                    Tu cuenta está vinculada con los siguientes roles, usa uno
                    para ingresar.
                </p>

                <RadioGroup
                    value={role}
                    onChange={(_, v) => setRole(Number(v))}
                    sx={{ mt: 2 }}
                >
                    <FormControlLabel
                        label="Admin"
                        control={<Radio />}
                        value={0}
                    />
                    <FormControlLabel
                        label="Center"
                        control={<Radio />}
                        value={1}
                    />
                    <FormControlLabel
                        label="User"
                        control={<Radio />}
                        value={2}
                    />
                </RadioGroup>

                <Stack gap={2} marginTop={4} marginBottom={2}>
                    <Button
                        size="large"
                        variant="contained"
                        disableElevation
                        startIcon={<Login />}
                    >
                        Ingresar
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
}
