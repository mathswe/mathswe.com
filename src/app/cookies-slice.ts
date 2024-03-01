// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store.ts";

export interface CookieState {
    showingBanner: boolean;
    showingCustomization: boolean;
}

const initialState: CookieState = {
    showingBanner: false,
    showingCustomization: false,
};

export const cookieSlice = createSlice({
    name: "cookies",
    initialState,
    reducers: {
        showCookieBanner: state => {
            state.showingBanner = true;
        },
        hideCookieBanner: state => {
            state.showingBanner = false;
        },
        showCookieCustomization: state => {
            state.showingCustomization = true;
        },
        hideCookieCustomization: state => {
            state.showingCustomization = false;
        },
    },
});

export const {
    showCookieBanner,
    hideCookieBanner,
    showCookieCustomization,
    hideCookieCustomization,
} = cookieSlice.actions;

export const selectShowingBanner = (state: RootState) => state.cookies.showingBanner;

export const selectShowingCustomization = (state: RootState) => state.cookies.showingCustomization;

export default cookieSlice.reducer;
