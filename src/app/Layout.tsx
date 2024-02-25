// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import Footer from "./Footer.tsx";
import { ReactNode, useEffect } from "react";
import CookieBannerConsent from "@app/legal/CookieBannerConsent.tsx";
import { useCookies } from "react-cookie";
import {
    consentCookieName,
    loadCookieConsent,
} from "@persistence/cookie-consent.ts";
import {
    initializeGoogleAnalytics,
    loadGoogleAnalyticsTagId,
    newGoogleAnalyticsConsent,
    updateGoogleAnalyticsConsent,
} from "@analytics/ga4.ts";

interface LayoutProps {
    children: ReactNode;
}

function Layout({ children }: LayoutProps) {
    const [ cookies ] = useCookies([ consentCookieName ]);

    useEffect(() => {
        const cookieConsent = loadCookieConsent(cookies);
        const googleConsent = newGoogleAnalyticsConsent(cookieConsent);
        const gtagId = loadGoogleAnalyticsTagId();

        if (gtagId) {
            initializeGoogleAnalytics(gtagId, googleConsent);
            updateGoogleAnalyticsConsent(googleConsent);
        }
    }, [ cookies ]);

    return <>
        { children }

        <Footer />

        <CookieBannerConsent />
    </>;
}

export default Layout;
