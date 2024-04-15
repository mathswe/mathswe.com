// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import { CookieSetOptions } from "universal-cookie";
import { getAllDomainAndSubdomainsWildcard } from "@persistence/cookies.ts";
import { ClientCookieConsent } from "@app/legal/cookies/cookie-consent.ts";

export const consentCookieName = "cookie-consent";

export interface CookieConsent {
    essential: boolean;
    functional: boolean;
    analytical: boolean;
    targeting: boolean;
}

export const defConsent: CookieConsent = {
    essential: true,
    functional: false,
    analytical: false,
    targeting: false,
};

export interface AppliedConsent {
    cookieName: "cookie-consent";
    consentSer: string;
    options: CookieSetOptions;
}

export function loadCookieConsent(cookies: Record<string, Record<string, object> | undefined>): CookieConsent {
    if (!cookies[consentCookieName]) {
        return defConsent;
    }
    const consent = cookies[consentCookieName];

    if (!consent.pref) {
        return defConsent;
    }
    const pref = consent.pref as Record<string, string>;

    const getBoolean = (key: string) => pref[key]?.toString() === "true";

    return {
        essential: true,
        functional: getBoolean("functional"),
        analytical: getBoolean("analytical"),
        targeting: getBoolean("targeting"),
    };
}

export function applyConsent(consent: ClientCookieConsent): AppliedConsent {
    return {
        cookieName: consentCookieName,
        consentSer: serialize(consent),
        options: {
            domain: getAllDomainAndSubdomainsWildcard(),
            path: "/",
            expires: getExpirationFrom(new Date()),
            secure: true,
            sameSite: "strict",
        },
    };
}

function serialize(consent: ClientCookieConsent) {
    return JSON.stringify(consent);
}

function getExpirationFrom(currentDate: Date) {
    return new Date(
        currentDate.getFullYear() + 1,
        currentDate.getMonth(),
        currentDate.getDate(),
    );
}
