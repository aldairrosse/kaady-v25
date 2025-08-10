import Dashboard from "@components/Dashboard";
import { useSession } from "@hooks/session";

import {
    AccountCircle,
    Bookmark,
    FitnessCenter,
    Map,
    Segment,
} from "@mui/icons-material";
import Mapa from "@views/center/Mapa";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function User() {
    const session = useSession();
    const navigate = useNavigate();

    useEffect(() => {
        if (!session.user) {
            navigate("/login");
        }
    }, []);
    return (
        <Dashboard
            options={[
                {
                    title: "Mapa",
                    icon: <Map />,
                    path: "/user",
                },
                {
                    title: "Centros",
                    icon: <FitnessCenter />,
                    path: "/user/centers",
                },
                {
                    title: "Actividades",
                    icon: <Segment />,
                    path: "/user/activities",
                    titleMobile: true,
                },
                {
                    title: "Reservaciones",
                    icon: <Bookmark />,
                    path: "/user/bookings",
                },
                {
                    title: "Cuenta",
                    icon: <AccountCircle />,
                    path: "/user/account",
                    titleMobile: true,
                },
            ]}
        >
            <Mapa />
        </Dashboard>
    );
}
