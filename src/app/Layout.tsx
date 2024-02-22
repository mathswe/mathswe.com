// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import CookieBanner, { CookiePref, defPref } from "@ui/legal/CookieBanner.tsx";
import Footer from "./Footer.tsx";
import { ReactNode, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks.ts";
import { hide, selectShow, show } from "./cookies-slice.ts";
import { useCookies } from "react-cookie";

const cookiePolicyLink = "/legal#cookies";

interface LayoutProps {
    children: ReactNode;
}

interface CookieConsent {
    necessary: boolean;
    analytics: boolean;
}

function newCookieConsent({ analytics }: CookiePref): CookieConsent {
    return {
        necessary: true,
        analytics: analytics ?? false,
    };
}

function serialize(consent: CookieConsent) {
    return JSON.stringify(consent);
}

function getExpirationFrom(currentDate: Date) {
    return new Date(
        currentDate.getFullYear() + 1,
        currentDate.getMonth(),
        currentDate.getDate(),
    );
}

const consentCookieName = "cookie-consent";

function loadCookieConsent(cookies: Record<string, Record<string, string>>): CookiePref {
    const consentCookie = cookies[consentCookieName];
    const getBoolean = (key: string) => consentCookie[key].toString() === "true";

    return {
        analytics: getBoolean("analytics"),
    };
}

function CookieBannerLayout() {
    const showCookieBanner = useAppSelector(selectShow);
    const dispatch = useAppDispatch();
    const onCloseCookieBanner = () => { dispatch(hide()); };

    const [ cookieBannerOpened, setCookieBannerOpened ] = useState(false);
    const [ cookies, setCookie ] = useCookies([ consentCookieName ]);

    const [ pref, setPref ] = useState(defPref);

    const saveCookieConsent = (pref: CookiePref) => {
        const consent = newCookieConsent(pref);

        setCookie(
            consentCookieName,
            serialize(consent),
            {
                path: "/",
                expires: getExpirationFrom(new Date()),
                secure: true,
                sameSite: "strict",
            },
        );
    };

    useEffect(() => {
        setPref(loadCookieConsent(cookies));

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
                onSave={ saveCookieConsent }
                onOpen={ () => setCookieBannerOpened(true) }
                onClose={ onCloseCookieBanner }
                onClosed={ () => setCookieBannerOpened(false) }
            />
        }
    </>;
}

function Layout({ children }: LayoutProps) {
    return <>
        { children }

        <Footer />

        <CookieBannerLayout />
    </>;
}

export default Layout;
