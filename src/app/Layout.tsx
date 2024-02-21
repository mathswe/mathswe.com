// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import CookieBanner from "@/ui/legal/CookieBanner.tsx";
import Footer from "./Footer.tsx";
import { ReactNode, useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks.ts";
import { hide, selectShow } from "./cookies-slice.ts";

const cookiePolicyLink = "/legal#cookies";

interface LayoutProps {
    children: ReactNode;
}

function CookieBannerLayout() {
    const showCookieBanner = useAppSelector(selectShow);
    const dispatch = useAppDispatch();
    const onCloseCookieBanner = () => { dispatch(hide()); };

    const [ cookieBannerOpened, setCookieBannerOpened ] = useState(false);

    return <>
        { (cookieBannerOpened || showCookieBanner) &&
            <CookieBanner
                cookiePolicyLink={ cookiePolicyLink }
                show={ showCookieBanner }
                onOpen={ () => setCookieBannerOpened(true) }
                onClose={ onCloseCookieBanner }
                onClosed={ () => setCookieBannerOpened(false) }
            ></CookieBanner>
        }
    </>;
}

function Layout({ children }: LayoutProps) {
    return <>
        { children }

        <Footer></Footer>

        <CookieBannerLayout></CookieBannerLayout>
    </>;
}

export default Layout;
