import react from "@vitejs/plugin-react-swc";
import { resolve } from "node:path";
import { defineConfig } from "vite";
// @ts-expect-error They must fix this dev dep to support its types correctly
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        eslint(),
    ],
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
            "@components": resolve(__dirname, "src/components"),
            "@persistence": resolve(__dirname, "src/com/persistence"),
            "@ui": resolve(__dirname, "src/com/ui"),
            "@analytics": resolve(__dirname, "src/com/analytics"),
            "@app": resolve(__dirname, "src/app"),
        },
    },
});
