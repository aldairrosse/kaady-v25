import Dashboard from "@components/Dashboard";

import {
    AccountCircle,
    Equalizer,
    FitnessCenter,
    People,
    Segment,
} from "@mui/icons-material";

export default function Admin() {
    return (
        <Dashboard
            options={[
                {
                    title: "Resumen",
                    icon: <Equalizer />,
                    path: "/admin",
                },
                {
                    title: "Centros",
                    icon: <FitnessCenter />,
                    path: "/admin/centers",
                },
                {
                    title: "Usuarios",
                    icon: <People />,
                    path: "/admin/users",
                },
                {
                    title: "Actividades",
                    icon: <Segment />,
                    path: "/admin/activities",
                    titleMobile: true,
                },
                {
                    title: "Cuenta",
                    icon: <AccountCircle />,
                    path: "/admin/account",
                    titleMobile: true,
                },
            ]}
        />
    );
}
