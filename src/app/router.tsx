// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import { createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import Legal from "@app/legal/Legal.tsx";
import { ReactNode } from "react";
import Layout from "./Layout.tsx";
import { RouteObject } from "react-router/dist/lib/context";
import { Provider } from "react-redux";
import { store } from "./store.ts";

function layoutOf(node: ReactNode) {
    return <>
        <Layout>
            { node }
        </Layout>
    </>;
}

function NotFound() {
    return <>
        Not Found
    </>;
}

const wrapView = (route: RouteObject) => ({
    ...route,
    element: layoutOf(route.element),
});

const wrapStoreProvider = (route: RouteObject) => ({
    ...route,
    element:
        <Provider store={ store }>
            { route.element }
        </Provider>,
});

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
    ]
        .map(wrapView)
        .map(wrapStoreProvider),
);