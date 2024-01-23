"use client";

import React from "react";
import Link from "next/link";
import {AppBar, Toolbar} from "@mui/material";
import {Box} from "@mui/system";
import useTheme from "@/theme/themes";

const NavigationBar = () => {

    const theme = useTheme();
    const backgroundColor = theme.palette.background.default;

    return (
        <>
            <AppBar
                color="default"
                elevation={0}
                sx={{
                    background: backgroundColor,
                }}
            >
                <Box maxWidth="lg">
                    <Toolbar>
                        <Link href="/">
                            LOGO
                        </Link>
                        <Box sx={{flexGrow: 1}}></Box>
                        <Box sx={{display: {xs: "none", md: "contents"}}}>
                        </Box>

                    </Toolbar>
                </Box>
            </AppBar>
        </>
    );
};
export default NavigationBar;
