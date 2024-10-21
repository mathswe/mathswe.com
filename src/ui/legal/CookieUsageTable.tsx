// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import {
    CookieProvider,
    CookieUsage,
    cookieUsageHeaders,
    MathSweBaseDomain,
    MathSweDomain,
} from "@app/legal/cookies/cookies.ts";
import { Table } from "@ui/Table.tsx";
import { ReactNode } from "react";

type CookieUsageTableProps = {
    mathsweBaseDomains: Record<MathSweBaseDomain, MathSweDomain[]>,
    rows: CookieUsage[],
    customization?: boolean,
}

function domainsByWildcard(
    baseDomains: Record<MathSweBaseDomain, MathSweDomain[]>,
    whenVisiting: MathSweDomain[],
): string[] {
    const result: string[] = [];

    for (const baseDomain in baseDomains) {
        const subdomains = baseDomains[baseDomain as keyof typeof baseDomains];
        const allSubdomainsIncluded = subdomains
            .every(domain => whenVisiting.includes(domain));

        if (allSubdomainsIncluded) {
            result.push(`*.${ baseDomain }`);
        }
        else {
            result
                .push(...subdomains
                    .filter(domain => whenVisiting.includes(domain)));
        }
    }

    return result;
}

function CookieUsageTable(
    { mathsweBaseDomains, rows, customization }: CookieUsageTableProps,
) {
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

    const formatWhenVisitingList = (whenVisiting: MathSweDomain[]) =>
        domainsByWildcard(mathsweBaseDomains, whenVisiting)
            .reduce((prev, cur) => `${ prev }, ${ cur }`);

    const cookieToNode: (_: CookieUsage) => ReactNode[] = (
        { cookie, description, provider, retention, purpose, whenVisiting },
    ) => [
        toNode(cookie),
        toNode(description),
        providerToNode(provider),
        toNode(retention),
        toNode(purpose),
        toNode(formatWhenVisitingList(whenVisiting)),
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
