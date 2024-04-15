// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import { showNotificationToast } from "@app/toast-slice.ts";
import { LARGE_DURATION } from "@ui/Toast.tsx";
import { useAppDispatch } from "@app/hooks.ts";

export function useCookieCustomization() {
    const dispatch = useAppDispatch();

    const notifyConsentSuccessful = () => {
        dispatch(showNotificationToast({
            headerTitle: "Cookie Consent",
            body: "✔ Consent applied successfully.",
        }));
    };

    const notifyConsentFail = (reason: string) => {
        dispatch(showNotificationToast({
            headerTitle: "Cookie Consent",
            body: `❌ ${ reason }`,
            duration: LARGE_DURATION,
        }));
    };

    return [ notifyConsentSuccessful, notifyConsentFail ];
}
