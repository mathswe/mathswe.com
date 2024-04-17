// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import { showNotificationToast } from "@app/toast-slice.ts";
import { LARGE_DURATION } from "@ui/Toast.tsx";
import { useAppDispatch } from "@app/hooks.ts";
import {
    applyConsent,
    ClientCookieConsent, consentCookieName,
    CookieConsentPref,
} from "@persistence/cookie-consent.ts";
import { CookiePref } from "@ui/legal/cookie-pref.ts";
import {
    newCookieConsentPref,
    requestConsent,
} from "@app/legal/cookies/cookie-consent-service.ts";
import { useCookies } from "react-cookie";

export type CookieCustomizationHook = [ (newPref: CookiePref) => void ];

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

    const requestNewConsent = (newConsentPref: CookieConsentPref) => {
        requestConsent(newConsentPref)
            .then(onConsentApply, onConsentFail);
    };

    const processConsent = (newPref: CookiePref) => {
        const newConsentPref = newCookieConsentPref(newPref);

        requestNewConsent(newConsentPref);
    };

    return [ processConsent ];
}
