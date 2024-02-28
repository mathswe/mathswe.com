// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import CookieBanner, { CookiePref, defPref } from "@ui/legal/CookieBanner.tsx";
import { useAppDispatch, useAppSelector } from "@app/hooks.ts";
import { hide, selectShow, show } from "@app/cookies-slice.ts";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
    applyConsent,
    consentCookieName,
    CookieConsent,
    loadCookieConsent,
} from "@persistence/cookie-consent.ts";

const cookiePolicyLink = "/legal#cookies";

function newCookieConsent(
    {
        functional,
        analytics,
        targeting,
    }: CookiePref,
): CookieConsent {
    return {
        necessary: true,
        functional: functional ?? false,
        analytics: analytics ?? false,
        targeting: targeting ?? false,
    };
}

function CookieBannerConsent() {
    const showCookieBanner = useAppSelector(selectShow);
    const dispatch = useAppDispatch();

    const closeBanner = () => { dispatch(hide()); };

    const [ cookies, setCookie ] = useCookies([ consentCookieName ]);

    const [ pref, setPref ] = useState(defPref);

    const save = (pref: CookiePref) => {
        const consent = newCookieConsent(pref);
        const { cookieName, consentSer, options } = applyConsent(consent);

        setCookie(cookieName, consentSer, options);
        closeBanner();
    };

    useEffect(() => {
        const { functional, analytics, targeting } = loadCookieConsent(cookies);

        setPref({ functional, analytics, targeting });

        if (!cookies[consentCookieName]) {
            dispatch(show());
        }
    }, [ cookies, dispatch ]);

    return <>
        <CookieBanner
            cookiePolicyLink={ cookiePolicyLink }
            show={ showCookieBanner }
            initialForm={ pref }
            onSave={ save }
            onClose={ closeBanner }
        />
    </>;
}

export default CookieBannerConsent;
