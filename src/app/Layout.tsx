// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import Footer from "./Footer.tsx";
import { ReactNode } from "react";
import CookieBannerConsent from "@app/legal/CookieBannerConsent.tsx";

interface LayoutProps {
    children: ReactNode;
}

function Layout({ children }: LayoutProps) {
    // const [ cookies ] = useCookies([ consentCookieName ]);

    // useEffect(() => {
    //     const gtagId = loadGoogleAnalyticsTagId();
    //
    //     if (gtagId) {
    //         // initializeGoogleAnalytics(gtagId);
    //     }
    // }, []);
    //
    // useEffect(() => {
    //     // const cookieConsent = loadCookieConsent(cookies);
    //     // const googleConsent = newGoogleAnalyticsConsent(cookieConsent);
    //     const gtagId = loadGoogleAnalyticsTagId();
    //
    //     if (gtagId) {
    //         // updateGoogleAnalyticsConsent(gtagId, googleConsent);
    //     }
    // }, [ cookies ]);

    return <>
        { children }

        <Footer />

        <CookieBannerConsent />
    </>;
}

export default Layout;
