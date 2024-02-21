// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import CookieBanner from "@/ui/legal/CookieBanner.tsx";
import Footer from "./Footer.tsx";
import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "./hooks.ts";
import { hide, selectShow } from "./cookies-slice.ts";

const cookiePolicyLink = "/legal#cookies";

interface LayoutProps {
    children: ReactNode;
}

function Layout({ children }: LayoutProps) {
    const showCookieBanner = useAppSelector(selectShow);
    const dispatch = useAppDispatch();
    const onCloseCookieBanner = () => { dispatch(hide()); };

    return <>
        { children }

        { showCookieBanner &&
            <CookieBanner
                cookiePolicyLink={ cookiePolicyLink }
                onClose={ onCloseCookieBanner }
            ></CookieBanner> }

        <Footer></Footer>
    </>;
}

export default Layout;
