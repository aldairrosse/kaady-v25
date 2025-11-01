import { Button, ButtonOwnProps, Stack } from "@mui/material";
import { useNavigate } from "react-router";

function InfoLinks() {
    const navigate = useNavigate();
    const config = {
        size: "small",
        variant: "text",
        color: "inherit",
        sx: {
            opacity: 0.8,
            textDecoration: "none",
            px: 2,
        },
    } as ButtonOwnProps;

    const toContact = () => {
        window.open(
            "mailto:contacto@kaadysport.com?subject=Hola%20Kaady%20Sport&body=Hola!",
            "_blank"
        );
    };

    return (
        <Stack
            direction={"row"}
            gap={2}
            alignItems={"center"}
            justifyContent={"center"}
            width={"100%"}
        >
            <Button
                {...config}
                title="Nosotros"
                onClick={() => navigate("/about")}
            >
                Acerca de nosotros
            </Button>
            <Button
                {...config}
                title="Términos"
                onClick={() => navigate("/policies")}
            >
                Términos y condiciones
            </Button>
            <Button {...config} title="Contacto" onClick={toContact}>
                Contacto
            </Button>
        </Stack>
    );
}

export default InfoLinks;
