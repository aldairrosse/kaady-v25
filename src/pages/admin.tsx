import Dashboard from "@components/Dashboard";

import {
    AccountCircle,
    Equalizer,
    FitnessCenter,
    Segment,
} from "@mui/icons-material";

export default function User() {
    return (
        <Dashboard
            options={[
                {
                    title: "Resumen",
                    icon: <Equalizer />,
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
                    title: "Cuenta",
                    icon: <AccountCircle />,
                    path: "/user/account",
                    titleMobile: true,
                },
            ]}
        />
    );
}
