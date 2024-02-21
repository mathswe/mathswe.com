// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import CookieBanner from "@ui/legal/CookieBanner.tsx";
import Footer from "./Footer.tsx";
import { ReactNode } from "react";
import { useAppSelector } from "./hooks.ts";
import { selectShow } from "./cookies-slice.ts";
// import { useAppDispatch } from "@/hooks.ts";

const cookiePolicyLink = "/legal#cookies";

interface LayoutProps {
    children: ReactNode;
}

function Layout({ children }: LayoutProps) {
    const showCookieBanner = useAppSelector(selectShow);

    return <>
        { children }

        { showCookieBanner &&
            <CookieBanner cookiePolicyLink={ cookiePolicyLink }></CookieBanner> }

        <Footer></Footer>
    </>;
}

export default Layout;
