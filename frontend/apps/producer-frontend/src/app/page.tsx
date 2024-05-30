"use client";

import MainLayout from "@/components/templates/MainLayout";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import {useTheme} from "@mui/material/styles";
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
                        color: theme.palette.lightColor.main,
                        fontSize: { xxs: "32px", sm: "40px", md: "50px" },
                        lineHeight: { xxs: 1.2 },
                        mb: 2,
                    }}
                >
                    Welcome, Seller!
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: theme.palette.info.main,
                        width: "70%",
                        fontSize: { xxs: "16px", sm: "18px", md: "20px" },
                    }}
                >
                    Manage your online store efficiently with our tools.
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xxs: "column", sm: "row" },
                        gap: 2,
                        mt: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            background: theme.palette.secondary.main,
                            color: theme.palette.info.main,
                            "&:hover": { background: theme.palette.tertiary.main },
                            fontSize: { xxs: "14px", sm: "16px", md: "18px" },
                        }}
                        onClick={() => {
                            router.push("/products");
                        }}
                    >
                        Manage products
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: theme.palette.primary.main,
                            color: theme.palette.info.main,
                            "&:hover": { borderColor: theme.palette.tertiary.main },
                            fontSize: { xxs: "14px", sm: "16px", md: "18px" },
                        }}
                        onClick={() => {
                            router.push("/orders");
                        }}
                    >
                        Check orders
                    </Button>

                </Box>
            </Box>
        </MainLayout>
    );
};

export default HomePage;
