// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import ReactGA from "react-ga4";
import { CookieConsent } from "@persistence/cookie-consent.ts";

export interface GoogleAnalyticsConfig {
    id: string;
    consent: boolean;
}

export function newGoogleAnalyticsConfig(cookieConsent: CookieConsent): GoogleAnalyticsConfig | undefined {
    const id = import.meta.env.VITE_ANALYTICS_GTAG_ID;
    return id ? { id, consent: cookieConsent.analytics } : undefined;
}

export function initializeGA4({ id }: GoogleAnalyticsConfig) {
    ReactGA.initialize(id);
}
