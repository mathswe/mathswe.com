// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import { CookiePref, defPref } from "@ui/legal/cookie-pref.ts";
import { useAppDispatch, useAppSelector } from "@app/hooks.ts";
import {
    hideCookieCustomization,
    selectShowingCustomization,
} from "@app/cookies-slice.ts";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
    applyConsent,
    consentCookieName,
    CookieConsent,
    loadCookieConsent,
} from "@persistence/cookie-consent.ts";
import CookieCustomization, {
    Description,
} from "@ui/legal/CookieCustomization.tsx";
import {
    analyticalCookiesDesc,
    essentialCookiesDesc,
    functionalCookiesDesc,
    targetingCookiesDesc,
} from "@app/legal/cookies/cookies.ts";

const cookiePolicyLink = "/legal/cookie-policy";

const cookieDescription: Description = {
    essentialCookies: essentialCookiesDesc,
    functionalCookies: functionalCookiesDesc,
    analyticalCookies: analyticalCookiesDesc,
    targetingCookies: targetingCookiesDesc,
};

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

function AppCookieBanner() {
    const showingCustomization = useAppSelector(selectShowingCustomization);
    const dispatch = useAppDispatch();

    const closeCustomization = () => { dispatch(hideCookieCustomization()); };

    const [ cookies, setCookie ] = useCookies([ consentCookieName ]);

    const [ pref, setPref ] = useState(defPref);

    const [ domainName, setDomainName ] = useState("");

    const save = (pref: CookiePref) => {
        const consent = newCookieConsent(pref);
        const { cookieName, consentSer, options } = applyConsent(consent);

        setCookie(cookieName, consentSer, options);
        closeCustomization();
    };

    useEffect(() => {
        const { functional, analytics, targeting } = loadCookieConsent(cookies);

        setPref({ functional, analytics, targeting });
    }, [ cookies, dispatch ]);

    useEffect(() => setDomainName(import.meta.env.VITE_DOMAIN_NAME ?? ""), []);

    return <>
        <CookieCustomization
            domainName={ domainName }
            cookiePolicyLink={ cookiePolicyLink }
            description={ cookieDescription }
            show={ showingCustomization }
            initialForm={ pref }
            onSave={ save }
            onClose={ closeCustomization }
        />
    </>;
}

export default AppCookieBanner;
