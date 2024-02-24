// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import { CookieConsent } from "@persistence/cookie-consent.ts";

export type GoogleAnalyticsConsentPermission = "denied" | "granted"

export function booleanToPermission(consent: boolean): GoogleAnalyticsConsentPermission {
    return consent ? "granted" : "denied";
}

export function isAllowed(permission: GoogleAnalyticsConsentPermission) {
    return permission === "granted";
}

export interface GoogleAnalyticsConsent {
    analyticsStorage: GoogleAnalyticsConsentPermission;
}

export const defaultGoogleAnalyticsConsent: GoogleAnalyticsConsent = { analyticsStorage: "denied" };

export function newGoogleAnalyticsConsent({ analytics }: CookieConsent): GoogleAnalyticsConsent {
    return {
        analyticsStorage: booleanToPermission(analytics),
    };
}

export function loadGoogleAnalyticsTagId(): string | undefined {
    if (import.meta.env.MODE !== "production" && import.meta.env.MODE !== "staging") {
        // return undefined;
    }
    return import.meta.env.VITE_ANALYTICS_GTAG_ID;
}

declare global {
    interface Window {
        dataLayer: (object | string)[][];
    }
}

export function initializeGoogleAnalytics(gtagId: string) {
    window.dataLayer = window.dataLayer || [];

    gtag(
        "consent",
        "default",
        {
            "ad_user_data": "denied",
            "ad_personalization": "denied",
            "ad_storage": "denied",
            "analytics_storage": "denied",
            "wait_for_update": 500,
        },
    );
    gtag("js", new Date());
    gtag("config", gtagId);
}

export function updateGoogleAnalyticsConsent(
    gtagId: string,
    { analyticsStorage }: GoogleAnalyticsConsent,
) {
    gtag(
        "consent",
        "update", {
            "ad_user_data": "denied",
            "ad_personalization": "denied",
            "ad_storage": "denied",
            "analytics_storage": analyticsStorage,
            "wait_for_update": 500,
        },
    );

    if (isAllowed(analyticsStorage)) {
        loadGtagScript(gtagId);
    }
}

function gtag(...args: (object | string)[]) {
    window.dataLayer.push(args);
}

function loadGtagScript(gtagId: string) {
    const gtagScript = document.createElement("script");
    gtagScript.async = true;
    gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=" + gtagId;

    const firstScript = document.getElementsByTagName("script")[0];
    firstScript?.parentNode?.insertBefore(gtagScript, firstScript);
}
