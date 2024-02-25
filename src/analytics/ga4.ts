// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

/**
 * @module ga4
 * @description It provides an app-level Google Analytics 4 API. It
 * implements the Google consent mode:
 *     https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced.
 */

import { CookieConsent } from "@persistence/cookie-consent.ts";
import {
    booleanToPermission,
    GoogleAnalyticsConsentPermission, initModule,
    isInitialized,
    loadGoogleAnalyticsScript,
} from "@analytics/ga-lib.ts";

export interface GoogleAnalyticsConsent {
    analyticsStorage: GoogleAnalyticsConsentPermission;
}

export function newGoogleAnalyticsConsent({ analytics }: CookieConsent): GoogleAnalyticsConsent {
    return {
        analyticsStorage: booleanToPermission(analytics),
    };
}

/**
 * It loads the Google Tag ID for analytics configured for this app
 * environment, if any. It's only accepted for production and staging
 * environments.
 */
export function loadGoogleAnalyticsTagId(): string | undefined {
    const isSupportedEnv = (env: string) =>
        [ "production", "staging" ].includes(env);

    return isSupportedEnv(import.meta.env.MODE)
        ? import.meta.env.VITE_ANALYTICS_GTAG_ID
        : undefined;
}

/**
 * It sets up Google Analytics with consent mode. It sets the default gtag
 * command with denied or already-existing consent values stored in the user
 * device. This initialization should be called from the header (with SSR)
 * to set up GA to obtain the whole page load information. If it's called
 * later (from the body tag, CSR), initial information like bounce rates
 * won't be tracked, leading to missing information.
 *
 * It only runs once, disregarding if it's called more than once.
 *
 * @param gtagId Google Tag ID for this GA implementation
 * @param consent Consent loaded by the app if any (e.g., from exising
 * cookie consent)
 * @see loadGoogleAnalyticsTagId
 */
export function initializeGoogleAnalytics(
    gtagId: string,
    consent?: GoogleAnalyticsConsent,
) {
    if (isInitialized()) {
        return;
    }

    initModule();
    gtag(
        "consent",
        "default",
        {
            "ad_user_data": "denied",
            "ad_personalization": "denied",
            "ad_storage": "denied",
            "analytics_storage": consent?.analyticsStorage ?? "denied",
        },
    );

    loadGoogleAnalyticsScript(gtagId);

    gtag("js", new Date());
    gtag("config", gtagId);
}

/**
 * It updates the Google consent mode with dynamic user preferences. For
 * example, when the cookie banner is updated.
 */
export function updateGoogleAnalyticsConsent(
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
        },
    );
}
