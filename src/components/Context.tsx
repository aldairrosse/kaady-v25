import { createTheme } from "@mui/material";
import { createContext } from "react";

import { AppContext } from "@models/AppContext";
import { Settings } from "@models/Settings";

import material from '@config/material-theme.json'
import kaady from '@config/kaady-settings.json'

const Context = createContext<AppContext>({
    theme: createTheme(),
    scheme: material.schemes.light,
    settings: kaady as Settings,
    updateSettings: () => { },
});
export default Context;