// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

/**
 * @module ga-lib
 * @description It provides type-safe low-level Google Analytics 4 definitions
 *     and functionalities.
 * @requires ReactGA
 */

import ReactGA from "react-ga4";

export type GoogleAnalyticsConsentPermission = "denied" | "granted"

export function booleanToPermission(consent: boolean): GoogleAnalyticsConsentPermission {
    return consent ? "granted" : "denied";
}

export function isAllowed(permission: GoogleAnalyticsConsentPermission) {
    return permission === "granted";
}

export function gtag<Command extends keyof Gtag.GtagCommands>(command: Command, ...args: Gtag.GtagCommands[Command]) {
    ReactGA.gtag(command, args);
}

export function loadGoogleAnalyticsScript(gtagId: string) {
    ReactGA.initialize(gtagId);
}

export function isInitialized() {
    return ReactGA.isInitialized;
}
