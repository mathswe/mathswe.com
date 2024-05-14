// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import "../../Legal.css";
import "./CookiePolicy.css";
import {
    analyticalCookiesDesc,
    essentialCookiesDesc,
    functionalCookiesDesc,
    getFirstPartyCookies,
    getGoogleCookies,
    targetingCookiesDesc,
} from "../cookies.ts";
import CookieUsageTable from "@ui/legal/CookieUsageTable.tsx";

function CookiesUsed() {
    function FirstPartyCookies() {
        const rows = getFirstPartyCookies();

        return <>
            <h4>First-Party</h4>

            <CookieUsageTable rows={ rows } />
        </>;
    }

    function GoogleCookies() {
        const rows = getGoogleCookies();

        return <>
            <h4>Cookies set by Google</h4>

            <CookieUsageTable rows={ rows } />
        </>;
    }

    return <>
        <h3>Cookies Used</h3>

        <p>
            The specific cookies used across MathSwe websites or web apps are
            listed.
        </p>

        <section className="cookies-used">
            <FirstPartyCookies />

            <GoogleCookies />
        </section>
    </>;
}

function CookieTypes() {
    return <>
        <h3>Cookie Types</h3>

        <p>
            A brief framework of cookie types related to this notice is given to
            understand their purpose.
        </p>

        <section>
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
        </section>

        <section>
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
        </section>
    </>;
}

function Cookies() {
    return <>
        <h2>Cookies</h2>

        <p>
            Cookies are compact text files stored on user devices.
        </p>

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

        <p>
            You can read the Google cookie policies page to&nbsp;
            <a
                href="https://policies.google.com/technologies/cookies"
                target="_blank"
                rel="noreferrer"
            >
                learn about cookies
            </a>
            , and their usage.
        </p>

        <section>
            <CookieTypes />
        </section>

        <section>
            <CookiesUsed />
        </section>
    </>;
}

function CookiePolicy() {
    return <>
        <section className="main">
            <main>
                <article>
                    <section>
                        <h1>Cookie Policy</h1>

                        <p>
                            In optimizing product experience, we utilize cookies
                            for specific functionalities.
                        </p>
                    </section>

                    <section>
                        <Cookies />
                    </section>
                </article>
            </main>
        </section>
    </>;
}

export default CookiePolicy;
