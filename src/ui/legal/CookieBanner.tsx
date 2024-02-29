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
    functional?: boolean;
    analytics?: boolean;
    targeting?: boolean;
}

export const defPref: CookiePref = {
    functional: false,
    analytics: false,
    targeting: false,
};

export const acceptAllPref: CookiePref = {
    functional: true,
    analytics: true,
    targeting: true,
};

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
        <div className="action">
            <Form>
                <div className="d-grid gap-3 gap-md-3">
                    <Form.Check
                        id="cookieNecessaryCheck"
                        label="Essential"
                        title="Essential cookies"
                        type="checkbox"
                        style={ {
                            gridRowStart: 1,
                            gridRowEnd: 1,
                            gridColumnStart: 1,
                            gridColumnEnd: 1,
                        } }
                        inline
                        checked
                        disabled
                    />

                    <div
                        style={ {
                            gridRowStart: 1,
                            gridRowEnd: "span 2",
                            gridColumnStart: 2,
                            gridColumnEnd: "span 2",
                        } }
                    >
                        <CheckAction
                            name="functional"
                            state={ functional }
                            onChange={ setFunctional }
                        />

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

                    <Button
                        variant="primary"
                        style={ {
                            gridRowStart: 2,
                            gridRowEnd: 2,
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
                            gridRowStart: 3,
                            gridRowEnd: 3,
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
                            gridRowStart: 3,
                            gridRowEnd: 3,
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
                            gridRowStart: 3,
                            gridRowEnd: 3,
                            gridColumnStart: 3,
                            gridColumnEnd: 3,
                        } }
                    >
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
