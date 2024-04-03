// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import {
    CookieProvider,
    CookieUsage,
    cookieUsageHeaders,
} from "@app/legal/cookies/cookies.ts";
import { ReactNode } from "react";
import { Table } from "@ui/Table.tsx";

interface CookieUsageTableProps {
    rows: CookieUsage[];
    customization?: boolean;
}

function CookieUsageTable({ rows, customization }: CookieUsageTableProps) {
    const toNode: (value: string | string[]) => ReactNode = value => <>{ value }</>;

    const providerToNode: (provider: CookieProvider) => ReactNode = (
        { domain, privacyLink },
    ) => <>
        <div>
            <a
                href={ privacyLink }
                target="_blank"
                rel="noreferrer"
            >
                { domain }
            </a>
        </div>
    </>;

    const cookieToNode: (_: CookieUsage) => ReactNode[] = (
        { cookie, description, provider, retention, purpose, whenVisiting },
    ) => [
        toNode(cookie),
        toNode(description),
        providerToNode(provider),
        toNode(retention),
        toNode(purpose),
        toNode(whenVisiting),
    ];

    const slice: <T>(_: T[]) => T[] = values => customization
        ? values.slice(0, 4)
        : values;

    const tableHeaders = slice(cookieUsageHeaders);

    const tableRows = rows.map(cookieToNode).map(slice);

    return <>
        <Table headers={ tableHeaders } rows={ tableRows } />
    </>;
}

export default CookieUsageTable;
