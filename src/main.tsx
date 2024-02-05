import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/msw-engineer.css";
import { RouterProvider } from "react-router-dom";
import { router } from "@/router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={ router } />
    </React.StrictMode>,
);
