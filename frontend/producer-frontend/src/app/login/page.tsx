"use client";

import React, {useState} from "react";
import MainLayout from "@/components/templates/MainLayout";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {
    Alert, AlertTitle,
    Checkbox,
    FormControlLabel,
    Grid,
} from "@mui/material";
import useTheme from "@/theme/themes";
import {useRouter} from "next/navigation";
import {useAuth} from "../../../api/auth/AuthContext";
import StyledButton from "@/components/atoms/StyledButton";
import StyledLink from "@/components/atoms/StyledLink";
import * as yup from "yup";
import PrincipalFormLayout from "@/components/templates/PrincipalFormLayout";
import FormTextField from "@/components/atoms/form/light/FormTextFields";
import BreadcrumbsComponent from "@/components/atoms/BreadcrumbsComponent";

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
    const textColor = theme.palette.info.contrastText;

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
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: {errors},
        getValues,
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
                            <AlertTitle sx={{fontSize: "0.9rem"}}>Authentication Failed. Please check your
                                credentials</AlertTitle>
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
                        <FormControlLabel
                            control={<Checkbox value="remember" sx={{color: textColor}}/>}
                            label="Remember me"
                            sx={{color: textColor}}
                        />
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
                            <StyledLink href="#" sx={{fontSize: "0.9rem"}}>
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
        </MainLayout>
    );
};

export default LoginPage;
