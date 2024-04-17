// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import CookieBanner from "@ui/legal/CookieBanner.tsx";
import { CookiePref, defPref } from "@ui/legal/cookie-pref.ts";
import { useAppDispatch, useAppSelector } from "@app/hooks.ts";
import {
    hideCookieBanner,
    selectShowingBanner,
    showCookieBanner,
    showCookieCustomization,
} from "@app/cookies-slice.ts";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
    consentCookieName,
    getCookiePref,
    loadCookieConsentMeta,
} from "@persistence/cookie-consent.ts";
import { cookiePolicyLink } from "@app/legal/cookies/cookies.ts";
import {
    useCookieCustomization,
} from "@app/legal/cookies/CookieCustomization.tsx";

function AppCookieBanner() {
    const [ processConsent ] = useCookieCustomization();

    const showingBanner = useAppSelector(selectShowingBanner);
    const dispatch = useAppDispatch();

    const closeBanner = () => { dispatch(hideCookieBanner()); };

    const [ cookies ] = useCookies([ consentCookieName ]);

    const [ pref, setPref ] = useState(defPref);

    const [ domainName, setDomainName ] = useState("");

    const [ effectiveConsent, setEffectiveConsent ] = useState<string | undefined>();

    const [ customizationPaneShowed, setCustomizationPaneShowed ]
        = useState(false);

    const save = (newPref: CookiePref) => {
        processConsent(newPref);
        closeBanner();
    };

    const customize = () => {
        closeBanner();
        dispatch(showCookieCustomization());
        setCustomizationPaneShowed(true);
    };

    useEffect(() => {
        const pref = getCookiePref(cookies);

        setPref(pref);

        const meta = loadCookieConsentMeta(cookies);

        setEffectiveConsent(meta ? meta.consentId : undefined);

        const promptBanner = !cookies[consentCookieName] && !customizationPaneShowed;

        if (promptBanner) {
            dispatch(showCookieBanner());
        }
    }, [ cookies, dispatch, customizationPaneShowed ]);

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
            onExpandEffectiveConsent={ customize }
            effectiveConsent={ effectiveConsent }
        />
    </>;
}

export default AppCookieBanner;
