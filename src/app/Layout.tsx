// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import Footer from "./Footer.tsx";
import { ReactNode, useEffect } from "react";
import AppCookieBanner from "@app/legal/AppCookieBanner.tsx";
import {
    initializeGoogleAnalytics,
    loadGoogleAnalyticsTagId,
    newGoogleAnalyticsConsent,
    updateGoogleAnalyticsConsent,
} from "@analytics/ga4.ts";
import { useCookies } from "react-cookie";
import {
    consentCookieName,
    loadCookieConsent,
} from "@persistence/cookie-consent.ts";

interface LayoutProps {
    children: ReactNode;
}

function Layout({ children }: LayoutProps) {
    const [ cookies ] = useCookies([ consentCookieName ]);

    useEffect(() => {
        const cookieConsent = loadCookieConsent(cookies);
        const consent = newGoogleAnalyticsConsent(cookieConsent);
        const gtagId = loadGoogleAnalyticsTagId();

        if (gtagId) {
            initializeGoogleAnalytics(gtagId, consent);
            updateGoogleAnalyticsConsent(consent);
        }
    }, [ cookies ]);

    return <>
        { children }

        <Footer />

        <AppCookieBanner />
    </>;
}

export default Layout;
