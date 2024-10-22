// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: BSD-3-Clause
// This file is part of https://github.com/mathswe-ops/templates

import "./TerminalOutput.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import {
    isItemBlank,
    itemToCssClass,
    itemToIcon,
    itemToString,
    TerminalItem,
} from "./TerminalItem.ts";

type TerminalOutputProps = {
    outputs: TerminalItem[];
}

function TerminalOutput({ outputs }: TerminalOutputProps) {
    const maxLength = 60;
    const normalize = (item: TerminalItem) => {
        const output = itemToString(item);

        return output.length > maxLength
               ? output.substring(0, maxLength) + "..."
               : output;
    };

    const emptyItem = (index: number) => <Fragment key={ index }>
        <div className="item blank"></div>
    </Fragment>;

    const newItem = (
        output: TerminalItem,
        index: number,
    ) => <Fragment key={ index }>
        <div className="item">
            <FontAwesomeIcon
                className={ itemToCssClass(output) }
                icon={ itemToIcon(output) }
            ></FontAwesomeIcon>

            <span>{ normalize(output) }</span>
        </div>
    </Fragment>;

    const outputToItem = (
        output: TerminalItem,
        index: number,
    ) =>
        isItemBlank(output)
        ? emptyItem(index)
        : newItem(output, index);

    return <>
        <div className="terminal-output">
            <div className="content">
                { outputs.map(outputToItem) }
            </div>
        </div>
    </>;
}

export default TerminalOutput;
