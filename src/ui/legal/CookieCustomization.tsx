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
import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons/faCaretRight";
import CookieUsageTable from "@ui/legal/CookieUsageTable.tsx";
import { CookieUsage } from "@app/legal/cookies/cookies.ts";

export interface Description {
    essentialCookies: string;
    functionalCookies: string;
    analyticalCookies: string;
    targetingCookies: string;
}

export interface CustomizationCookieUsage {
    essential: CookieUsage[];
    functional?: CookieUsage[];
    analytical?: CookieUsage[];
    targeting?: CookieUsage[];
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
    const [ cookies,  ] = useCookies();

    const onDeletionRequest = () => setShowConfirm(true);

    const onCancelDeletionRequest = () => setShowConfirm(false);

    const deleteAllCookies = () => {
        setShowConfirm(false);
        function deleteCookie(name: string): void {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }
        for (const cookie in cookies) {
            try {
                console.log(cookie);
                deleteCookie(cookie);
                // removeCookie(cookie);
            }
            catch (e) {
                console.log(e);
            }
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

interface CookieCategoryDetailsProps {
    open: boolean;
    rows: CookieUsage[];
}

function CookieCategoryDetails({ open, rows }: CookieCategoryDetailsProps) {
    const NoCookies = () => <p className="text-center fw-bold">
        There are no cookies in this category.
    </p>;

    return <>
        <Collapse in={ open }>
            <div>
                { rows.length > 0
                    ? <CookieUsageTable rows={ rows } customization />
                    : <NoCookies />
                }
            </div>
        </Collapse>
    </>;
}

interface CategoryItemProps {
    children: ReactNode;
    title: string;
    description: string;
    cookies?: CookieUsage[];
}

function CategoryItem(
    {
        children,
        title,
        description,
        cookies,
    }: CategoryItemProps,
) {
    const [ open, setOpen ] = useState(false);

    const Header: React.FC<{
        children: ReactNode,
        title: string,
    }> = ({ children, title }) => <>
        <div className="d-flex flex-wrap align-content-around py-2">
            <FontAwesomeIcon
                className="me-2 align-self-center"
                style={ { fontSize: "1.125rem", color: "var(--accent-color)" } }
                icon={ open ? faCaretDown : faCaretRight }
            />

            <strong className="cookie-cat">{ title }</strong>

            { children }
        </div>
    </>;

    const onItemClick = (event: React.MouseEvent<HTMLLIElement>) => {
        const tagName = (event.target as HTMLElement).tagName.toLowerCase();

        if ([ "input", "a", "table", "th", "tr", "td" ].includes(tagName)) {
            return;
        }
        setOpen(!open);
    };

    return <>
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
            style={ { cursor: "pointer" } }
            onClick={ onItemClick }
        >
            <div className="d-flex flex-column w-100">
                <Header title={ title }>
                    { children }
                </Header>

                <p>{ description }</p>

                <CookieCategoryDetails open={ open } rows={ cookies ?? [] } />
            </div>
        </ListGroup.Item>
    </>;
}

interface CookieActionProps {
    cookieUsage: CustomizationCookieUsage,
    description: Description;
    onSave: (pref: CookiePref) => void;
    onCancel: () => void;
    form: CookiePref;
}

function CookieAction(
    {
        cookieUsage,
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

    useEffect(() => {
        setFunctional(form.functional);
        setAnalytics(form.analytics);
        setTargeting(form.targeting);
    }, [ form ]);

    return <>
        <Form>
            <div className="d-flex mb-3">
                <ListGroup as="ul" className="w-100 flex-grow-1">
                    <CategoryItem
                        title="Essential"
                        description={ description.essentialCookies }
                        cookies={ cookieUsage.essential }
                    >
                        <Form.Switch
                            id="cookieNecessarySwitch"
                            title="Essential cookies"
                            type="checkbox"
                            checked
                            disabled
                        />
                    </CategoryItem>

                    <CategoryItem
                        title="Functional"
                        description={ description.functionalCookies }
                        cookies={ cookieUsage.functional }
                    >
                        <SwitchAction
                            name="functional"
                            state={ functional }
                            onChange={ setFunctional }
                        />
                    </CategoryItem>

                    <CategoryItem
                        title="Analytical"
                        description={ description.analyticalCookies }
                        cookies={ cookieUsage.analytical }
                    >
                        <SwitchAction
                            name="analytics"
                            state={ analytics }
                            onChange={ setAnalytics }
                        />
                    </CategoryItem>

                    <CategoryItem
                        title="Targeting"
                        description={ description.targetingCookies }
                        cookies={ cookieUsage.targeting }
                    >
                        <SwitchAction
                            name="targeting"
                            state={ targeting }
                            onChange={ setTargeting }
                        />
                    </CategoryItem>
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
    cookieUsage: CustomizationCookieUsage,
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
        cookieUsage,
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
                cookieUsage={ cookieUsage }
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
