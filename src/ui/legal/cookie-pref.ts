// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

export interface CookiePref {
    functional?: boolean;
    analytical?: boolean;
    targeting?: boolean;
}

export const defPref: CookiePref = {
    functional: false,
    analytical: false,
    targeting: false,
};

export const acceptAllPref: CookiePref = {
    functional: true,
    analytical: true,
    targeting: true,
};
