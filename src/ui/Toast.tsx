// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import { useEffect } from "react";
import Toast from "react-bootstrap/Toast";
import "./Toast.css";

export type ToastDuration = 2_000 | 5_000;
export const SMALL_DURATION: ToastDuration = 2000;
export const LARGE_DURATION: ToastDuration = 5000;

type NotificationToastProps = {
    headerTitle: string;
    body: string;
    show: boolean;
    onClose: () => void;
    smallTitle?: string;
    duration?: ToastDuration;
}

function NotificationToast(
    {
        headerTitle,
        body,
        show,
        onClose,
        smallTitle,
        duration,
    }: NotificationToastProps,
) {
    useEffect(() => {
        if (show) {
            const tid = setTimeout(onClose, duration ?? SMALL_DURATION);

            return () => {
                clearTimeout(tid);
            }
        }
    }, [ duration, onClose, show ]);

    return (
        <Toast show={ show } onClose={ onClose }>
            <Toast.Header>
                <img
                    src="/mathswe.svg"
                    width="24px"
                    className="rounded me-2"
                    alt="Notification Icon"
                />
                <strong className="me-auto">{ headerTitle }</strong>
                <small>{ smallTitle ?? "" }</small>
            </Toast.Header>
            <Toast.Body>{ body }</Toast.Body>
        </Toast>
    );
}

export default NotificationToast;
