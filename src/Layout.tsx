// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import Footer from "@/Footer.tsx";
import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

function Layout({ children }: LayoutProps) {
    return <>
        { children }

        <Footer></Footer>
    </>;
}

export default Layout;
