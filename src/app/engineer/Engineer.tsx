// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import { SubHeading } from "@components/Article/Heading/Heading.tsx";
import { Section } from "@components/Article/Section/Section.tsx";

export const Engineer = () => <>
    <Section className="msw">
        <SubHeading
            id="engineer"
            title="Engineer"
            icon={ { name: "Engineer", src: "/mathswe.svg" } }
        />

        <p>Mathematical Software Engineer</p>

        <p>
            MSW Engineer is the home for essential founder works, focused on
            studying, researching, developing, and publishing articles and
            PR/Release blogs.
        </p>

        <p>
            <div>
                <a
                    rel="noreferrer"
                    target="_blank"
                    href="https://mathsoftware.engineer"
                >
                    Math Software Engineer
                </a>
            </div>

            <div>
                <a
                    rel="noreferrer"
                    target="_blank"
                    href="https://me.mathsoftware.engineer"
                >
                    Tobias Briones | My Page
                </a>
            </div>

            <div>
                <a
                    rel="noreferrer"
                    target="_blank"
                    href="https://blog.mathsoftware.engineer"
                >
                    Blog
                </a>
            </div>
        </p>
    </Section>
</>;
