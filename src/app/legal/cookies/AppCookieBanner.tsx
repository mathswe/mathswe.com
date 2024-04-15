// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import CookieBanner from "@ui/legal/CookieBanner.tsx";
import { CookiePref, defPref } from "@ui/legal/cookie-pref.ts";
import { useAppDispatch, useAppSelector } from "@app/hooks.ts";
import {
    hideCookieBanner,
    selectShowingBanner,
    selectShowingCustomization,
    showCookieBanner,
    showCookieCustomization,
} from "@app/cookies-slice.ts";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
    applyConsent,
    consentCookieName,
    CookieConsent,
    loadCookieConsent,
} from "@persistence/cookie-consent.ts";

const cookiePolicyLink = "/legal/cookie-policy";

function newCookieConsent(
    {
        functional,
        analytical,
        targeting,
    }: CookiePref,
): CookieConsent {
    return {
        necessary: true,
        functional: functional ?? false,
        analytical: analytical ?? false,
        targeting: targeting ?? false,
    };
}

function AppCookieBanner() {
    const showingBanner = useAppSelector(selectShowingBanner);
    const showingCustomizationPane = useAppSelector(selectShowingCustomization);
    const dispatch = useAppDispatch();

    const closeBanner = () => { dispatch(hideCookieBanner()); };

    const [ cookies, setCookie ] = useCookies([ consentCookieName ]);

    const [ pref, setPref ] = useState(defPref);

    const [ domainName, setDomainName ] = useState("");

    const save = (pref: CookiePref) => {
        const consent = newCookieConsent(pref);
        const { cookieName, consentSer, options } = applyConsent(consent);

        setCookie(cookieName, consentSer, options);
        closeBanner();
    };

    const customize = () => {
        closeBanner();
        dispatch(showCookieCustomization());
    };

    useEffect(() => {
        const { functional, analytical, targeting } = loadCookieConsent(cookies);

        setPref({ functional, analytical, targeting });

        if (!cookies[consentCookieName] && !showingCustomizationPane) {
            dispatch(showCookieBanner());
        }
    }, [ cookies, showingCustomizationPane, dispatch ]);

    useEffect(() => setDomainName(import.meta.env.VITE_DOMAIN_NAME ?? ""), []);

    return <>
        <CookieBanner
            domainName={ domainName }
            cookiePolicyLink={ cookiePolicyLink }
            show={ showingBanner }
            initialForm={ pref }
            onSave={ save }
            onClose={ closeBanner }
            onCustomize={ customize }
        />
    </>;
}

export default AppCookieBanner;
