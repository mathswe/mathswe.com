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
    consentCookieName,
    CookieConsentPref,
    loadCookieConsent,
} from "@persistence/cookie-consent.ts";
import CookieCustomization, {
    CustomizationCookieUsage,
    Description,
} from "@ui/legal/CookieCustomization.tsx";
import {
    analyticalCookiesDesc,
    essentialCookiesDesc,
    functionalCookiesDesc,
    getCookiesByPurpose,
    isMathSweDomain,
    MathSweDomain,
    targetingCookiesDesc,
} from "@app/legal/cookies/cookies.ts";
import { requestConsent } from "@app/legal/cookies/cookie-consent.ts";
import {
    useCookieCustomization,
} from "@app/legal/cookies/CookieCustomization.tsx";

const cookiePolicyLink = "/legal/cookie-policy";

const cookieDescription: Description = {
    essentialCookies: essentialCookiesDesc,
    functionalCookies: functionalCookiesDesc,
    analyticalCookies: analyticalCookiesDesc,
    targetingCookies: targetingCookiesDesc,
};

const getCookieUsage: (domain: MathSweDomain) => CustomizationCookieUsage =
    domain => ({
        essential: getCookiesByPurpose(domain, "essential"),
    });

function newCookieConsent(
    {
        functional,
        analytical,
        targeting,
    }: CookiePref,
): CookieConsentPref {
    return {
        essential: true,
        functional: functional ?? false,
        analytical: analytical ?? false,
        targeting: targeting ?? false,
    };
}

function AppCookieBanner() {
    const [ onConsentApply, onConsentFail ] = useCookieCustomization();

    const showingCustomization = useAppSelector(selectShowingCustomization);
    const dispatch = useAppDispatch();

    const closeCustomization = () => { dispatch(hideCookieCustomization()); };

    const [ cookies ] = useCookies([ consentCookieName ]);

    const [ pref, setPref ] = useState(defPref);

    const [ domainName, setDomainName ] = useState("");

    const save = (pref: CookiePref) => {
        const consentPref = newCookieConsent(pref);

        requestConsent(consentPref)
            .then(onConsentApply, onConsentFail);
        closeCustomization();
    };

    const cookieUsage: CustomizationCookieUsage = isMathSweDomain(domainName)
        ? getCookieUsage(domainName as MathSweDomain)
        : getCookieUsage("mathswe.com");

    useEffect(() => {
        const { functional, analytical, targeting } = loadCookieConsent(cookies);

        setPref({ functional, analytical, targeting });
    }, [ cookies, dispatch ]);

    useEffect(() => setDomainName(import.meta.env.VITE_DOMAIN_NAME ?? ""), []);

    return <>
        <CookieCustomization
            domainName={ domainName }
            cookiePolicyLink={ cookiePolicyLink }
            cookieUsage={ cookieUsage }
            description={ cookieDescription }
            show={ showingCustomization }
            initialForm={ pref }
            onSave={ save }
            onClose={ closeCustomization }
        />
    </>;
}

export default AppCookieBanner;
