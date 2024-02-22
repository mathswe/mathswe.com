// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import Footer from "./Footer.tsx";
import { ReactNode } from "react";
import CookieBannerConsent from "@app/legal/CookieBannerConsent.tsx";

interface LayoutProps {
    children: ReactNode;
}

function Layout({ children }: LayoutProps) {
    return <>
        { children }

        <Footer />

        <CookieBannerConsent />
    </>;
}

export default Layout;
