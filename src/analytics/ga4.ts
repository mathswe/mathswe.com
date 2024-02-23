// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import ReactGA from "react-ga4";

export function initializeGA4(id: string) {
    ReactGA.initialize(id);
}
