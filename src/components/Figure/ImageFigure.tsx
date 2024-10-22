// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: BSD-3-Clause
// This file is part of https://github.com/mathswe-ops/templates

type ImageFigureProps = {
    src: string,
    caption: string,
}

export const ImageFigure = ({ src, caption }: ImageFigureProps) => <>
    <figure>
        <img src={ src } alt={ caption } />
        <figcaption>{ caption }</figcaption>
    </figure>
</>;
