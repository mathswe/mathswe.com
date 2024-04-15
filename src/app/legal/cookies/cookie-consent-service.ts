// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import {
    ClientCookieConsent,
    CookieConsentPref,
} from "@persistence/cookie-consent.ts";
import { CookiePref } from "@ui/legal/cookie-pref.ts";

export function newCookieConsent(
    {
        functional,
        analytical,
        targeting,
    }: CookiePref,
): CookieConsentPref {
    return {
        essential: true,
        functional: functional ?? false,
        analytical: analytical ?? false,
        targeting: targeting ?? false,
    };
}

export function requestConsent(pref: CookieConsentPref): Promise<ClientCookieConsent> {
    const url = getServiceUrl();

    return url
        ? postCookieConsent(pref, url)
        : Promise.reject("App failure to load environment variable");
}

function postCookieConsent(
    pref: CookieConsentPref,
    baseUrl: string,
): Promise<ClientCookieConsent> {
    const url = `${ baseUrl }/`;
    const method = "POST";
    const body = JSON.stringify(pref);

    return fetch(url, { method, body })
        .then(okOr("Fail to request cookie consent"))
        .then(res => res.json() as Promise<ClientCookieConsent>);
}

function getServiceUrl(): string | undefined {
    const hostname = import.meta.env.VITE_COOKIE_CONSENT_HOSTNAME;

    if (hostname?.includes("localhost")) {
        return `http://${ hostname }`;
    }
    return hostname ? `https://${ hostname }` : undefined;
}

async function badHttpCodeMsg(msg: string, res: Response): Promise<string> {
    const reason = await res.text();

    return `${ msg }: HTTP status code ${ res.status }. ${ reason }`;
}

const okOr: (msg: string) => (res: Response) => Promise<Response> | Promise<never> = msg => async res => res.ok
    ? res
    : Promise.reject(await badHttpCodeMsg(msg, res));

// const reject: (msg: string) => (reason: unknown) => Promise<never>
//     = msg => reason => Promise.reject(`${ msg }: ${ JSON.stringify(reason)
// }`);
