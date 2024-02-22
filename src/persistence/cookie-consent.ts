// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import { CookieSetOptions } from "universal-cookie";

export const consentCookieName = "cookie-consent";

export interface CookieConsent {
    necessary: boolean;
    analytics: boolean;
}

export const defConsent: CookieConsent = { necessary: true, analytics: false };

export interface AppliedConsent {
    cookieName: string;
    consentSer: string;
    options: CookieSetOptions;
}

export function loadCookieConsent(cookies: Record<string, Record<string, string> | undefined>): CookieConsent {
    if (!cookies[consentCookieName]) {
        return defConsent;
    }

    const consentCookie = cookies[consentCookieName];
    const getBoolean = (key: string) => consentCookie[key].toString() === "true";

    return {
        necessary: true,
        analytics: getBoolean("analytics"),
    };
}

export function applyConsent(consent: CookieConsent): AppliedConsent {
    return {
        cookieName: consentCookieName,
        consentSer: serialize(consent),
        options: {
            path: "/",
            expires: getExpirationFrom(new Date()),
            secure: true,
            sameSite: "strict",
        },
    };
}

function serialize(consent: CookieConsent) {
    return JSON.stringify(consent);
}

function getExpirationFrom(currentDate: Date) {
    return new Date(
        currentDate.getFullYear() + 1,
        currentDate.getMonth(),
        currentDate.getDate(),
    );
}
