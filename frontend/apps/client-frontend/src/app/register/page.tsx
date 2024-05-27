"use client";

import React, {useState} from "react";
import MainLayout from "@/components/templates/MainLayout";
import * as yup from "yup";
import {api} from "components";
import "yup-phone-lite";
import {useTheme} from "@mui/material/styles";
import {useRouter} from "next/navigation";
import { useAuth } from "components";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {BreadcrumbsComponent} from "ui";
import {Grid} from "@mui/material";
import {FormTextField} from "ui";
import {StyledButton} from "ui";
import {StyledLink} from "ui";
import PrincipalFormLayout from "@/components/templates/PrincipalFormLayout";
import UploadController from "@/components/atoms/upload/UploadController";
import {addImageApi} from "components";

type RegisterFormInput = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
    telephone: string,
};

const getCharacterValidationError = (str: string) => {
    return `Your password must have at least 1 ${str} character`;
};

const RegisterSchema = yup.object().shape({
    password: yup.string()
        .required("Please enter a password")
        .min(8, "Password must have at least 8 characters")
        .max(30, "Password must be at max 30 characters")
        .matches(/[0-9]/, getCharacterValidationError("digit"))
        .matches(/[a-z]/, getCharacterValidationError("lowercase"))
        .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
        .matches(/[!@#%^&*$]/, 'Must contain at least 1 special character'),
    confirmPassword: yup.string()
        .required("Please re-type your password")
        .oneOf([yup.ref("password")], "Passwords does not match"),
    email: yup.string()
        .required("The email field is required")
        .email("Invalid email")
        .test('checkDuplicateEmail', "Email already registered", function (value) {
            return new Promise((resolve) => {
                api.get(`/users/${value}`)
                    .then(() => resolve(false))
                    .catch(() => resolve(true))
            });
        }),
    firstName: yup.string()
        .required("The first name field is required"),
    lastName: yup.string()
        .required("The last name field is required"),
    telephone: yup.string()
        .phone("RO", 'Please enter valid RO number')
        .required("Telephone required"),
});

const RegisterPage = () => {

    const theme = useTheme();
    const router = useRouter();
    const auth = useAuth();

    const [fileName, setFileName] = useState<string>("");

    const breadcrumbsLinks = [
        {label: "Home", link: "/"},
        {label: "Register", link: "/register"}
    ];
    const defaultValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        telephone: "",
    };

    const {
        handleSubmit,
        control,
        formState: {errors},
    } = useForm<RegisterFormInput>({
        resolver: yupResolver(RegisterSchema),
        defaultValues: defaultValues,
    });

    const onSubmit: SubmitHandler<RegisterFormInput> = async (data, e) => {
        e?.preventDefault();
        console.log(Object.keys(errors).length);
        if (Object.keys(errors).length === 0) {
            try {
                await auth.registerUser(data.email, data.password, data.firstName, data.lastName, data.telephone, fileName, "CLIENT");
                router.push("/login");
            } catch (error) {
                console.error(error);
                console.error("Could not register user");
            }
        } else {
            console.log("The data is not provided correctly");
        }
    };

    const handleAddImage = (file: File) => {
        addImageApi(file)
            .then((res) => {
                setFileName(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    };

    return (
        <MainLayout>
            <BreadcrumbsComponent links={breadcrumbsLinks}/>
            <PrincipalFormLayout titleText="Create an account">
                <>
                    <form style={{marginTop: 1}}>
                        <Grid container gap={1} mt={2}>
                            <Grid item xs>
                                <FormTextField
                                    name="firstName"
                                    control={control}
                                    label="First Name"
                                    type="text"/>
                            </Grid>
                            <Grid item xs>
                                <FormTextField
                                    name="lastName"
                                    control={control}
                                    label="Last Name"
                                    type="text"/>
                            </Grid>
                        </Grid>
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
                        <FormTextField
                            name="confirmPassword"
                            control={control}
                            label="Confirm Password"
                            type="password"/>
                        <FormTextField
                            name="telephone"
                            control={control}
                            label={"Phone number"}
                            type="text"/>
                        <UploadController
                            onFileChange={handleAddImage}
                            fileName={fileName}
                            setFileName={setFileName}
                        />
                        <StyledButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2, backgroundColor: theme.palette.background.lighter}}
                            onClick={handleSubmit(onSubmit)}
                        >
                            Sign Up
                        </StyledButton>
                    </form>
                    <Grid container gap={1} mt={2}>
                        <Grid item xs>
                            <StyledLink href="/login" sx={{fontSize: "0.9rem"}}>
                                Already have an account?
                            </StyledLink>
                        </Grid>

                    </Grid>
                </>
            </PrincipalFormLayout>
        </MainLayout>
    );
};

export default RegisterPage;

