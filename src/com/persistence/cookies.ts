// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

export function getAllDomainAndSubdomainsWildcard() {
    const domainNameEnvVar = String(import.meta.env.VITE_DOMAIN_NAME ?? "");
    const domainName
        = domainNameEnvVar.length > 0
          ? domainNameEnvVar
          : undefined;

    return domainName ? `.${ domainName }` : "";
}
