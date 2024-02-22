// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import "./CookieBanner.css";
import { Button, Form } from "react-bootstrap";
import { faCookie } from "@fortawesome/free-solid-svg-icons/faCookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons/faClose";
import React, { useCallback, useEffect, useState } from "react";

export interface CookiePref {
    analytics?: boolean;
}

export const defPref: CookiePref = { analytics: false };

export const acceptAllPref: CookiePref = { analytics: true };

interface CookieBannerProps {
    cookiePolicyLink: string;
    pref: CookiePref;
    show: boolean;
    onSave: (CookiePref) => void;
    onOpen: () => void;
    onClose: () => void;
    onClosed: () => void;
}

function CookieBanner(
    {
        cookiePolicyLink,
        pref,
        show,
        onSave,
        onOpen,
        onClose,
        onClosed,
    }: CookieBannerProps,
) {
    const [ form, setForm ] = useState(defPref);
    const [ className, setClassName ] = useState("");

    const acceptAll = () => { onSave(acceptAllPref); };

    const saveSelection = () => { onSave(form); };

    const onTransitionEnd: React.TransitionEventHandler<HTMLDivElement> = useCallback(
        (e) => {
            if (!show && e.propertyName === "transform") {
                onClosed();
            }
        },
        [ show, onClosed ],
    );

    useEffect(() => {
        if (show) {
            setClassName("show");
            onOpen();
        }
        else {
            setClassName("");
        }
    }, [ show, onOpen ]);

    useEffect(() => {
        setForm(pref);
    }, [ pref ]);

    return <>
        <div
            id="cookieBanner"
            className={ className }
            onTransitionEnd={ onTransitionEnd }
        >
            <div className="content">
                <h5>
                    <FontAwesomeIcon
                        icon={ faCookie }
                        style={ {
                            width: "1.125rem",
                            height: "1.125rem",
                            color: "#aa7733",
                            marginRight: "0.5rem",
                        } }
                    />
                    Cookies
                </h5>

                <p>
                    We use cookies to improve user experience. Choose what
                    cookies you allow us to use. Learn
                    more in our <a href={ cookiePolicyLink }>Cookies Policy</a>.
                </p>

                <p>
                    Your consent will be valid across all our subdomains.

                    You can always set your consent by clicking
                    the &quot;Cookie Preference&quot; button at the page
                    footer.
                </p>
            </div>

            <div className="action">
                <Form>
                    <Form.Check
                        id="cookieNecessaryCheck"
                        label="Strictly necessary"
                        title="Strictly necessary cookies"
                        type="checkbox"
                        inline
                        checked
                        disabled
                    />
                    { pref.analytics !== undefined &&
                        <Form.Check
                            id="cookieAnalyticsCheck"
                            label="Analytics"
                            title="Analytics cookies"
                            type="checkbox"
                            checked={ form.analytics }
                            onChange={ e => setForm({
                                ...form,
                                analytics: e.target.checked,
                            }) }
                            inline
                        />
                    }
                    <div className="mt-2 d-flex justify-content-between">
                        <Button
                            variant="primary"
                            className="flex-fill"
                            onClick={ acceptAll }
                        >
                            Accept All
                        </Button>

                        <Button
                            variant="outline-primary"
                            className="flex-fill mx-2 mx-md-4"
                            onClick={ saveSelection }
                        >
                            Save Selection
                        </Button>

                        <Button variant="outline-primary" className="flex-fill">
                            Customize
                        </Button>
                    </div>
                </Form>
            </div>

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
        </div>
    </>;
}

export default CookieBanner;
