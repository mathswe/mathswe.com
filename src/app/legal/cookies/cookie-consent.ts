// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import { CookieConsent } from "@persistence/cookie-consent.ts";

export interface ClientCookieConsent {
    id: string;
    pref: CookieConsent;
    createdAt: Date;
    geolocation: Geolocation;
}

export interface Geolocation {
    timeZone: string;
    country?: string;
    city?: string;
    region?: string;
    regionCode?: string;
}

export function requestConsent(pref: CookieConsent): Promise<ClientCookieConsent> {
    const url = getServiceUrl();

    return url
        ? postCookieConsent(pref, url)
        : Promise.reject("App failure to load environment variable");
}

function postCookieConsent(
    pref: CookieConsent,
    url: string,
): Promise<ClientCookieConsent> {
    const method = "POST";
    const body = JSON.stringify(pref);
    const headers = {
        "Content-Type": "application/json",
    };

    return fetch(url, { method, body, headers })
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

const okOr: (msg: string) => (res: Response) => Response | Promise<never> = msg => res => res.ok
    ? res
    : Promise.reject(`${ msg }: Status ${ res.statusText }`);

// const reject: (msg: string) => (reason: unknown) => Promise<never>
//     = msg => reason => Promise.reject(`${ msg }: ${ JSON.stringify(reason) }`);
