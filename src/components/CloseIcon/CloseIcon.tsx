// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: BSD-3-Clause
// This file is part of https://github.com/mathswe-ops/templates

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons/faClose";

type CloseIconProps = {
    onClose: () => void;
}

function CloseIcon({ onClose }: CloseIconProps) {
    return <>
        <FontAwesomeIcon
            icon={ faClose }
            style={ {
                position: "absolute",
                width: "1.125rem",
                height: "1.125rem",
                padding: "1rem",
                right: "0",
                top: "0",
                color: "white",
                cursor: "pointer",
            } }
            onClick={ onClose }
        />
    </>;
}

export default CloseIcon;
