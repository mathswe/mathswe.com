// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import "../../Legal.css";
import { Table, TableRow } from "@ui/Table.tsx";
import { firstPartyCookies } from "../cookies.ts";

interface CookieUsageTableProps {
    rows: TableRow[];
}

function CookieUsageTable({ rows }: CookieUsageTableProps) {
    return <>
        <Table
            headers={ [
                "Cookie Name",
                "Purpose",
                "Retention Period",
                "Class",
                "When Visiting",
            ] }
            rows={ rows }
        />
    </>;
}

function CookiesUsed() {
    function FirstPartyCookies() {
        const cookies: TableRow[] = [
            { items: firstPartyCookies },
        ];

        return <>
            <h4>First-Party</h4>

            <CookieUsageTable rows={ cookies } />
        </>;
    }

    return <>
        <h3>Cookies Used</h3>

        <p>
            The specific cookies used across MathSwe websites or web apps are
            listed.
        </p>

        <section>
            <FirstPartyCookies />
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
                These are necessary for the website or web app to function
                properly and do not require user consent. They typically store
                session information or user preferences. The website cannot be
                used properly without these strictly necessary cookies.
            </p>
            <p>
                <strong>Functional Cookies:</strong>
                &nbsp;
                These enhance the website or web app performance as certain
                functions may not be available without them. They allow users to
                remember their preferences and settings, provide a personalized
                user experience, are anonymous, be first-party or set by
                third-party service providers, and do not track browsing
                activity across other websites. For example, cookies that
                remember user location, chosen language, or other settings, a
                live web chat platform, and optional security parameters like a
                single sign-on (SSO).
            </p>
            <p>
                <strong>Analytical Cookies:</strong>
                &nbsp;
                These cookies collect data on how users interact with the
                website or web app, including metrics like page views, bounce
                rates, and traffic sources. They cannot be used to directly
                identify a certain visitor. They help website owners understand
                and improve site performance.
            </p>
            <p>
                <strong>Targeting Cookies:</strong>
                &nbsp;
                These are used to identify visitors between different websites
                and may be used by companies to build a profile of visitor
                interests or show relevant ads on other websites, and are
                usually third-party. They are used on a limited basis, and we do
                not use them to serve third-party ads on our websites or web
                apps. For example, cookies installed by YouTube in videos
                embedded into our site to track their views and user
                preferences.
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
