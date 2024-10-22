// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import "../../Legal.css";
import "./CookiePolicy.css";
import { baseDomains } from "@app/legal/cookies/cookie-policy/domains.ts";
import Main from "@components/Article/Main/Main.tsx";
import { Section } from "@components/Article/Section/Section.tsx";
import { Table } from "@components/Table/Table.tsx";
import CookieUsageTable from "@ui/legal/CookieUsageTable.tsx";
import {
    analyticalCookiesDesc,
    essentialCookiesDesc,
    functionalCookiesDesc,
    getFirstPartyCookies,
    getGoogleCookies,
    targetingCookiesDesc,
} from "../cookies.ts";

function CookiePolicyAbstract() {
    return <>
        <h1>Cookie Policy</h1>

        <p>
            In optimizing product experience, we utilize cookies
            for specific functionalities.
        </p>

        <div className="text-center">
            <i>Cookie Policy under minor redaction
               adjustments.
            </i>
        </div>
        <div className="text-center">
            <i>Last updated: 2024/05/14.</i>
        </div>
    </>;
}

function CookiePolicyUpdates() {
    return <>
        <h2>Cookie Policy Updates</h2>

        <p>
            We may update this policy by posting the new version
            here. Personal notifications are not provided, so
            please check this page periodically. The effective
            date is at the top.
        </p>
    </>;
}

function Cookies() {
    return <>
        <h2>Cookies</h2>

        <p>
            Cookies are compact text files stored on user devices.
        </p>

        <p>
            Two cookie definitions follow next to learn more.
        </p>

        <p>From Google:</p>

        <blockquote>
            <p>
                Cookies are small pieces of text sent to your browser by a
                website you visit. They help that website remember information
                about your visit, which can both make it easier to visit the
                site again and make the site more useful to you.
            </p>

            <p>
                Source: How Google Uses Cookies | Google
            </p>
        </blockquote>

        <p>From the GDPR (General Data Protection Regulation):</p>

        <blockquote>
            <p>
                Cookies are an important tool that can give businesses a great
                deal of insight into their users’ online activity.
            </p>

            <p>
                Cookies are small text files that websites place on your device
                as you are browsing. They are processed and stored by your web
                browser.
            </p>

            <p>
                Source: Cookies, the GDPR, and the ePrivacy Directive | GDPR.eu
            </p>
        </blockquote>

        <p>
            You can read the GDPR cookies page to&nbsp;
            <a
                href="https://gdpr.eu/cookies"
                target="_blank"
                rel="noreferrer"
            >
                learn more about cookies
            </a> and their types.
        </p>
    </>;
}

function CookieTypes() {
    return <>
        <h3>Cookie Types</h3>

        <p>
            A brief framework of cookie types related to this notice is given to
            understand their purpose.
        </p>
    </>;
}

function CookieByDomain() {
    return <>
        <h4>Cookies by Domain</h4>
        <p>
            <strong>First-Party Cookies:</strong>
            &nbsp;
            These are set by the domain you are visiting and are often used
            for essential functionality, such as secure log-in and
            preference settings.
        </p>
        <p>
            <strong>Third-Party Cookies:</strong>
            &nbsp;
            These are set by domains other than the one you are visiting and
            are often used for analytical purposes.
        </p>
    </>;
}

function CookieByPurpose() {
    return <>
        <h4>Cookies by Purpose</h4>

        <p>
            Cookies are used for various purposes or categories.
        </p>

        <p>
            <strong>Essential Cookies:</strong>
            &nbsp;
            { essentialCookiesDesc }
        </p>
        <p>
            <strong>Functional Cookies:</strong>
            &nbsp;
            { functionalCookiesDesc }
            For example, cookies that remember user location, chosen
            language, or other settings, a live web chat platform, and
            optional security parameters like a single sign-on (SSO).
        </p>
        <p>
            <strong>Analytical Cookies:</strong>
            &nbsp;
            { analyticalCookiesDesc }
        </p>
        <p>
            <strong>Targeting Cookies:</strong>
            &nbsp;
            { targetingCookiesDesc }
            For example, cookies installed by YouTube in videos embedded
            into our site to track their views and user preferences.
        </p>
    </>;
}

function UpdatingPreferences() {
    return <>
        <h2>Updating your Cookie Preference</h2>

        <p>
            You can always set your consent via the Cookie Banner or
            Customization Pane.
        </p>

        <p>
            You can update your preferences by clicking the <strong>&quot;Cookie
                                                                          Preference&quot; button</strong> at
            the page footer. It will show
            the Cookie Banner, and if you want to open the Customization Pane,
            you can do it from the Banner.
        </p>

        <p>
            You can quickly set your choices with the Cookie Banner, while its
            Customization Pane shows you granular information and options.
        </p>
    </>;
}

