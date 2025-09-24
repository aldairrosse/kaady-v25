import { useApiMail } from "@api/mail";
import Context from "@components/Context";
import { useSession } from "@hooks/useSession";
import { Code, MailOutline, Visibility } from "@mui/icons-material";
import {
    Box,
    InputAdornment,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";

export default function Identity() {
    const [type, setType] = useState("preview");
    const session = useSession();
    const [name, setName] = useState(session.identity?.name || "");
    const [sign, setSign] = useState(session.identity?.sign || "");
    const { agregarIdentidad, verIdentidad } = useApiMail();
    const { scheme } = useContext(Context);

    useEffect(() => {
        const load = () => {
            loadIdentity();
        };

        load();
    }, []);

    const loadIdentity = async () => {
        try {
            const res = await verIdentidad();
            if (!res) return;
            session.setIdentity(res);
            setName(res.name);
            setSign(res.sign);
        } catch (error) {
            console.error(error);
        }
    };

    const saveData = async () => {
        try {
            await agregarIdentidad(name, sign);
            if (
                session.identity?.name != name ||
                session.identity.sign != sign
            ) {
                loadIdentity();
            }
        } catch (error) {
            console.error(error);
        }
    };

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
            <h1 className="title-large">Identidad de correo</h1>
            <p className="body-large opacity-80" style={{ marginTop: 8 }}>
                Usa un nombre y firma con tu información actualizada
            </p>
            <TextField
                placeholder="Nombre de identidad"
                sx={{ mt: 2 }}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <MailOutline />
                            </InputAdornment>
                        ),
                    },
                }}
                value={name}
                onBlur={() => saveData()}
                onChange={(e) => setName(e.target.value)}
            />
            <Stack direction={"row"} mt={6} alignItems={"end"}>
                <p className="title-medium" style={{ flexGrow: 1 }}>
                    Firma de correo
                </p>
                <ToggleButtonGroup
                    value={type}
                    exclusive
                    onChange={(_e, value) => setType(value)}
                    aria-label="firma mail"
                    size="small"
                >
                    <ToggleButton value="preview">
                        <Visibility />
                    </ToggleButton>
                    <ToggleButton value="html">
                        <Code />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Stack>
            {type === "html" ? (
                <TextField
                    multiline
                    rows={8}
                    sx={{ mt: 2 }}
                    value={sign}
                    onBlur={saveData}
                    onChange={(e) => setSign(e.target.value)}
                    suppressContentEditableWarning
                />
            ) : (
                <Box
                    sx={{
                        mt: 2,
                        border: `1px solid ${scheme.outlineVariant}`,
                        borderRadius: 1,
                        minHeight: 200,
                        padding: 2,
                        overflow: "auto",
                    }}
                    dangerouslySetInnerHTML={{ __html: sign }}
                />
            )}
        </Box>
    );
}
