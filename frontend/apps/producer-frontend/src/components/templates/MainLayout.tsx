"use client";

import React from "react";
import {useTheme} from "@mui/material/styles";
import Navigation from "@/components/organisms/navigation/Navigation";

type MainLayoutProps = {
    children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {

    return (
        <Navigation isSeller={true}>
            {children}
        </Navigation>
    );
};

export default MainLayout;