function CookiesUsed() {
    function MathSweDomains() {
        const tableRows: string[][] = [];

        for (const baseDomain in baseDomains) {
            const subdomains = baseDomains[baseDomain as keyof typeof baseDomains]
                .map(domain => {
                    const parts = domain.split(".");
                    return parts.length > 2 ? parts[0] : "";
                }).filter(subdomain => subdomain);

            tableRows.push([ baseDomain, subdomains.join(", ") ]);
        }

        return <>
            <h3>MathSwe Domains</h3>

            MathSwe domains with their respective subdomains follow.

            <div className="mt-2">
                <Table
                    headers={ [ "Domain", "Subdomains" ] } rows={ tableRows }
                />
            </div>

            <p>
                For example, <code>rsm.math.software</code> is a subdomain
                of <code>math.software</code>.
            </p>

            <p>
                When a domain and all its subdomains use a cookie, then
                a <code>*.</code> wildcard will denote them. For
                example, <code>*.math.software</code> defines <code>math.software</code> and
                all its subdomains.
            </p>

            <p>
                The given domains, subdomains, and wildcard ({ "\"*.\"" }) allow
                denoting the websites or web apps using a particular cookie.
            </p>
        </>;
    }

    function FirstPartyCookies() {
        const rows = getFirstPartyCookies();

        return <>
            <h3>First-Party Cookies</h3>

            <CookieUsageTable
                mathsweBaseDomains={ baseDomains }
                rows={ rows }
            />
        </>;
    }

    function GoogleCookies() {
        const rows = getGoogleCookies();

        return <>
            <h5>Cookies set by Google</h5>

            <CookieUsageTable
                mathsweBaseDomains={ baseDomains }
                rows={ rows }
            />
        </>;
    }

    return <>
        <h2>Cookies Used</h2>

        <p>
            The specific cookies used across MathSwe websites or web apps are
            listed.
        </p>

        <section>
            <MathSweDomains />
        </section>

        <section className="cookies-used">
            <FirstPartyCookies />

            <section>
                <h4>Cookies set by Third-Parties</h4>

                <p>
                    The following cookies are stored as first-party but set and
                    managed by third-party providers.
                </p>

                <section>
                    <GoogleCookies />
                </section>
            </section>
        </section>
    </>;
}

function ConsentRecordData() {
    return <>
        <ul>
            <li>
                <b>ID:</b> Universal unique ID the system assigns to each cookie
                           consent record.
            </li>
            <li>
                <b>Domain:</b> The MathSwe website/web app that requests your
                               cookie consent.
            </li>
            <li>
                <b>Preference:</b> Cookies you choose in the banner per purpose
                                   (functional, analytical, and targeting).
            </li>
            <li>
                <b>Creation Date:</b> When the server made the consent
                                      effective (i.e., when you set your
                                      preference). Further, it is
                                      crucial when deducing the information,
                                      like the effective cookie
                                      policy at that time, that the site
                                      presents to you when giving
                                      consent.
            </li>
            <li>
                <b>Geolocation:</b> Includes the time zone, country, city, and
                                    region/region code to know the cookie laws
                                    that apply to your
                                    place.
            </li>
            <li>
                <b>Anonymous IP:</b> Your IPv4 address with the last digit
                                     anonymized. For example, the
                                     IP <code>x.y.z.w</code> becomes <code>x.y.z.0</code> to
                                     minimize
                                     the data collected. Handling the full IP is
                                     avoided in the
                                     process as much as possible.
            </li>
            <li>
                <b>User Agent:</b> Your browser user agent.
            </li>
        </ul>
    </>;
}

function CookieConsentRecord() {
    return <>
        <h2>Cookie Consent Record</h2>

        <p>
            When you set your cookie preference, the system processes your
            request and gives an ID representing your consent. You can
            check your consent ID from the Cookie Banner and find more
            information from the Customization Pane.
        </p>

        <p>
            The purpose of consent records is not to collect personal data but
            to store the record when you give consent, so we comply with data
            regulations, like the GDPR. Consent records minimize the data
            stored as much as possible to avoid collecting personal data.
        </p>

        <div>
            The consent record consists of:

            <ConsentRecordData />
        </div>

        <p>
            The consent proof shows there is a process where you give
            consent transparently.
        </p>

        <p>
            The website/web app stores the server response after making your
            consent effective in the <code>cookie-consent</code> cookie
            to remember it, as described above in the first-party cookies.
        </p>

        <p>
            The information stored in your browser (
            <code>cookie-consent</code>) is the consent ID, preference,
            creation date, and geolocation.
        </p>

        <p>
            Storing consent proofs allows websites that use cookies to
            comply with data privacy laws, such as the GDPR.
        </p>
    </>;
}

function ArticleTree() {
    return <>
        <Section className="cookie-policy">
            <CookiePolicyAbstract />

            <section>
                <CookiePolicyUpdates />
            </section>

            <section>
                <Cookies />

                <section>
                    <CookieTypes />

                    <section>
                        <CookieByDomain />
                    </section>

                    <section>
                        <CookieByPurpose />
                    </section>
                </section>
            </section>

            <section>
                <UpdatingPreferences />
            </section>

            <section>
                <CookiesUsed />
            </section>

            <section>
                <CookieConsentRecord />
            </section>
        </Section>
    </>;
}

function CookiePolicy() {
    return <>
        <Main article>
            <ArticleTree />
        </Main>
    </>;
}

export default CookiePolicy;
