// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

export function getAllDomainAndSubdomainsWildcard() {
    const domainName = import.meta.env.VITE_DOMAIN_NAME;
    return domainName ? `.${ domainName }` : "";
}
