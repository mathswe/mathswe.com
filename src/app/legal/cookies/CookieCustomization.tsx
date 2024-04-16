// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import { showNotificationToast } from "@app/toast-slice.ts";
import { LARGE_DURATION } from "@ui/Toast.tsx";
import { useAppDispatch } from "@app/hooks.ts";
import {
    applyConsent,
    ClientCookieConsent,
    consentCookieName,
} from "@persistence/cookie-consent.ts";
import { useCookies } from "react-cookie";

export type CookieCustomizationHook = [ (consent: ClientCookieConsent) => void, (reason: string) => void ];

export function useCookieCustomization(): CookieCustomizationHook {
    const dispatch = useAppDispatch();
    const [ , setCookie ] = useCookies([ consentCookieName ]);

    const onConsentApply = (consent: ClientCookieConsent) => {
        const { cookieName, consentSer, options } = applyConsent(consent);

        setCookie(cookieName, consentSer, options);
        dispatch(showNotificationToast({
            headerTitle: "Cookie Consent",
            body: "✔ Consent applied successfully.",
        }));
    };

    const onConsentFail = (reason: string) => {
        dispatch(showNotificationToast({
            headerTitle: "Cookie Consent",
            body: `❌ ${ reason }`,
            duration: LARGE_DURATION,
        }));
    };

    return [ onConsentApply, onConsentFail ];
}
