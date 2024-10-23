// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import { configureStore } from "@reduxjs/toolkit";
import cookieReducer from "./cookies-slice.ts";
import toastSlice from "@app/toast-slice.ts";

export const store = configureStore({
    reducer: {
        cookies: cookieReducer,
        toasts: toastSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
