// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import "./CookieBanner.css";
import { Button, Form } from "react-bootstrap";
import { faCookie } from "@fortawesome/free-solid-svg-icons/faCookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons/faClose";
import React, {
    useCallback,
    useEffect,
    useReducer,
    useRef,
    useState,
} from "react";

export interface CookiePref {
    analytics?: boolean;
}

export const defPref: CookiePref = { analytics: false };

export const acceptAllPref: CookiePref = { analytics: true };

interface CookieContentProps {
    cookiePolicyLink: string;
}

function CookieContent({ cookiePolicyLink }: CookieContentProps) {
    return <>
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
            inline
        />
    </>;
}

interface CookieActionProps {
    onSave: (pref: CookiePref) => void;
    form: CookiePref;
}

function CookieAction({ onSave, form }: CookieActionProps) {
    const [ analytics, setAnalytics ] = useState<boolean | undefined>();

    const acceptAll = () => { onSave(acceptAllPref); };

    const saveSelection = () => { onSave({ analytics }); };

    useEffect(() => {
        setAnalytics(form.analytics);
    }, [ form ]);

    return <>
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

                <CheckAction
                    name="analytics"
                    state={ analytics }
                    onChange={ setAnalytics }
                />

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
    </>;
}

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

interface CookieBannerProps {
    cookiePolicyLink: string;
    initialForm: CookiePref;
    show: boolean;
    onSave: (pref: CookiePref) => void;
    onClose: () => void;
}

function usePrevious<T>(value: T) {
    const ref = useRef<T>();

    useEffect(() => {
        ref.current = value;
    }, [ value ]);
    return ref.current;
}

function CookieBanner(
    {
        cookiePolicyLink,
        initialForm,
        show,
        onSave,
        onClose,
    }: CookieBannerProps,
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
            id="cookieBanner"
            className={ className }
            onTransitionEnd={ onTransitionEnd }
        >
            <CookieContent cookiePolicyLink={ cookiePolicyLink } />

            <CookieAction onSave={ onSave } form={ form } />

            <CloseIcon onClose={ onClose } />
        </div>
    </>;
}

export default CookieBanner;
