import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Pages from "vite-plugin-pages";

// https://vite.dev/config/
export default defineConfig({
    server: {
        port: 5089,
    },
    plugins: [
        react(),
        Pages({
            dirs: "src/pages",
            extensions: ["tsx"],
        }),
    ],
});
