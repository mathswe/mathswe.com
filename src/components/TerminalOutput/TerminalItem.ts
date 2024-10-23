// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: BSD-3-Clause
// This file is part of https://github.com/mathswe-ops/templates

import {
    faCheck,
    faGear,
    IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

export type TerminalIcon = "check" | "gear";

export const classFromIcon = (icon: TerminalIcon) => ({
    check: "check-icon",
    gear: "gear-icon",
}[icon]);

export const faIcon = (icon: TerminalIcon): IconDefinition => ({
    check: faCheck,
    gear: faGear,
}[icon]);

export type TerminalItem = string | { icon: TerminalIcon, value: string };

export const itemToString = (item: TerminalItem): string =>
    typeof item === "string"
    ? item
    : item.value;

export const itemToIcon = (item: TerminalItem): IconDefinition =>
    typeof item === "string"
    ? faCheck
    : faIcon(item.icon);

export const itemToCssClass = (item: TerminalItem): string =>
    typeof item === "string"
    ? "check-icon"
    : classFromIcon(item.icon);

export const isItemBlank = (item: TerminalItem): boolean =>
    itemToString(item).trim().length === 0;
