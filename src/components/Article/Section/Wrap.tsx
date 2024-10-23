// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: BSD-3-Clause
// This file is part of https://github.com/mathswe-ops/templates

import { PropsWithChildren } from "react";

export const Wrap = ({ children }: PropsWithChildren) => <>
    <div className="wrap">
        { children }
    </div>
</>;
