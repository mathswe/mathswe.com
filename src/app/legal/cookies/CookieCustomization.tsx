// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import { showNotificationToast } from "@app/toast-slice.ts";
import { LARGE_DURATION } from "@ui/Toast.tsx";
import { useAppDispatch } from "@app/hooks.ts";
import {
    applyConsent,
    ClientCookieConsent,
    consentCookieName,
    CookieConsentPref,
    loadEffectiveCookiePref,
} from "@persistence/cookie-consent.ts";
import { CookiePref } from "@ui/legal/cookie-pref.ts";
import {
    newCookieConsentPref,
    requestConsent,
} from "@app/legal/cookies/cookie-consent-service.ts";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

export type CookieCustomizationHook = [ (newPref: CookiePref) => void ];

export function useCookieCustomization(): CookieCustomizationHook {
    const dispatch = useAppDispatch();
    const [ cookies, setCookie ] = useCookies([ consentCookieName ]);
    const [ effectivePref, setEffectivePref ] = useState<CookiePref | undefined>();

    const onConsentApply = (consent: ClientCookieConsent) => {
        const { cookieName, consentSer, options } = applyConsent(consent);

        setCookie(cookieName, consentSer, options);
        dispatch(showNotificationToast({
            headerTitle: "Cookie Consent",
            body: "✔ Consent applied successfully.",
        }));
    };

    const onConsentFail = (reason: unknown) => {
        dispatch(showNotificationToast({
            headerTitle: "Cookie Consent",
            body: `❌ ${ String(reason) }`,
            duration: LARGE_DURATION,
        }));
    };

    const onConsentUnchanged = () => {
        dispatch(showNotificationToast({
            headerTitle: "Cookie Consent",
            body: "✔ Existing consent matches the requested preferences.",
        }));
    };

    const requestNewConsent = (newConsentPref: CookieConsentPref) => {
        requestConsent(newConsentPref)
            .then(onConsentApply, onConsentFail);
    };

    const processConsent = (newPref: CookiePref) => {
        if (prefEqual(newPref, effectivePref)) {
            onConsentUnchanged();
        }
        else {
            const newConsentPref = newCookieConsentPref(newPref);

            requestNewConsent(newConsentPref);
        }
    };

    useEffect(() => {
        const pref = loadEffectiveCookiePref(cookies);

        setEffectivePref(pref);
    }, [ cookies ]);

    return [ processConsent ];
}

function prefEqual(a: CookiePref, b?: CookiePref): boolean {
    return b === undefined ? false :
        a.functional === b.functional &&
        a.analytical === b.analytical &&
        a.targeting === b.targeting;
}
