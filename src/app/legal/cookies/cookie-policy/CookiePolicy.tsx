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

function UpdatingPreferences() {
    return <>
        <h2>Updating your Cookie Preference</h2>

        <p>
            You can always set your consent via the Cookie Banner or
            Customization Pane.
        </p>

        <p>
            You can update your preferences by clicking the <strong>&quot;Cookie
            Preference&quot; button</strong> at the page footer. It will show
            the Cookie Banner, and if you want to open the Customization Pane,
            you can do it from the Banner.
        </p>

        <p>
            You can quickly set your choices with the Cookie Banner, while its
            Customization Pane shows you granular information and options.
        </p>

        <section>
            <h3>Cookie Consent Record</h3>

            <p>
                When you set your cookie preference, the system processes your
                request and gives an ID representing your consent. You can
                check your consent ID from the Cookie Banner and find more
                information from the Customization Pane.
            </p>

            <p>
                Storing consent proofs allows websites that use cookies to comply
                with data privacy laws, such as the GDPR.
            </p>
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

                        <div className="text-center">
                            <i>Cookie Policy under minor redaction
                                adjustments.
                            </i>
                        </div>
                        <div className="text-center">
                            <i>Last updated: 2024/05/14.</i>
                        </div>
                    </section>

                    <section>
                        <h2>Cookie Policy Updates</h2>

                        <p>
                            We may update this policy by posting the new version
                            here. Personal notifications are not provided, so
                            please check this page periodically. The effective
                            date is at the top.
                        </p>
                    </section>

                    <section>
                        <Cookies />
                    </section>

                    <section>
                        <UpdatingPreferences />
                    </section>
                </article>
            </main>
        </section>
    </>;
}

export default CookiePolicy;
