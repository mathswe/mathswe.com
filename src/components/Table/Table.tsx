// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: BSD-3-Clause
// This file is part of https://github.com/mathswe-ops/templates

import "./Table.css";
import { ReactNode } from "react";

export type TableModel = {
    headers: string[];
    rows: string[][] | ReactNode[][];
}

export function Table({ headers, rows }: TableModel) {
    return <>
        <div className="responsive-table">
            <table>
                <thead>
                    <tr>
                        { headers
                            .map((header, idx) =>
                                <th key={ `header-${ idx.toString() }` }>{ header }</th>,
                            )
                        }
                    </tr>
                </thead>

                <tbody>
                    { rows
                        .map((row, rowIdx) =>
                            <tr key={ `row-${ rowIdx.toString() }` }>
                                { row
                                    .map((item, itemIdx) =>
                                        <td
                                            key={ `item-${ rowIdx.toString() }-${ itemIdx.toString() }` }
                                            data-label={ headers[itemIdx] }
                                        >
                                            { item }
                                        </td>,
                                    )
                                }
                            </tr>,
                        )
                    }
                </tbody>
            </table>
        </div>
    </>;
}
