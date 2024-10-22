// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import {
    MathSweBaseDomain,
    MathSweDomain,
} from "@app/legal/cookies/cookies.ts";

export const baseDomains: Record<MathSweBaseDomain, MathSweDomain[]> = {
    "mathswe.com": [ "mathswe.com" ],
    "math.software": [
        "math.software",
        "tsd.math.software",
        "rsm.math.software",
        "ops.math.software",
    ],
    "mathsoftware.engineer": [
        "mathsoftware.engineer",
        "blog.mathsoftware.engineer",
        "dev.mathsoftware.engineer",
        "me.mathsoftware.engineer",
    ],
};
