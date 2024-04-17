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
    getCookieConsentPref,
    loadCookieConsentMeta,
} from "@persistence/cookie-consent.ts";
import CookieCustomization, {
    CustomizationCookieUsage,
    Description,
    EffectiveConsent,
} from "@ui/legal/CookieCustomization.tsx";
import {
    analyticalCookiesDesc,
    cookiePolicyLink,
    essentialCookiesDesc,
    functionalCookiesDesc,
    getCookiesByPurpose,
    isMathSweDomain,
    MathSweDomain,
    targetingCookiesDesc,
} from "@app/legal/cookies/cookies.ts";
import {
    useCookieCustomization,
} from "@app/legal/cookies/CookieCustomization.tsx";

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

function AppCookieBanner() {
    const [ processConsent ] = useCookieCustomization();

    const showingCustomization = useAppSelector(selectShowingCustomization);
    const dispatch = useAppDispatch();

    const closeCustomization = () => { dispatch(hideCookieCustomization()); };

    const [ cookies ] = useCookies([ consentCookieName ]);

    const [ pref, setPref ] = useState(defPref);

    const [ domainName, setDomainName ] = useState("");

    const [ effectiveConsent, setEffectiveConsent ] = useState<EffectiveConsent | undefined>();

    const save = (newPref: CookiePref) => {
        processConsent(newPref);
        closeCustomization();
    };

    const cookieUsage: CustomizationCookieUsage = isMathSweDomain(domainName)
        ? getCookieUsage(domainName as MathSweDomain)
        : getCookieUsage("mathswe.com");

    useEffect(() => {
        const {
            functional,
            analytical,
            targeting,
        } = getCookieConsentPref(cookies);

        setPref({ functional, analytical, targeting });

        const meta = loadCookieConsentMeta(cookies);

        setEffectiveConsent(meta
            ? {
                consentId: meta.consentId,
                createdAt: meta.createdAt,
                geolocation: meta.geolocation,
            }
            : undefined,
        );
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
            effectiveConsent={ effectiveConsent }
        />
    </>;
}

export default AppCookieBanner;
