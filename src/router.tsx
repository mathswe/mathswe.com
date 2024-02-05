// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import { createBrowserRouter } from "react-router-dom";
import App from "@/App.tsx";
import Legal from "@/legal/Legal.tsx";

function NotFound() {
    return <>
        Not Found
    </>;
}

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App></App>,
        },
        {
            path: "/legal",
            element: <Legal></Legal>,
        },
        {
            path: "*",
            element: <NotFound></NotFound>,
        },
    ]);
