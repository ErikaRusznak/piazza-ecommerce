"use client";

import React, {useState} from "react";
import MainLayout from "@/components/templates/MainLayout";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {
    Alert, AlertTitle,
    Container, Grid,
} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {useRouter} from "next/navigation";
import {useAuth} from "../../../api/auth/AuthContext";
import {StyledButton, useThemeToggle} from "ui";
import {StyledLink} from "ui";
import * as yup from "yup";
import PrincipalFormLayout from "@/components/templates/PrincipalFormLayout";
import {FormTextField} from "ui";
import {BreadcrumbsComponent} from "ui";

type LoginFormInput = {
    email: string;
    password: string;
}

const LoginSchema = yup.object().shape({
    email: yup.string().required("You must provide a username"),
    password: yup.string().required("You must provide a password"),
});

const LoginPage = () => {

    const theme = useTheme();
    const router = useRouter();
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const auth = useAuth();

    const breadcrumbsLinks = [
        {label: "Home", link: "/"},
        {label: "Login", link: "/login"}
    ];

    const onSubmit: SubmitHandler<LoginFormInput> = async (data, e) => {
        e?.preventDefault();
        const loginSuccess = await auth.login(data.email, data.password);
        if (loginSuccess) {
            router.push("/");
        } else {
            setShowErrorMessage(true);
        }
    };

    const {
        handleSubmit,
        control,
    } = useForm<LoginFormInput>({
        resolver: yupResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    return (
        <MainLayout>
            <BreadcrumbsComponent links={breadcrumbsLinks}/>
            <Container maxWidth="sm">
                <PrincipalFormLayout titleText="Sign in to your account">
                    <>
                        {showErrorMessage && (
                            <Alert
                                severity="error"
                                sx={{
                                    backgroundColor: "#fc00005e",
                                    paddingBottom: 0,
                                    marginBottom: 2,
                                    color: theme.palette.error.contrastText,
                                }}
                            >
                                <AlertTitle sx={{fontSize: "0.9rem"}}>
                                    Authentication Failed. Please check your credentials
                                </AlertTitle>
                            </Alert>
                        )}
                        <form style={{marginTop: 1}}>
                            <FormTextField
                                name="email"
                                control={control}
                                label="Email"
                                type="text"/>
                            <FormTextField
                                name="password"
                                control={control}
                                label="Password"
                                type="password"/>
                            <StyledButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2, backgroundColor: theme.palette.background.lighter}}
                                onClick={handleSubmit(onSubmit)}
                            >
                                Sign In
                            </StyledButton>
                        </form>
                        <Grid container gap={1} mt={2}>
                            <Grid item xs>
                                <StyledLink href="/forgot-password" sx={{fontSize: "0.9rem"}}>
                                    Forgot password?
                                </StyledLink>
                            </Grid>
                            <Grid item>
                                <StyledLink href="/register" sx={{fontSize: "0.9rem"}}>
                                    {"Don't have an account? Sign Up"}
                                </StyledLink>
                            </Grid>
                        </Grid>
                    </>
                </PrincipalFormLayout>
            </Container>

        </MainLayout>
    );
};

export default LoginPage;
