// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import { useAppDispatch, useAppSelector } from "@app/hooks.ts";
import {
    hideNotificationToast,
    selectNotificationToast,
} from "@app/toast-slice.ts";
import NotificationToast from "@components/Toast/Toast.tsx";

function AppNotificationToast() {
    const dispatch = useAppDispatch();
    const { headerTitle, body, show, smallTitle, duration }
        = useAppSelector(selectNotificationToast);

    const onClose = () => dispatch(hideNotificationToast());

    return <>
        <NotificationToast
            appIconSrc="/mathswe.svg"
            headerTitle={ headerTitle }
            body={ body }
            show={ show }
            onClose={ onClose }
            smallTitle={ smallTitle }
            duration={ duration }
        />
    </>;
}

export default AppNotificationToast;
