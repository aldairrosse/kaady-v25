import Dashboard from "@components/Dashboard";

import {
    AccountCircle,
    Bookmark,
    FitnessCenter,
    Map,
    Segment,
} from "@mui/icons-material";
import Mapa from "@views/center/Mapa";

export default function User() {
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
