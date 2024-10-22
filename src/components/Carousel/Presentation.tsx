// Copyright (c) 2024 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: BSD-3-Clause
// This file is part of https://github.com/mathswe-ops/templates

import "./Presentation.css";
import { useState } from "react";
import { Carousel } from "react-bootstrap";

type CarouselControlsProps = {
    onZoom: () => void,
}

function Controls({ onZoom }: CarouselControlsProps) {
    return <>
        <button type="button" className="zoom" onClick={ onZoom }>
            <span className="material-symbols-rounded enter">zoom_in</span>
            <span className="material-symbols-rounded exit">zoom_out</span>
        </button>
    </>;
}

type PresentationImage = {
    src: string,
    title: string,
}

type PresentationProps = {
    id: string,
    title: string,
    sequence: PresentationImage[],
}

function Presentation({ id, title, sequence }: PresentationProps) {
    const [ classes, setClasses ] = useState([ "carousel slide" ]);

    const onZoom = () => {
        if (classes.includes("zoom-in")) {
            const noZoomIn = (className: string) => className !== "zoom-in";

            setClasses(classes.filter(noZoomIn));
        }
        else {
            setClasses([ ...classes, "zoom-in" ]);
        }
    };

    return <>
        <div className="presentation">
            <Carousel id={ id } className={ classes.join(" ") }>
                { sequence.map(({ src, title }, index) => (
                    <Carousel.Item key={ index }>
                        <div>
                            <img
                                src={ src }
                                alt={ title }
                            />

                            <div key={ index } className={ `caption` }>
                                { title }
                            </div>
                        </div>
                    </Carousel.Item>
                )) }
            </Carousel>

            <div className="title">
                { title }
            </div>

            <Controls onZoom={ onZoom } />
        </div>
    </>;
}

export default Presentation;
