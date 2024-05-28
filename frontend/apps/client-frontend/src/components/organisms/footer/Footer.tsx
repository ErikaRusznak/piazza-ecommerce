"use client";
import {
    Box
} from "@mui/material";
import React from "react";
import {useTheme} from "@mui/material/styles";

export default function Footer() {
    const theme = useTheme();

    const backgroundColorDefault = theme.palette.background.default;

    return (
        <>
            <Box
                component="footer"
                sx={{
                    borderTop: "1px solid #020617",
                    backgroundColor: theme.palette.background.default,
                    bottom: 0,
                    height:"5rem",
                    padding: theme.spacing(2, 2, 2, 2),
                }}
            >
                <Box sx={{color: "white"}}>
                    buzz buzz
                </Box>
                <Box sx={{color: "white"}}>
                    buzz buzz
                </Box>
                <Box sx={{color: "white"}}>
                    buzz buzz
                </Box>
            </Box>
        </>
    );
}