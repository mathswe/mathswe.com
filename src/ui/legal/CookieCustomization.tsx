// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import React, {
    ReactNode,
    useCallback,
    useEffect,
    useReducer,
    useState,
} from "react";
import { usePrevious } from "@app/hooks.ts";
import "./CookieCustomization.css";
import { Button, Collapse, Form, ListGroup, Modal } from "react-bootstrap";
import CloseIcon from "@ui/CloseIcon.tsx";
import { acceptAllPref, CookiePref, defPref } from "./cookie-pref.ts";
import CookieContent from "@ui/legal/CookieContent.tsx";
import { useCookies } from "react-cookie";
import { Table, TableRow } from "@ui/Table.tsx";
import { firstPartyCookies } from "@app/legal/cookies/cookies.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons/faCaretUp";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown";

export interface Description {
    essentialCookies: string;
    functionalCookies: string;
    analyticalCookies: string;
    targetingCookies: string;
}

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
            <Modal.Header closeButton onHide={ onCancel }>
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

interface SwitchActionProps {
    name: string;
    onChange: (check: boolean) => void;
    state?: boolean;
}

function SwitchAction({ name, onChange, state }: SwitchActionProps) {
    return state !== undefined && <>
        <Form.Switch
            id={ `${ name }CookieSwitch` }
            title={ `${ name } cookies` }
            type="checkbox"
            onChange={ e => onChange(e.target.checked) }
            checked={ state }
        />
    </>;
}

interface CookieUsageTableProps {
    rows: TableRow[];
}

function CookieUsageTable({ rows }: CookieUsageTableProps) {
    return <>
        <Table
            headers={ [
                "Cookie Name",
                "Purpose",
                "Retention Period",
            ] }
            rows={ rows }
        />
    </>;
}

interface CookieCategoryDetailsProps {
    rows: TableRow[];
}

function CookieCategoryDetails({ rows }: CookieCategoryDetailsProps) {
    const [ open, setOpen ] = useState(false);

    return <>
        <div>
            <Collapse in={ open }>
                <div>
                    <CookieUsageTable rows={ rows } />
                </div>
            </Collapse>

            <Button
                className="py-1 mb-2"
                variant="info"
                onClick={ () => setOpen(!open) }
                aria-controls="cookie-category-collapse-table"
                aria-expanded={ open }
            >
                { open ? "Hide Cookies" : "Show Cookies" }

                <FontAwesomeIcon className="ms-2" icon={ open ? faCaretUp : faCaretDown } />
            </Button>
        </div>
    </>;
}

interface CookieActionProps {
    description: Description;
    onSave: (pref: CookiePref) => void;
    onCancel: () => void;
    form: CookiePref;
}

function CookieAction(
    {
        description,
        onSave,
        onCancel,
        form,
    }: CookieActionProps,
) {
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

    const cookies: TableRow[] = [
        { items: firstPartyCookies },
    ];

    const Item: React.FC<{ children: ReactNode }> = ({ children }) => <>
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
        >
            { children }
        </ListGroup.Item>
    </>;

    const Header: React.FC<{
        children: ReactNode,
        title: string,
    }> = ({ children, title }) => <>
        <div className="d-flex flex-wrap align-content-around py-2">
            <strong className="cookie-cat">{ title }</strong>

            { children }
        </div>
    </>;

    useEffect(() => {
        setFunctional(form.functional);
        setAnalytics(form.analytics);
        setTargeting(form.targeting);
    }, [ form ]);

    return <>
        <Form>
            <div className="d-flex mb-3">
                <ListGroup as="ul" className="flex-grow-1">
                    <Item>
                        <div className="d-flex flex-column w-100">
                            <Header title="Essential">
                                <Form.Switch
                                    id="cookieNecessarySwitch"
                                    title="Essential cookies"
                                    type="checkbox"
                                    checked
                                    disabled
                                />
                            </Header>

                            <p>{ description.essentialCookies }</p>

                            <CookieCategoryDetails rows={ cookies } />
                        </div>
                    </Item>

                    <Item>
                        <div className="d-flex flex-column w-100">
                            <Header title="Functional">
                                <SwitchAction
                                    name="functional"
                                    state={ functional }
                                    onChange={ setFunctional }
                                />
                            </Header>

                            <p>
                                { description.functionalCookies }
                            </p>

                            <CookieCategoryDetails rows={ cookies } />
                        </div>
                    </Item>

                    <Item>
                        <div className="d-flex flex-column w-100">
                            <Header title="Analytical">
                                <SwitchAction
                                    name="analytics"
                                    state={ analytics }
                                    onChange={ setAnalytics }
                                />
                            </Header>

                            <p>{ description.analyticalCookies }</p>

                            <CookieCategoryDetails rows={ cookies } />
                        </div>
                    </Item>

                    <Item>
                        <div className="d-flex flex-column w-100">
                            <Header title="Targeting">
                                <SwitchAction
                                    name="targeting"
                                    state={ targeting }
                                    onChange={ setTargeting }
                                />
                            </Header>

                            <p>{ description.targetingCookies }</p>

                            <CookieCategoryDetails rows={ cookies } />
                        </div>
                    </Item>
                </ListGroup>
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
    description: Description;
    show: boolean;
    onSave: (pref: CookiePref) => void;
    onClose: () => void;
}

function CookieCustomization(
    {
        domainName,
        cookiePolicyLink,
        initialForm,
        description,
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
                description={ description }
                onSave={ onSave }
                onCancel={ onClose }
                form={ form }
            />

            <CloseIcon onClose={ onClose } />
        </div>
    </>;
}

export default CookieCustomization;
