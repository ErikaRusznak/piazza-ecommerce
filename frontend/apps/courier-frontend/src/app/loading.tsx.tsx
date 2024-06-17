"use client";

import React from "react";
import {Box, CircularProgress} from '@mui/material';
import MainLayout from "@/components/templates/MainLayout";
import {useThemeToggle} from "ui";
import {useTheme} from "@mui/material/styles";

const LoadingPage = () => {

    const theme = useTheme();
    const {isDark} = useThemeToggle();
    return (
        <MainLayout>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <CircularProgress sx={{color: isDark ? theme.palette.lightColor.main : theme.palette.primary.main}}/>
            </Box>

        </MainLayout>
    );
};

export default LoadingPage;