// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store.ts";

export interface CookieBannerState {
    show: boolean;
}

const initialState: CookieBannerState = {
    show: true,
};

export const cookieBannerSlice = createSlice({
    name: "cookie-banner",
    initialState,
    reducers: {
        show: state => {
            state.show = true;
        },
        hide: state => {
            state.show = false;
        },
    },
});

export const { show, hide } = cookieBannerSlice.actions;

export const selectShow = (state: RootState) => state.cookies.show;

export default cookieBannerSlice.reducer;
