// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

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
    return id ? {
        id,
        analyticsStorageConsent: cookieConsent.analytics,
    } : undefined;
}

declare global {
    interface Window {
        dataLayer: (object | string)[][];
    }
}

export function initializeGA4(
    {
        id,
        analyticsStorageConsent,
    }: GoogleAnalyticsConfig) {
    const tagId = import.meta.env.VITE_ANALYTICS_GTAG_ID;
    const analyticsConsentValue = analyticsStorageConsent ? "granted" : "denied";

    window.dataLayer = window.dataLayer || [];

    function gtag(...args: (object | string)[]) { window.dataLayer.push(args); }

    gtag(
        "consent",
        "default", {
            "ad_user_data": "denied",
            "ad_personalization": "denied",
            "ad_storage": "denied",
            "analytics_storage": "denied",
            "wait_for_update": 500,
        },
    );
    gtag("js", new Date());
    gtag("config", tagId ?? "");

    if (analyticsStorageConsent) {
        gtag("consent", "update", {
            ad_user_data: "granted",
            ad_personalization: "granted",
            ad_storage: "granted",
            analytics_storage: "granted",
        });

        // Load gtag.js script.
        const gtagScript = document.createElement("script");
        gtagScript.async = true;
        gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=" + tagId;

        const firstScript = document.getElementsByTagName("script")[0];
        firstScript?.parentNode?.insertBefore(gtagScript, firstScript);
    }
}
