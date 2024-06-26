"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {resetPasswordApi} from "../../../api/entities/UserAccount";
import MainLayout from "@/components/templates/MainLayout";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {PrincipalFormLayout} from "ui";
import {FormTextField} from "ui";
import {StyledButton} from "ui";
import {useTheme} from "@mui/material/styles";
import {useAlert} from "components";

type ResetPasswordPageProps = {
    searchParams: {
        token: string;
    }
};

type ResetPasswordFormInput = {
    newPassword: string,
    confirmPassword: string,
};

const getCharacterValidationError = (str: string) => {
    return `Your password must have at least 1 ${str} character`;
};

const ResetPasswordSchema = yup.object().shape({
    newPassword: yup.string()
        .required("Please enter a password")
        .min(8, "Password must have at least 8 characters")
        .max(30, "Password must be at max 30 characters")
        .matches(/[0-9]/, getCharacterValidationError("digit"))
        .matches(/[a-z]/, getCharacterValidationError("lowercase"))
        .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
        .matches(/[!@#%^&*$]/, 'Must contain at least 1 special character'),
    confirmPassword: yup.string()
        .required("Please re-type your password")
        .oneOf([yup.ref("newPassword")], "Passwords does not match"),
});

const ResetPasswordPage = ({searchParams}:ResetPasswordPageProps) => {
    const router = useRouter();
    const theme = useTheme();
    const token  = decodeURIComponent(searchParams.token);
    const {pushAlert} = useAlert();

    const defaultValues = {
        password: "",
        confirmPassword: "",
    };

    const {
        handleSubmit,
        control,
        formState: {errors},
    } = useForm<ResetPasswordFormInput>({
        resolver: yupResolver(ResetPasswordSchema),
        defaultValues: defaultValues,
    });


    const onSubmit: SubmitHandler<ResetPasswordFormInput> = async (data, e) => {
        e?.preventDefault();
        resetPasswordApi(token, data.newPassword)
            .then((res) => {
                pushAlert({
                    type: "success",
                    title: "Password reset",
                    paragraph: "Password was updated successfully!"
                });
                router.push("/login")
            })
            .catch((err) => {
                console.error(err);
                pushAlert({
                    type: "error",
                    title: "Password reset",
                    paragraph: "Could not update password."
                });
            })
    };

    return (
        <MainLayout>
            <PrincipalFormLayout titleText="Reset password">
                <>
                    <form style={{marginTop: 1}}>
                        <FormTextField
                            name="newPassword"
                            control={control}
                            label="New Password"
                            type="password"/>
                        <FormTextField
                            name="confirmPassword"
                            control={control}
                            label="Confirm Password"
                            type="password"/>
                        <StyledButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2, backgroundColor: theme.palette.background.lighter}}
                            onClick={handleSubmit(onSubmit)}
                        >
                            Reset password
                        </StyledButton>
                    </form>
                </>
            </PrincipalFormLayout>
        </MainLayout>
    );
};

export default ResetPasswordPage;
