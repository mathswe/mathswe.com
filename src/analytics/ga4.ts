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
    GoogleAnalyticsConsentPermission,
    gtag,
    isInitialized,
    loadGoogleAnalyticsScript,
} from "@analytics/ga-lib.ts";

// https://support.google.com/tagmanager/answer/10718549
export interface GoogleAnalyticsConsent {
    analyticsStorage: GoogleAnalyticsConsentPermission;
    adUserData: GoogleAnalyticsConsentPermission;
    adPersonalization: GoogleAnalyticsConsentPermission;
    adStorage: GoogleAnalyticsConsentPermission;
    functionalityStorage: GoogleAnalyticsConsentPermission;
    personalizationStorage: GoogleAnalyticsConsentPermission;
    securityStorage: GoogleAnalyticsConsentPermission;
}

export function newGoogleAnalyticsConsent(
    {
        functional,
        analytics,
        targeting,
    }: CookieConsent,
): GoogleAnalyticsConsent {
    return {
        analyticsStorage: booleanToPermission(analytics),
        adUserData: booleanToPermission(targeting),
        adPersonalization: booleanToPermission(targeting),
        adStorage: booleanToPermission(targeting),
        functionalityStorage: booleanToPermission(functional),
        personalizationStorage: booleanToPermission(targeting),
        securityStorage: booleanToPermission(functional),
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

    gtag(
        "consent",
        "default",
        {
            "ad_user_data": consent?.adUserData ?? "denied",
            "ad_personalization": consent?.adPersonalization ?? "denied",
            "ad_storage": consent?.adStorage ?? "denied",
            "analytics_storage": consent?.analyticsStorage ?? "denied",
            "functionality_storage": consent?.functionalityStorage ?? "denied",
            "personalization_storage": consent?.personalizationStorage ?? "denied",
            "security_storage": consent?.securityStorage ?? "denied",
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
    {
        analyticsStorage,
        adUserData,
        adPersonalization,
        adStorage,
        functionalityStorage,
        personalizationStorage,
        securityStorage,
    }: GoogleAnalyticsConsent,
) {
    gtag(
        "consent",
        "update",
        {
            "ad_user_data": adUserData,
            "ad_personalization": adPersonalization,
            "ad_storage": adStorage,
            "analytics_storage": analyticsStorage,
            "functionality_storage": functionalityStorage,
            "personalization_storage": personalizationStorage,
            "security_storage": securityStorage,
        },
    );
}
