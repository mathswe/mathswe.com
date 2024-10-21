// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: BSD-3-Clause
// This file is part of https://github.com/mathswe-ops/templates

import "./Main.css"
import { PropsWithChildren } from "react";

const Main = ({ children }: PropsWithChildren) => <>
    <section>
        <main>
            <article>
                { children }
            </article>
        </main>
    </section>
</>;

export default Main;
