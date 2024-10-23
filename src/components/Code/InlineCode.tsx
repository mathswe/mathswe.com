// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: BSD-3-Clause
// This file is part of https://github.com/mathswe-ops/templates

import { ReactNode } from "react";

type InlineCodeProps = {
    children: ReactNode;
    backgroundColor?: string;
}

function InlineCode({ children, backgroundColor }: InlineCodeProps) {
    return <>
        <code
            className="code language-plaintext highlighter-rouge"
            style={ { backgroundColor } }
        >
            { children }
        </code>
    </>;
}

export default InlineCode;
