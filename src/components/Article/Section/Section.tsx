// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: BSD-3-Clause
// This file is part of https://github.com/mathswe-ops/templates

import "./Section.css"
import { Wrap } from "@components/Article/Section/Wrap.tsx";
import { PropsWithChildren, ReactNode } from "react";

type Wrapping = "wrap" | "none"

type SectionProps = PropsWithChildren & {
    className: string,
    bg?: boolean,
    wrap?: Wrapping,
}

export const Section = ({ children, className, bg, wrap }: SectionProps) => {
    const withWrap = () => <Wrap>{ children }</Wrap>;

    const noWrap = () => <>{ children }</>;

    const withBackground = (bgChildren: ReactNode) => <>
        <div className="bg">
            { bgChildren }
        </div>
    </>;

    const applyWrap = wrap === "none" ? noWrap() : withWrap();

    const sectionChildren
        = bg === true
          ? withBackground(applyWrap)
          : applyWrap;

    return <>
        <section className={ className }>
            { sectionChildren }
        </section>
    </>;
};
