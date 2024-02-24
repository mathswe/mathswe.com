// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import ReactGA from "react-ga4";
import { CookieConsent } from "@persistence/cookie-consent.ts";

export interface GoogleAnalyticsConfig {
    id: string;
    analyticsStorageConsent: boolean;
}

export function newGoogleAnalyticsConfig(cookieConsent: CookieConsent): GoogleAnalyticsConfig | undefined {
    if (import.meta.env.MODE !== "production" && import.meta.env.MODE !== "staging") {
        return undefined;
    }
    const id = import.meta.env.VITE_ANALYTICS_GTAG_ID;
    return id ? { id, analyticsStorageConsent: cookieConsent.analytics } : undefined;
}

export function initializeGA4({ id, analyticsStorageConsent }: GoogleAnalyticsConfig) {
    const analyticsConsentValue = analyticsStorageConsent ? "granted" : "denied";

    if (analyticsStorageConsent) {
        ReactGA.initialize(id, {
            gtagOptions: [
                "consent",
                "update",
                {
                    analytics_storage: analyticsConsentValue,
                },
            ],
        });
    }
}
