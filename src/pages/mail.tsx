import Dashboard from "@components/Dashboard";

import {
    AccountCircle,
    Inbox,
    Outbox,
    Send,
    VerifiedUser,
} from "@mui/icons-material";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Mail() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/mail/inbox");
    }, []);

    return (
        <Dashboard
            options={[
                {
                    title: "Recibidos",
                    icon: <Inbox />,
                    path: "/mail/inbox",
                    titleMobile: true,
                },
                {
                    title: "Enviados",
                    icon: <Outbox />,
                    path: "/mail/outbox",
                    titleMobile: true,
                },
                {
                    title: "Enviar",
                    icon: <Send />,
                    path: "/mail/send",
                    divider: true,
                },
                {
                    title: "Identidad",
                    icon: <VerifiedUser />,
                    path: "/mail/identity",
                },
                {
                    title: "Cuenta",
                    icon: <AccountCircle />,
                    path: "/mail/account",
                    titleMobile: true,
                },
            ]}
        />
    );
}
