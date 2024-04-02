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
            <Button
                className="py-1 mb-4"
                variant="info"
                onClick={ () => setOpen(!open) }
                aria-controls="cookie-category-collapse-table"
                aria-expanded={ open }
            >
                Show Cookies
            </Button>

            <Collapse in={ open }>
                <div>
                    <CookieUsageTable rows={ rows } />
                </div>
            </Collapse>
        </div>
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
                            <div className="d-flex flex-wrap align-content-around py-2">
                                <strong className="cookie-cat">Essential</strong>

                                <Form.Switch
                                    id="cookieNecessarySwitch"
                                    title="Essential cookies"
                                    type="checkbox"
                                    checked
                                    disabled
                                />
                            </div>

                            <p>
                                These are necessary for the website or web app
                                to function properly and do not require user
                                consent. They typically store session
                                information or user preferences. The website
                                cannot be used properly without these strictly
                                necessary cookies.
                            </p>

                            <CookieCategoryDetails rows={ cookies } />
                        </div>
                    </Item>

                    <Item>
                        <div className="d-flex flex-column w-100">
                            <div className="d-flex flex-wrap align-content-around py-2">
                                <strong className="cookie-cat">Functional</strong>

                                <SwitchAction
                                    name="functional"
                                    state={ functional }
                                    onChange={ setFunctional }
                                />
                            </div>

                            <p>
                                These enhance the website or web app performance
                                as certain functions may not be available
                                without them. They allow users to remember their
                                preferences and settings, provide a personalized
                                user experience, are anonymous, be first-party
                                or set by third-party service providers, and do
                                not track browsing activity across other
                                websites. For example, cookies that remember
                                user location, chosen language, or other
                                settings, a live web chat platform, and optional
                                security parameters like a single sign-on (SSO).
                            </p>

                            <CookieCategoryDetails rows={ cookies } />
                        </div>
                    </Item>

                    <Item>
                        <div className="d-flex flex-column w-100">
                            <div className="d-flex flex-wrap align-content-around py-2">
                                <strong className="cookie-cat">Analytics</strong>

                                <SwitchAction
                                    name="analytics"
                                    state={ analytics }
                                    onChange={ setAnalytics }
                                />
                            </div>

                            <p>
                                These cookies collect data on how users interact
                                with the website or web app, including metrics
                                like page views, bounce rates, and traffic
                                sources. They cannot be used to directly
                                identify a certain visitor. They help website
                                owners understand and improve site performance.
                            </p>

                            <CookieCategoryDetails rows={ cookies } />
                        </div>
                    </Item>

                    <Item>
                        <div className="d-flex flex-column w-100">
                            <div className="d-flex flex-wrap align-content-around py-2">
                                <strong className="cookie-cat">Targeting</strong>

                                <SwitchAction
                                    name="targeting"
                                    state={ targeting }
                                    onChange={ setTargeting }
                                />
                            </div>

                            <p>
                                These are used to identify visitors between
                                different websites and may be used by companies
                                to build a profile of visitor interests or show
                                relevant ads on other websites, and are usually
                                third-party. They are used on a limited basis,
                                and we do not use them to serve third-party ads
                                on our websites or web apps. For example,
                                cookies installed by YouTube in videos embedded
                                into our site to track their views and user
                                preferences.
                            </p>

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
