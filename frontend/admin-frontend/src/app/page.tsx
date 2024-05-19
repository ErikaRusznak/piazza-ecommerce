"use client";

import MainLayout from "@/components/templates/MainLayout";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import useTheme from "@/theme/themes";
import { useRouter } from "next/navigation";

const HomePage = () => {
    const theme = useTheme();
    const router = useRouter();

    return (
        <MainLayout>
            <Box
                sx={{
                    height: "50%",
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
                        color: theme.palette.primary.main,
                        fontSize: { xs: "32px", sm: "40px", md: "50px" },
                        lineHeight: { xs: 1.2 },
                        mb: 2,
                    }}
                >
                    Welcome, Admin!
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: theme.palette.info.main,
                        width: "70%",
                        mb: 4,
                        fontSize: { xs: "16px", sm: "18px", md: "20px" },
                    }}
                >
                    Manage your online store efficiently with our tools.
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            background: theme.palette.lightColor.main,
                            color: theme.palette.info.main,
                            "&:hover": { background: theme.palette.primary.main },
                            fontSize: { xs: "14px", sm: "16px", md: "18px" },
                        }}
                        onClick={() => {
                            router.push("/categories");
                        }}
                    >
                        Manage categories
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: theme.palette.lightColor.main,
                            color: theme.palette.info.main,
                            "&:hover": { borderColor: theme.palette.primary.main },
                            fontSize: { xs: "14px", sm: "16px", md: "18px" },
                        }}
                        onClick={() => {
                            router.push("/sellers");
                        }}
                    >
                        Check sellers
                    </Button>
                </Box>
            </Box>
        </MainLayout>
    );
};

export default HomePage;
