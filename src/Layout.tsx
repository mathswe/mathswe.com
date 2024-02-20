// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import CookieBanner from "@/ui/legal/CookieBanner.tsx";
import Footer from "@/Footer.tsx";
import { ReactNode } from "react";

const cookiePolicyLink = "/legal#cookies";

interface LayoutProps {
    children: ReactNode;
}

function Layout({ children }: LayoutProps) {
    const cookies = true;

    return <>
        { children }

        { cookies &&
            <CookieBanner cookiePolicyLink={ cookiePolicyLink }></CookieBanner> }

        <Footer></Footer>
    </>;
}

export default Layout;
