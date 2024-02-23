// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import Footer from "./Footer.tsx";
import { ReactNode, useEffect } from "react";
import CookieBannerConsent from "@app/legal/CookieBannerConsent.tsx";
import { initializeGA4, newGoogleAnalyticsConfig } from "@analytics/ga4.ts";
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
        const gaConfig = newGoogleAnalyticsConfig(cookieConsent);

        console.log(gaConfig);
        if (gaConfig) {
            initializeGA4(gaConfig);
        }
    }, [ cookies ]);

    return <>
        { children }

        <Footer />

        <CookieBannerConsent />
    </>;
}

export default Layout;
