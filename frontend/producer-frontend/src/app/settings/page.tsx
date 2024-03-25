"use client";

import React from "react";
import useTheme from "@/theme/themes";
import MainLayout from "@/components/templates/MainLayout";
import Typography from "@mui/material/Typography";

const SettingsPage = () => {

    const theme = useTheme();

    return (
        <MainLayout>
            <Typography>Settings page</Typography>
        </MainLayout>
    );
};

export default SettingsPage;