"use client";

import React from "react";
import MainLayout from "@/components/templates/MainLayout";
import BreadcrumbsComponent from "@/components/atoms/BreadcrumbsComponent";
import {Container,Typography} from "@mui/material";
import PrincipalFormLayout from "@/components/templates/PrincipalFormLayout";
import FormTextField from "@/components/atoms/form/light/FormTextFields";
import StyledButton from "@/components/atoms/StyledButton";
import useTheme from "@/theme/themes";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormTextArea from "@/components/atoms/form/light/FormTextArea";
import {createSellerRequestApi} from "../../../api/entities/SellerRequestApi";

type SendRequestInput = {
    email: string;
    reason: string;
}

const SendRequestSchema = yup.object().shape({
    email: yup.string().required("You must provide a username"),
    reason: yup.string().required("You must provide a reason"),
});

const SendRequestPage = () => {

    const theme = useTheme();
    const [errorMessage, setErrorMessage] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState("");

    const breadcrumbsLinks = [
        {label: "Home", link: "/"},
        {label: "Send request", link: "/send-request"}
    ];

    const onSubmit: SubmitHandler<SendRequestInput> = async (data, e) => {
        createSellerRequestApi({
            sellerEmail: data.email,
            reason: data.reason
        }).then((res) => {
            setSuccessMessage("Request was sent successfully!");
            setErrorMessage("");
        }).catch((err) => {
            setErrorMessage("Sending request failed! Try again.");
            setSuccessMessage("");
        })
    };

    const {
        handleSubmit,
        control,
    } = useForm<SendRequestInput>({
        resolver: yupResolver(SendRequestSchema),
        defaultValues: {
            email: "",
            reason: "",
        }
    });

    return (
        <MainLayout>
            <BreadcrumbsComponent links={breadcrumbsLinks}/>
            <Container maxWidth="sm">
                <PrincipalFormLayout titleText="Request for creating account">
                    <>
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
                        <form style={{marginTop: 1}}>
                            <FormTextField
                                name="email"
                                control={control}
                                label="Email"
                                type="text"/>
                            <FormTextArea
                                name="reason"
                                control={control}
                                label="Provide a reason for being a seller on this portal"
                                type="reason"/>
                            <StyledButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 2, mb: 1, backgroundColor: theme.palette.background.lighter}}
                                onClick={handleSubmit(onSubmit)}
                            >
                                Submit request
                            </StyledButton>
                        </form>

                    </>
                </PrincipalFormLayout>
            </Container>

        </MainLayout>
    );
};

export default SendRequestPage;