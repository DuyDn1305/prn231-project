import { useState } from "react";
import NavigationBar from "./NavigationBar";

interface MainLayoutProps {
    children: JSX.Element
}

function MainLayout({ children } : MainLayoutProps) {
    return (
        <>
            <NavigationBar></NavigationBar>
            <div className="p-8">{children}</div>
        </>
    );
}

export default MainLayout;