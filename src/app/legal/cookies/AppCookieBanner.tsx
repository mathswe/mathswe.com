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
    consentCookieName,
    loadCookieConsent,
    loadCookieConsentMeta,
} from "@persistence/cookie-consent.ts";
import { cookiePolicyLink } from "@app/legal/cookies/cookies.ts";
import {
    newCookieConsentPref,
    requestConsent,
} from "@app/legal/cookies/cookie-consent-service.ts";
import {
    useCookieCustomization,
} from "@app/legal/cookies/CookieCustomization.tsx";

function AppCookieBanner() {
    const [ onConsentApply, onConsentFail ] = useCookieCustomization();

    const showingBanner = useAppSelector(selectShowingBanner);
    const showingCustomizationPane = useAppSelector(selectShowingCustomization);
    const dispatch = useAppDispatch();

    const closeBanner = () => { dispatch(hideCookieBanner()); };

    const [ cookies ] = useCookies([ consentCookieName ]);

    const [ pref, setPref ] = useState(defPref);

    const [ domainName, setDomainName ] = useState("");

    const [ effectiveConsent, setEffectiveConsent ] = useState<string | undefined>();

    const save = (pref: CookiePref) => {
        const consentPref = newCookieConsentPref(pref);

        requestConsent(consentPref)
            .then(onConsentApply, onConsentFail);
        closeBanner();
    };

    const customize = () => {
        closeBanner();
        dispatch(showCookieCustomization());
    };

    useEffect(() => {
        const {
            functional,
            analytical,
            targeting,
        } = loadCookieConsent(cookies);

        setPref({ functional, analytical, targeting });

        const meta = loadCookieConsentMeta(cookies);

        setEffectiveConsent(meta ? meta.consentId : undefined);

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
            onExpandEffectiveConsent={ customize }
            effectiveConsent={ effectiveConsent }
        />
    </>;
}

export default AppCookieBanner;
