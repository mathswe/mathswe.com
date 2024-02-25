// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

/**
 * @module ga-lib
 * @description It provides type-safe low-level Google Analytics 4 definitions
 *     and functionalities. IMPORTANT: This module must be loaded before
 *     using GA because it loads the gtag function implementation.
 * @requires ReactGA
 */

import ReactGA from "react-ga4";

initModule();

export type GoogleAnalyticsConsentPermission = "denied" | "granted"

export function booleanToPermission(consent: boolean): GoogleAnalyticsConsentPermission {
    return consent ? "granted" : "denied";
}

export function isAllowed(permission: GoogleAnalyticsConsentPermission) {
    return permission === "granted";
}

export function loadGoogleAnalyticsScript(gtagId: string) {
    ReactGA.initialize(gtagId);
}

function initModule() {
    // Must initialize the gtag global function as soon as possible, since it's
    // automatically assumed by the Gtag type definitions.
    ReactGA.gtag();
}
