"use client";
import {
    Box, Typography
} from "@mui/material";
import React from "react";
import {useTheme} from "@mui/material/styles";

export default function Footer() {
    const theme = useTheme();

    return (
        <Box sx={{
            width: "95vw",
            maxWidth: "xl",
        }}>
            <Box sx={{
                py: "1rem",
                textTransform: "uppercase"
            }}>
                <Typography color={theme.palette.info.main}>
                    &#169; Fresh Corner S.R.L. 2024. All rights reserved.
                </Typography>
            </Box>

        </Box>
    );
}