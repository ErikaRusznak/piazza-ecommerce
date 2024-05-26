"use client";

import React from "react";
import { forgotPasswordApi } from "../../../api/entities/UserAccount";
import MainLayout from "@/components/templates/MainLayout";
import PrincipalFormLayout from "@/components/templates/PrincipalFormLayout";
import StyledButton from "@/components/atoms/StyledButton";
import {Box, Button, Divider, Typography} from "@mui/material";
import { useRouter } from "next/navigation";
import {useTheme} from "@mui/material/styles";
import {useThemeToggle} from "ui";
import {CssTextField} from "@/components/atoms/CssTextField";

const ForgotPasswordPage = () => {
    const [email, setEmail] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState("");
    const theme = useTheme();
    const {isDark} = useThemeToggle();
    const textColor = isDark ? theme.palette.info.contrastText : theme.palette.info.main;
    const router = useRouter();

    const handleForgotPassword = async () => {
        forgotPasswordApi(email)
            .then((res) => {
                setSuccessMessage(res.data);
                setErrorMessage("");
            })
            .catch((err) => {
                setErrorMessage(err.response.data);
                setSuccessMessage("");
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
                    {errorMessage && (
                        <Typography color="error" variant="body2" sx={{mb: 2}}>
                            {errorMessage}
                        </Typography>
                    )}
                    {successMessage && (
                        <Typography color="green" variant="body2" sx={{ mb: 2 }}>
                            {successMessage}
                        </Typography>
                    )}
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