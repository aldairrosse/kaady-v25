import Context from "@components/Context";
import { useSession } from "@hooks/session";
import { Login } from "@mui/icons-material";
import {
    Button,
    FormControlLabel,
    Radio,
    RadioGroup,
    Stack,
} from "@mui/material";
import { getRedirect } from "@utils/user";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";

export default function Role() {
    const navigate = useNavigate();
    const { scheme } = useContext(Context);
    const [role, setRole] = useState(1);
    const roles = useSession((state) => state.user?.role);

    const handleTo = () => {
        navigate(getRedirect(role).to);
    };

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
                <p className="body-large opacity-70" style={{ marginTop: 8 }}>
                    Tu cuenta está vinculada con los siguientes roles,
                    selecciona a cual quieres ingresar.
                </p>

                {roles?.length ? (
                    <RadioGroup
                        value={role}
                        onChange={(_, v) => setRole(Number(v))}
                        sx={{ mt: 2 }}
                    >
                        {roles.map((v) => (
                            <FormControlLabel
                                key={v}
                                label={getRedirect(v).title}
                                control={<Radio />}
                                value={v}
                            />
                        ))}
                    </RadioGroup>
                ) : (
                    <Stack
                        sx={{
                            bgcolor: scheme.surfaceVariant,
                            color: scheme.onSurfaceVariant,
                            borderRadius: 4,
                            px: 2,
                            py: 1,
                        }}
                    >
                        <p className="body-large">
                            No se encontraron tus roles
                        </p>
                    </Stack>
                )}

                <Stack gap={2} marginTop={4} marginBottom={2}>
                    <Button
                        size="large"
                        variant="contained"
                        disableElevation
                        startIcon={<Login />}
                        disabled={!roles?.length}
                        onClick={handleTo}
                    >
                        Ingresar
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
}
