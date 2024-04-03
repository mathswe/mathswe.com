// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons/faClose";

interface CloseIconProps {
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
