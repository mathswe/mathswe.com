// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: BSD-3-Clause
// This file is part of https://github.com/mathswe-ops/templates

import { JSX } from "react";

export type Icon = {
    src: string,
    name: string,
}

type HeadingProps = {
    id: string,
    title: string,
    icon: Icon,
}

type SubHeadingProps = {
    id: string,
    title: string,
    icon?: Icon,
}

type SubSubHeadingProps = {
    id: string,
    title: string,
}

function getHeadingClass(heading: JSX.Element) {
    const name = heading.type as string;

    if (name === "h2") {
        return "heading";
    }
    else {
        return "subheading";
    }
}

function HeadingCard(heading: JSX.Element, id: string, icon?: Icon) {
    const hClass = getHeadingClass(heading);
    const classes = `navbar-brand nav-link flex-fill p-0 ${ hClass }`;

    return <>
        <a
            className={ classes }
            href={ `#${ id }` }
        >
            { heading }
            { icon !== undefined &&
              <img
                  src={ icon.src }
                  alt={ icon.name }
                  className="nav-icon"
              /> }
        </a>
    </>;
}

export function Heading({ id, title, icon }: HeadingProps) {
    return HeadingCard(<h2>{ title }</h2>, id, icon);
}

export function SubHeading({ id, title, icon }: SubHeadingProps) {
    return HeadingCard(<h3>{ title }</h3>, id, icon);
}

export function SubSubHeading({ id, title }: SubSubHeadingProps) {
    return HeadingCard(<h4>{ title }</h4>, id);
}
