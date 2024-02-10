// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

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
                <strong>Analytical Cookies:</strong>
                &nbsp;
                These cookies collect data on how users interact with the
                website or web app, including metrics like page views, bounce
                rates, and traffic sources. They cannot be used to directly
                identify a certain visitor. They help website owners understand
                and improve site performance.
            </p>
        </section>
    </>;
}

function Cookies() {
    return <>
        <h2>Cookies</h2>

        <p>
            In optimizing product experience, we utilize cookies for specific
            functionalities. Cookies are compact text files stored on user
            devices.
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
            <CookieTypes></CookieTypes>
        </section>
    </>;
}

function Legal() {
    return <>
        <section className="main">
            <main>
                <article>
                    <section>
                        <h1>Legal</h1>
                    </section>

                    <section>
                        <Cookies></Cookies>
                    </section>
                </article>
            </main>
        </section>
    </>;
}

export default Legal;
