import Context from "@components/Context";
import Logo from "@components/Logo";
import Rights from "@components/Rights";
import Root from "@components/Root";
import {
    ContentCopyOutlined,
    FileDownloadOutlined,
    PrintOutlined,
} from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import { POLICIES_LIST } from "@views/legal/ListPolicies";
import { useContext, useMemo } from "react";
import { useNavigate } from "react-router";

function Policies() {
    const { scheme } = useContext(Context);
    const navigate = useNavigate();

    const handleCopy = async () => {
        const url = "https://www.kaadysport.com/policies";
        await navigator.clipboard.writeText(url);
    };

    const list = useMemo(() => POLICIES_LIST, []);
    const list_content = list.map((item, index) => (
        <Stack key={index}>
            <Stack
                padding={"8px 0px"}
                position={"sticky"}
                top={0}
                sx={{
                    bgcolor: scheme.background,
                    borderBottom: `1px solid ${scheme.outlineVariant}`,
                }}
            >
                <Typography variant="h4" component={"h1"}>
                    {index + 1}. {item.title}
                </Typography>
            </Stack>
            <Stack
                padding={"28px 0px"}
                sx={{
                    "& strong": {
                        color: scheme.primary,
                    },
                }}
            >
                {item.content}
            </Stack>
        </Stack>
    ));

    return (
        <Root>
            <Stack alignItems={"start"} marginTop={4}>
                <a title="Inicio" onClick={() => navigate("/")}>
                    <Logo height="40px" />
                </a>
                <Typography
                    marginTop={8}
                    marginBottom={"28px"}
                    variant="h3"
                    component={"h1"}
                >
                    Términos y Condiciones
                </Typography>
                <Typography variant="h6" color="textSecondary">
                    Publicado el 14 de agosto de 2023
                </Typography>
                <Typography
                    marginTop={"8px"}
                    variant="h6"
                    color="textSecondary"
                >
                    Idioma original español
                </Typography>
                <Stack
                    direction={"row"}
                    paddingTop={"48px"}
                    gap={"28px"}
                    flexWrap={"wrap"}
                >
                    <Stack alignItems={"center"}>
                        <IconButton
                            color="primary"
                            href="/documents/Kaady%20Sport%20Policies.pdf"
                            download={
                                "KAADY SPORT - Términos y Condiciones.pdf"
                            }
                        >
                            <FileDownloadOutlined />
                        </IconButton>
                        <Typography variant="caption">Descargar</Typography>
                    </Stack>
                    <Stack alignItems={"center"}>
                        <IconButton
                            color="primary"
                            href="/documents/Kaady%20Sport%20Policies.pdf"
                            target="_blank"
                        >
                            <PrintOutlined />
                        </IconButton>
                        <Typography variant="caption">Imprimir</Typography>
                    </Stack>
                    <Stack alignItems={"center"}>
                        <IconButton color="primary" onClick={handleCopy}>
                            <ContentCopyOutlined />
                        </IconButton>
                        <Typography variant="caption">Copiar</Typography>
                    </Stack>
                </Stack>
            </Stack>

            <Stack py={8}>{list_content}</Stack>
            <Stack pt={2} pb={4} component={"footer"}>
                <Rights />
            </Stack>
        </Root>
    );
}

export default Policies;
