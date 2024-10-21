// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";

const rootEl = document.getElementById("root");

if (rootEl === null) {
    console.error("Root element not found");
}
else {
    render(rootEl);
}

function render(rootEl: HTMLElement) {
    createRoot(rootEl)
        .render(
            <StrictMode>
                <RouterProvider router={ router } />
            </StrictMode>,
        );
}
