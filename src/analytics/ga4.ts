// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

/**
 * @module ga4
 * @description It provides an app-level Google Analytics 4 API.
 */

import { CookieConsent } from "@persistence/cookie-consent.ts";
import {
    booleanToPermission,
    GoogleAnalyticsConsentPermission,
    isAllowed,
    loadGoogleAnalyticsScript,
} from "@analytics/ga-lib.ts";

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
        return undefined;
    }
    return import.meta.env.VITE_ANALYTICS_GTAG_ID;
}

export function initializeGoogleAnalytics(gtagId: string) {
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
        "update",
        {
            "ad_user_data": "denied",
            "ad_personalization": "denied",
            "ad_storage": "denied",
            "analytics_storage": analyticsStorage,
            "wait_for_update": 500,
        },
    );

    if (isAllowed(analyticsStorage)) {
        loadGoogleAnalyticsScript(gtagId);
    }
}
