// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import mathIcon from "@app/assets/math.svg";
import mathsweOpsIcon from "@app/assets/mathswe-ops.png";
import mswIcon from "@app/assets/msw.svg";
import repsymoIcon from "@app/assets/repsymo.png";
import texsydoIcon from "@app/assets/texsydo.svg";
import { SubHeading } from "@components/Article/Heading/Heading.tsx";
import { Section } from "@components/Article/Section/Section.tsx";
import { GridItem } from "@ui/grid/GridItem.ts";
import GridItems from "@ui/grid/GridItems.tsx";

const gridItems: GridItem[] = [
    {
        icon: mathIcon,
        title: "Math",
        description: "Modern Mathematics",
        content: "Math will provide safe languages to formalize mathematics as software.",
        link: "https://math.software",
    },
    {
        icon: texsydoIcon,
        title: "Texsydo",
        description: "Textual System Documenting",
        content: "Texsydo aims to provide mathematical text and art to optimize demanding communication from mathematics to engineering.",
        link: "https://tsd.math.software",
    },
    {
        icon: repsymoIcon,
        title: "Repsymo",
        description: "Representational System Modeling",
        content: "Repsymo aims to solve domain-specific models with granular representation standards.",
        link: "https://rsm.math.software",
    },
    {
        icon: mathsweOpsIcon,
        title: "MathSwe Operations",
        description: "Special Software and Models",
        content: "MathSwe Ops equips all the tools and operations extrinsic to mathematics to materialize mathematical software.",
        link: "https://ops.math.software",
    },
];

export const Msw = () => <>
    <Section className="msw">
        <SubHeading
            id="msw"
            title="MSW"
            icon={ { name: "MSW", src: mswIcon } }
        />

        <p>Mathematical Software</p>

        <GridItems items={ gridItems } />
    </Section>
</>;
