// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import "./Table.css";

export interface TableRow {
    items: string[];
}

export interface TableModel {
    headers: string[];
    rows: TableRow[];
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
                                    .items
                                    .map((item, itemIdx) =>
                                        <td key={ `item-${ rowIdx }-${ itemIdx }` }>
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
