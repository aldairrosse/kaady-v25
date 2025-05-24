import { Theme } from "@mui/material";
import { Scheme } from "./Scheme";
import { Settings } from "./Settings";

export interface AppContext {
    scheme: Scheme;
    theme: Theme;
    settings: Settings;
    updateSettings: (update: Settings) => void;
}