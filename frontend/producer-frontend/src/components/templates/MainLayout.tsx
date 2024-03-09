"use client";

import React from "react";
import useTheme from "@/theme/themes";
import Navigation from "@/components/organisms/navigation/Navigation";

type MainLayoutProps = {
    children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    const theme = useTheme();

    return (
        <Navigation>
            {children}
        </Navigation>
    );
};

export default MainLayout;
