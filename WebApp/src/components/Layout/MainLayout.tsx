import { useState } from "react";
import NavigationBar from "./NavigationBar";

interface MainLayoutProps {
    children: JSX.Element
}

function MainLayout({ children } : MainLayoutProps) {
    return (
        <>
            <NavigationBar></NavigationBar>
            <div className="main_container">{children}</div>
        </>
    );
}

export default MainLayout;