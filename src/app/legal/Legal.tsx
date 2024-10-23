// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import Main from "@/components/Article/Main/Main";
import "./Legal.css";
import { Section } from "@components/Article/Section/Section.tsx";

function Legal() {
    return <>
        <Main article>
            <Section className="legal">
                <header>
                    <h1>Legal</h1>
                </header>
            </Section>

            <Section className="cookies">
                <h2>Cookies</h2>

                <p>
                    We use cookies to improve user experience.
                    Read our <a href="/legal/cookie-policy">
                    Cookie Policy</a> for
                    detailed information on how we use
                    cookies.
                </p>
            </Section>
        </Main>
    </>;
}

export default Legal;
