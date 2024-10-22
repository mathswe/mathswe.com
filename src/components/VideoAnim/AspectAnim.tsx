// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: BSD-3-Clause
// This file is part of https://github.com/mathswe-ops/templates

import "./AspectAnim.css";
import AutoVideo from "@components/VideoAnim/AutoVideo.tsx";
import { Fragment } from "react";

type AspectRatio = "a1-1" | "a9-16"

type MaxHeight = "max-100vh" | "max-80vh-when-not-full-width"

type AspectAnimProps = {
    sources: string[],
    ratio: AspectRatio,
    maxHeight?: MaxHeight,
}

function AspectAnim({ sources, ratio, maxHeight }: AspectAnimProps) {
    const maxHeightClass = maxHeight ?? "max-100vh";

    const aspect = (src: string, idx: number) => <Fragment key={ idx }>
        <div className={ `aspect ${ ratio } ${ maxHeightClass }` }>
            <AutoVideo src={ src } />
        </div>
    </Fragment>;

    return <>
        <div className="aspects">
            { sources.map(aspect) }
        </div>
    </>;
}

export default AspectAnim;
