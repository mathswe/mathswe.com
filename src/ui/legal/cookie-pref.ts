// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

export interface CookiePref {
    functional?: boolean;
    analytics?: boolean;
    targeting?: boolean;
}

export const defPref: CookiePref = {
    functional: false,
    analytics: false,
    targeting: false,
};

export const acceptAllPref: CookiePref = {
    functional: true,
    analytics: true,
    targeting: true,
};
