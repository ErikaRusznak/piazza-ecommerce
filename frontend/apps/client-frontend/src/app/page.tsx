"use client";

import MainLayout from "@/components/templates/MainLayout";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import {useTheme} from "@mui/material/styles";
import { useRouter } from "next/navigation";
import {useThemeToggle} from "ui";

const HomePage = () => {
    const theme = useTheme();
    const {isDark} = useThemeToggle();
    const router = useRouter();

    return (
        <MainLayout>
            <Box
                sx={{
                    height: "80%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",

                }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        color: isDark ? theme.palette.lightColor.main : theme.palette.primary.main,
                        fontSize: { xxs: "32px", sm: "40px", md: "50px" },
                        lineHeight: { xs: 1.2 },
                        mb: 2,
                    }}
                >
                    Fresh products every day
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: theme.palette.info.main,
                        width: "70%",
                        mb: 4,
                        fontSize: { xxs: "16px", sm: "18px", md: "20px" },
                    }}
                >
                    Quality-based products brought to you with fast shipping directly from the producers!
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xxs: "column", sm: "row" },
                        gap: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            background: isDark ? theme.palette.secondary.main : theme.palette.lightColor.main,
                            color: theme.palette.info.main,
                            "&:hover": { background: theme.palette.tertiary.main },
                            fontSize: { xs: "14px", sm: "16px", md: "18px" },
                        }}
                        onClick={() => {
                            router.push("/shop");
                        }}
                    >
                        Check our products
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: theme.palette.primary.main,
                            color: theme.palette.info.main,
                            "&:hover": { borderColor: theme.palette.tertiary.main },
                            fontSize: { xs: "14px", sm: "16px", md: "18px" },
                        }}
                        onClick={() => {
                            router.push("/login");
                        }}
                    >
                        Get started
                    </Button>
                </Box>
            </Box>
        </MainLayout>
    );
};

export default HomePage;
