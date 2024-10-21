// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

export const cookiePolicyLink = "/legal/cookie-policy";

export type CookiePerPurpose
    = "essential"
    | "functional"
    | "analytical"
    | "targeting";

export type MathSweDomain
    = "mathswe.com"
    | "math.software"
    | "mathsoftware.engineer";

export const allMathSweDomains: MathSweDomain[] = [
    "mathswe.com",
    "math.software",
    "mathsoftware.engineer",
];

export const isMathSweDomain: (domain: string) => boolean =
    domain => allMathSweDomains
        .map(mathswe => JSON.stringify(mathswe))
        .includes(domain);

export const getMathSweProvider: (domain: MathSweDomain) => CookieProvider =
    domain => ({
        domain,
        privacyLink: "https://mathswe.com/legal/cookie-policy",
    });

export type CookieProvider = {
    domain: string;
    privacyLink: string;
}

export const cookieUsageHeaders = [
    "Cookie",
    "Description",
    "Provider",
    "Retention",
    "Purpose",
    "When Visiting",
];

export type CookieUsage = {
    cookie: string;
    description: string;
    provider: CookieProvider;
    retention: string;
    purpose: CookiePerPurpose;
    whenVisiting: MathSweDomain[];
}

export const getCookieUsages: (domain?: MathSweDomain) => CookieUsage[] =
    (domain = "mathswe.com") => [
        {
            cookie: "cookie-consent",
            description: `
                Stores the visitor's cookie consent with their preferences and consent ID. The cookie banner and customization pane needs it to work.
            `,
            provider: getMathSweProvider(domain),
            retention: "1 year",
            purpose: "essential",
            whenVisiting: allMathSweDomains,
        },
    ];

export const getCookiesByPurpose: (
    domain: MathSweDomain,
    purpose: CookiePerPurpose,
) => CookieUsage[] =
    (domain, purpose) => getCookieUsages(domain)
        .filter(cookie => cookie.purpose === purpose);

export const getFirstPartyCookies = () => getCookieUsages()
    .filter(cookie => isMathSweDomain(cookie.provider.domain));

export const essentialCookiesDesc = `
    These are necessary for the website or web app to function properly and do
    not require user consent. They typically store session information or user
    preferences. The website cannot be used properly without these strictly
    necessary cookies.
    `;

export const functionalCookiesDesc = `
    These enhance the website or web app performance as certain functions may
    not be available without them. They allow users to remember their
    preferences and settings, provide a personalized user experience, are
    anonymous, be first-party or set by third-party service providers, and do
    not track browsing activity across other websites.
`;

export const analyticalCookiesDesc = `
    These cookies collect data on how users interact with the website or web
    app, including metrics like page views, bounce rates, and traffic sources.
    They cannot be used to directly identify a certain visitor. They help
    website owners understand and improve site performance.
`;

export const targetingCookiesDesc = `
    These are used to identify visitors between different websites and may be
    used by companies to build a profile of visitor interests or show relevant
    ads on other websites, and are usually third-party. They are used on a
    limited basis, and we do not use them to serve third-party ads on our
    websites or web apps.
`;
