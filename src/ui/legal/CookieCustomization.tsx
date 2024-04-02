// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import React, { useCallback, useEffect, useReducer, useState } from "react";
import { usePrevious } from "@app/hooks.ts";
import "./CookieCustomization.css";
import { Button, Form, Modal } from "react-bootstrap";
import CloseIcon from "@ui/CloseIcon.tsx";
import { acceptAllPref, CookiePref, defPref } from "./cookie-pref.ts";
import CookieContent from "@ui/legal/CookieContent.tsx";
import { useCookies } from "react-cookie";

interface DeleteAllCookieConfirmProps {
    show: boolean;
    onCancel: () => void;
    onDeleteAllCookies: () => void;
}

function DeleteAllCookieConfirm(
    { show, onCancel, onDeleteAllCookies }: DeleteAllCookieConfirmProps,
) {
    return <>
        <Modal show={ show }>
            <Modal.Header closeButton>
                <Modal.Title>Delete All Cookies?</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>
                    This action will delete all the cookies stored in this
                    device.
                </p>
                <p>
                    Cookies that can only be read by the server (httpOnly)
                    will not be deleted, like login tokens.
                </p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={ onCancel }>Cancel</Button>
                <Button
                    variant="danger"
                    onClick={ onDeleteAllCookies }
                >
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    </>;
}

function DeleteAllCookies() {
    const [ showConfirm, setShowConfirm ] = useState(false);
    const [ cookies, , removeCookie ] = useCookies();

    const onDeletionRequest = () => setShowConfirm(true);

    const onCancelDeletionRequest = () => setShowConfirm(false);

    const deleteAllCookies = () => {
        setShowConfirm(false);

        for (const cookie in cookies) {
            removeCookie(cookie);
        }
    };

    return <>
        <div className="d-flex mb-3 justify-content-end">
            <Button
                variant="danger"
                onClick={ onDeletionRequest }
            >
                Delete All Cookies
            </Button>

            <DeleteAllCookieConfirm
                show={ showConfirm }
                onCancel={ onCancelDeletionRequest }
                onDeleteAllCookies={ deleteAllCookies }
            />
        </div>
    </>;
}

interface CheckActionProps {
    name: string;
    onChange: (check: boolean) => void;
    state?: boolean;
}

function CheckAction({ name, onChange, state }: CheckActionProps) {
    return state !== undefined && <>
        <Form.Check
            id={ `${ name }CookieCheck` }
            label={ name.toUpperCase() }
            title={ `${ name } cookies` }
            type="checkbox"
            onChange={ e => onChange(e.target.checked) }
            checked={ state }
        />
    </>;
}

interface CookieActionProps {
    onSave: (pref: CookiePref) => void;
    onCancel: () => void;
    form: CookiePref;
}

function CookieAction({ onSave, onCancel, form }: CookieActionProps) {
    const [ functional, setFunctional ] = useState<boolean | undefined>();
    const [ analytics, setAnalytics ] = useState<boolean | undefined>();
    const [ targeting, setTargeting ] = useState<boolean | undefined>();

    const essentialOnly = () => { onSave(defPref); };

    const acceptAll = () => { onSave(acceptAllPref); };

    const saveSelection = () => {
        onSave({
            functional,
            analytics,
            targeting,
        });
    };

    useEffect(() => {
        setFunctional(form.functional);
        setAnalytics(form.analytics);
        setTargeting(form.targeting);
    }, [ form ]);

    return <>
        <Form>
            <div
                className="d-flex mb-3"
            >
                <div className="check-col me-3">
                    <Form.Check
                        id="cookieNecessaryCheck"
                        label="Essential"
                        title="Essential cookies"
                        type="checkbox"
                        checked
                        disabled
                    />
                    <CheckAction
                        name="functional"
                        state={ functional }
                        onChange={ setFunctional }
                    />
                </div>
                <div className="check-col">
                    <CheckAction
                        name="analytics"
                        state={ analytics }
                        onChange={ setAnalytics }
                    />
                    <CheckAction
                        name="targeting"
                        state={ targeting }
                        onChange={ setTargeting }
                    />
                </div>

            </div>

            <div className="d-grid gap-3 gap-md-3">
                <Button
                    variant="primary"
                    style={ {
                        gridRowStart: 1,
                        gridRowEnd: 1,
                        gridColumnStart: 1,
                        gridColumnEnd: 1,
                    } }
                    onClick={ essentialOnly }
                >
                    Essential Only
                </Button>

                <Button
                    variant="primary"
                    style={ {
                        gridRowStart: 2,
                        gridRowEnd: 2,
                        gridColumnStart: 1,
                        gridColumnEnd: 1,
                    } }
                    onClick={ acceptAll }
                >
                    Accept All
                </Button>

                <Button
                    variant="outline-primary"
                    style={ {
                        gridRowStart: 2,
                        gridRowEnd: 2,
                        gridColumnStart: 2,
                        gridColumnEnd: 2,
                    } }
                    onClick={ saveSelection }
                >
                    Save Selection
                </Button>

                <Button
                    variant="outline-primary"
                    style={ {
                        gridRowStart: 2,
                        gridRowEnd: 2,
                        gridColumnStart: 3,
                        gridColumnEnd: 3,
                    } }
                    onClick={ onCancel }
                >
                    Cancel
                </Button>
            </div>
        </Form>
    </>;
}

interface CookiePreferenceProps {
    domainName: string;
    cookiePolicyLink: string;
    initialForm: CookiePref;
    show: boolean;
    onSave: (pref: CookiePref) => void;
    onClose: () => void;
}

function CookieCustomization(
    {
        domainName,
        cookiePolicyLink,
        initialForm,
        show,
        onSave,
        onClose,
    }: CookiePreferenceProps,
) {
    const formReducer = (_: CookiePref, newForm: CookiePref) => newForm;
    const [ form, setForm ] = useReducer(formReducer, initialForm);
    const [ className, setClassName ] = useState("");
    const [ open, setOpen ] = useState(false);
    const prevOpen = usePrevious(open);

    type TransitionHandler = React.TransitionEventHandler<HTMLDivElement>;

    const handleTransitionEnd: TransitionHandler = e => {
        if (!show && e.propertyName === "transform") {
            setOpen(false);
        }
    };

    const onTransitionEnd = useCallback(handleTransitionEnd, [ show ]);

    useEffect(() => {
        if (show) {
            setOpen(true);
        }
        setClassName(show ? "show" : "");
    }, [ show ]);

    useEffect(() => {
        if (open && !prevOpen) {
            setForm(initialForm);
        }
    }, [ open, prevOpen, initialForm ]);

    return (open || show) && <>
        <div
            id="cookieCustomization"
            className={ className }
            onTransitionEnd={ onTransitionEnd }
        >
            <CookieContent
                domainName={ domainName }
                cookiePolicyLink={ cookiePolicyLink }
                extended
            />

            <DeleteAllCookies></DeleteAllCookies>

            <CookieAction
                onSave={ onSave }
                onCancel={ onClose }
                form={ form }
            />

            <CloseIcon onClose={ onClose } />
        </div>
    </>;
}

export default CookieCustomization;
