"use client";

import React from "react";
import { forgotPasswordApi } from "../../../api/entities/UserAccount";
import MainLayout from "@/components/templates/MainLayout";
import {PrincipalFormLayout} from "ui";
import {StyledButton} from "ui";
import {Box, Button, Divider, Typography} from "@mui/material";
import { useRouter } from "next/navigation";
import {useTheme} from "@mui/material/styles";
import {useThemeToggle} from "ui";
import {CssTextField} from "ui";
import {useAlert} from "components";

const ForgotPasswordPage = () => {
    const [email, setEmail] = React.useState("");
    const theme = useTheme();
    const {isDark} = useThemeToggle();
    const textColor = isDark ? theme.palette.info.contrastText : theme.palette.info.main;
    const router = useRouter();
    const {pushAlert} = useAlert();

    const handleForgotPassword = async () => {
        forgotPasswordApi(email)
            .then((res) => {
                setEmail("");
                pushAlert({
                    type: "success",
                    title: "Email sent",
                    paragraph: res.data
                });
            })
            .catch((err) => {
                pushAlert({
                    type: "error",
                    title: "Product Added To Wishlist",
                    paragraph: err.response.data
                });
            })
    };


    return (
        <MainLayout>
            <PrincipalFormLayout titleText="Find your account" alignItems="left">
                <>
                    <Divider sx={{ mb: 2, mt: -2 }} />
                    <Typography variant="body1" sx={{ mb: 2, color: textColor }}>
                        To reset your password, please provide your email address below.
                    </Typography>
                    <CssTextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Box sx={{ mt: 3 }}>
                        <Divider sx={{ mb: 2 }} />
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Button
                                variant="outlined"
                                onClick={() => router.push("/login")}
                            >
                                Cancel
                            </Button>
                            <StyledButton
                                variant="contained"
                                onClick={handleForgotPassword}
                            >
                                Search
                            </StyledButton>
                        </Box>
                    </Box>

                </>
            </PrincipalFormLayout>
        </MainLayout>

    );
};

export default ForgotPasswordPage;