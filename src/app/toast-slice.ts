// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store.ts";
import { SMALL_DURATION, ToastDuration } from "@components/Toast.tsx";

export type NotificationToastContent = {
    headerTitle: string;
    body: string;
    smallTitle?: string;
    duration?: ToastDuration;
}

export type NotificationToastState = {
    show: boolean;
} & NotificationToastContent

type ToastPayload = PayloadAction<Partial<NotificationToastContent>>;

const initialState: NotificationToastState = {
    headerTitle: "",
    body: "",
    show: false,
    smallTitle: "",
    duration: SMALL_DURATION,
};

export const notificationToastSlice = createSlice({
    name: "notificationToast",
    initialState,
    reducers: {
        showNotificationToast: (state, action: ToastPayload) => {
            Object.assign(state, action.payload);
            state.show = true;
        },
        hideNotificationToast: state => {
            Object.assign(state, initialState);
            state.show = false;
        },
    },
});

export const {
    showNotificationToast,
    hideNotificationToast,
} = notificationToastSlice.actions;

export const selectNotificationToast = (state: RootState) => state.toasts;

export default notificationToastSlice.reducer;
