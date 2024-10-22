import { defineConfig } from "vitest/config";
import viteConfig from "./vite.config.ts";

export default defineConfig({
    ...viteConfig,
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: [ "./src/setupTests.ts" ],
    },
    esbuild: {
        jsxInject: `import React from 'react'`,  // Automatically inject React
    },
});
