import Context from "@components/Context";
import { CustomTheme } from "@models/CustomTheme";
import { Settings } from "@models/Settings";
import {
    createTheme,
    CssBaseline,
    ThemeProvider,
    useMediaQuery,
} from "@mui/material";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import routes from "~react-pages";

import material from "@config/material-theme.json";
import kaady from "@config/kaady-settings.json";
import { ScrollToTop } from "@components/ScrollToTop";
import Splash from "@components/Splash";
import { APIProvider } from "@vis.gl/react-google-maps";

function Routes() {
    return <Suspense fallback={<Splash />}>{useRoutes(routes)}</Suspense>;
}

function App() {
    const [theme, setTheme] = useState(createTheme());
    const [scheme, setScheme] = useState(material.schemes.light);
    const [settings, setSettings] = useState(kaady as Settings);
    const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    const update = useCallback(
        (value: Settings) => {
            let updatedScheme = material.schemes.light;
            let options = new CustomTheme(updatedScheme, false);

            if (value.theme === "system") {
                if (isDarkMode) {
                    updatedScheme = material.schemes.dark;
                }
                options = new CustomTheme(updatedScheme, isDarkMode);
            } else if (material.schemes[value.theme]) {
                updatedScheme = material.schemes[value.theme];
                options = new CustomTheme(
                    updatedScheme,
                    value.theme.includes("dark")
                );
            }

            const updatedTheme = createTheme(options);
            setSettings(value);
            setScheme(updatedScheme);
            setTheme(updatedTheme);
        },
        [isDarkMode]
    );

    useEffect(() => {
        update(kaady as Settings);
    }, [update]);

    const value = useMemo(
        () => ({
            updateSettings: update,
            settings,
            scheme,
            theme,
        }),
        [theme, scheme, settings, update]
    );

    return (
        <Context.Provider value={value}>
            <APIProvider
                apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
                libraries={["places", "marker"]}
            >
                <ThemeProvider theme={value.theme}>
                    <CssBaseline />
                    <BrowserRouter>
                        <ScrollToTop />
                        <Routes />
                    </BrowserRouter>
                </ThemeProvider>
            </APIProvider>
        </Context.Provider>
    );
}

export default App;
