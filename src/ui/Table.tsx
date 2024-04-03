// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import "./Table.css";
import { ReactNode } from "react";

export interface TableModel {
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
                                <th key={ `header-${ idx }` }>{ header }</th>,
                            )
                        }
                    </tr>
                </thead>

                <tbody>
                    { rows
                        .map((row, rowIdx) =>
                            <tr key={ `row-${ rowIdx }` }>
                                { row
                                    .map((item, itemIdx) =>
                                        <td
                                            key={ `item-${ rowIdx }-${ itemIdx }` }
                                            label={ headers[itemIdx] }
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
