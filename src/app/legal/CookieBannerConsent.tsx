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

function newCookieConsent({ analytics }: CookiePref): CookieConsent {
    return {
        necessary: true,
        analytics: analytics ?? false,
    };
}

function CookieBannerConsent() {
    const showCookieBanner = useAppSelector(selectShow);
    const dispatch = useAppDispatch();
    const onCloseCookieBanner = () => { dispatch(hide()); };

    const [ cookieBannerOpened, setCookieBannerOpened ] = useState(false);
    const [ cookies, setCookie ] = useCookies([ consentCookieName ]);

    const [ pref, setPref ] = useState(defPref);

    const save = (pref: CookiePref) => {
        const consent = newCookieConsent(pref);
        const { cookieName, consentSer, options } = applyConsent(consent);

        setCookie(cookieName, consentSer, options);
    };

    useEffect(() => {
        const { analytics } = loadCookieConsent(cookies);

        setPref({ analytics });

        if (cookies["cookie-consent"]) {
            dispatch(hide());
        }
        else {
            dispatch(show());
        }
    }, [ cookies, dispatch ]);

    return <>
        { (cookieBannerOpened || showCookieBanner) &&
            <CookieBanner
                cookiePolicyLink={ cookiePolicyLink }
                pref={ pref }
                show={ showCookieBanner }
                onSave={ save }
                onOpen={ () => setCookieBannerOpened(true) }
                onClose={ onCloseCookieBanner }
                onClosed={ () => setCookieBannerOpened(false) }
            />
        }
    </>;
}

export default CookieBannerConsent;
