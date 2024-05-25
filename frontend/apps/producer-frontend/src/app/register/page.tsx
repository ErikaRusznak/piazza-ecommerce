"use client";

import React, {useEffect, useState} from "react";
import {useForm, useWatch} from "react-hook-form";
import * as yup from "yup";
import "yup-phone-lite";
import useTheme from "@/theme/themes";
import {useRouter} from "next/navigation";
import {useAuth} from "../../../api/auth/AuthContext";
import {SubmitHandler} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import BreadcrumbsComponent from "@/components/atoms/Breadcrumbs";
import {Box, Grid, Typography} from "@mui/material";
import StyledButton from "@/components/atoms/StyledButton";
import StyledLink from "@/components/atoms/StyledLink";
import PrincipalFormLayout from "@/components/templates/PrincipalFormLayout";
import FormTextField from "@/components/atoms/form/light/FormTextFields";
import MainLayout from "@/components/templates/MainLayout";
import UploadController from "@/components/atoms/upload/UploadController";
import {addImageApi} from "components";
import FormSelectField from "@/components/atoms/form/light/FormSelectField";
import DatePickerField from "@/components/atoms/form/light/DatePickerField";

const sellerTypes = [
    {id: 1, name: "LOCAL_FARMER"},
    {id: 2, name: "COMPANY"},
    {id: 3, name: "PFA"},
];

const companyTypes = [
    {id: 1, name: "J"},
    {id: 2, name: "F"},
    {id: 3, name: "C"}
];

type RegisterFormInput = {
    // account
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    telephone: string;

    // legal address
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;

    alias: string;
    sellerType: string;

    companyType?: string;
    numericCodeByState?: number;
    serialNumber?: number;
    dateOfRegistration?: string;
    companyName?: string;
    cui?: string;
};

const getCharacterValidationError = (str: string) => {
    return `Your password must have at least 1 ${str} character`;
};

const RegisterSchema = yup.object().shape({
    password: yup
        .string()
        .required("Please enter a password")
        .min(8, "Password must have at least 8 characters")
        .max(30, "Password must be at max 30 characters")
        .matches(/[0-9]/, getCharacterValidationError("digit"))
        .matches(/[a-z]/, getCharacterValidationError("lowercase"))
        .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
        .matches(/[!@#%^&*$]/, "Must contain at least 1 special character"),
    confirmPassword: yup
        .string()
        .required("Please re-type your password")
        .oneOf([yup.ref("password")], "Passwords does not match"),
    email: yup.string().required("The email field is required").email("Invalid email"),
    firstName: yup.string().required("The first name field is required"),
    lastName: yup.string().required("The last name field is required"),
    telephone: yup.string().required("Telephone required"),
    addressLine1: yup.string().required("Address Line 1 is required"),
    addressLine2: yup.string().required("Address Line 2 is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    country: yup.string().required("Country is required"),
    zipCode: yup.string().required("Zip Code is required"),
    alias: yup.string().required("Seller Alias is required"),
    sellerType: yup.string().required("Seller Type is required"),
    companyName: yup.string().when("sellerType", {
        is: (sellerType: any) => sellerType !== "LOCAL_FARMER",
        then: () => yup.string().required("Company name is required"),
    }),
    cui: yup.string().when("sellerType", {
        is: (sellerType: any) => sellerType !== "LOCAL_FARMER",
        then: () => yup.string().required("CUI is required"),
    }),
    companyType: yup.string().when("sellerType", {
        is: (sellerType: any) => sellerType !== "LOCAL_FARMER",
        then: () => yup.string().required("Company type is required"),
    }),
    numericCodeByState: yup.number().when("sellerType", {
        is: (sellerType: any) => sellerType !== "LOCAL_FARMER",
        then: () => yup.number()
            .required("Numeric code by state is required")
            .min(1, "Numeric code must be greater than or equal to 1"),
    }),
    serialNumber: yup.number().when("sellerType", {
        is: (sellerType: any) => sellerType !== "LOCAL_FARMER",
        then: () => yup.number()
            .required("Serial number is required")
            .min(1, "Serial number must be greater than or equal to 1"),
    }),
    dateOfRegistration: yup.string().when("sellerType", {
        is: (sellerType: any) => sellerType !== "LOCAL_FARMER",
        then: () => yup.string().required("Date of registration is required"),
    }),
});

const RegisterPage = () => {
    const theme = useTheme();
    const router = useRouter();
    const auth = useAuth();
    const [fileName, setFileName] = useState<string>("");
    const [showLegalDetails, setShowLegalDetails] = useState(false);

    const defaultValues: RegisterFormInput = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        telephone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
        alias: "",
        sellerType: sellerTypes[0].name,
        companyName: "",
        cui: "",
        companyType: companyTypes[0].name,
        numericCodeByState: 0,
        serialNumber: 0,
        dateOfRegistration: "2017-05-24",
    };

    const {
        handleSubmit,
        control,
        formState: {errors}
    } = useForm<RegisterFormInput>({
        resolver: yupResolver(RegisterSchema),
        defaultValues: defaultValues
    });

    const sellerType = useWatch({
        control,
        name: "sellerType"
    });

    useEffect(() => {
        if (sellerType === "COMPANY" || sellerType === "PFA") {
            setShowLegalDetails(true);
        } else {
            setShowLegalDetails(false);
        }
    }, [sellerType]);


    const onSubmit: SubmitHandler<RegisterFormInput> = async (data, e) => {
        e?.preventDefault();
        if (Object.keys(errors).length === 0) {
            try {
                await auth.registerUser(data);
                router.push("/login");
            } catch (error) {
                console.error("Could not register user");
            }
        } else {
            console.log("The data is not provided correctly");
        }
        console.log("data", data);
    };

    const handleAddImage = (file: File) => {
        addImageApi(file)
            .then((res) => {
                setFileName(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <MainLayout>
            <BreadcrumbsComponent
                links={[
                    {label: "Home", link: "/"},
                    {label: "Register", link: "/register"},
                ]}
            />
            <PrincipalFormLayout titleText="Create an account">
                <>
                    <Typography gutterBottom color={theme.palette.info.contrastText}>
                        Before you register, please make sure you that you sent a request to the admin for being able create an account!
                    </Typography>
                    <Typography gutterBottom color={theme.palette.info.contrastText}>
                        If you did not send a request, try <StyledLink href="/send-request">here</StyledLink>!
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{display: "flex", gap: 2}}>
                            <Box>
                                {/* Account Section */}
                                <Typography variant="h6" gutterBottom color={theme.palette.info.contrastText}>
                                    Account Information
                                </Typography>
                                <Box sx={{display: "flex", flexDirection: "row", gap: 2}}>
                                    <FormTextField name="firstName" control={control} label="First Name" type="text"/>
                                    <FormTextField name="lastName" control={control} label="Last Name" type="text"/>
                                </Box>
                                <FormTextField name="email" control={control} label="Email" type="text"/>
                                <FormTextField name="password" control={control} label="Password" type="password"/>
                                <FormTextField name="confirmPassword" control={control} label="Confirm Password" type="password"/>
                                <FormTextField name="telephone" control={control} label="Phone number" type="text"/>
                                <FormTextField name="alias" control={control} label="Seller Alias" type="text"/>
                                <FormSelectField name="sellerType" control={control} label="Seller Type" items={sellerTypes}/>
                                <UploadController
                                    onFileChange={handleAddImage}
                                    fileName={fileName}
                                    setFileName={setFileName}
                                />
                            </Box>

                            <Box>
                                <Typography variant="h6" gutterBottom color={theme.palette.info.contrastText}>
                                    Legal Address
                                </Typography>
                                <FormTextField name="addressLine1" control={control} label="Address Line 1" type="text"/>
                                <FormTextField name="addressLine2" control={control} label="Address Line 2" type="text"/>
                                <FormTextField name="city" control={control} label="City" type="text"/>
                                <FormTextField name="state" control={control} label="State" type="text"/>
                                <FormTextField name="country" control={control} label="Country" type="text"/>
                                <FormTextField name="zipCode" control={control} label="Zip Code" type="text"/>
                            </Box>

                            {/* Legal Details Section */}
                            <Box>
                                {showLegalDetails && (
                                    <>
                                        <Typography variant="h6" gutterBottom color={theme.palette.info.contrastText}>
                                            Legal Details
                                        </Typography>
                                        <FormTextField name="companyName" control={control} label="Company Name" type="text"/>
                                        <FormTextField name="cui" control={control} label="CUI" type="text"/>
                                        <FormTextField name="numericCodeByState" control={control} label="Numeric Code By State" type="number"/>
                                        <FormSelectField name="companyType" control={control} label="Company Type" items={companyTypes}/>
                                        <FormTextField name="serialNumber" control={control} label="Serial Number" type="number"/>
                                        <DatePickerField name="dateOfRegistration" control={control} label="Date of Registration" type="date" />
                                    </>
                                )}
                            </Box>
                        </Box>
                    </form>
                    <StyledButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2, backgroundColor: theme.palette.background.lighter}}
                        onClick={handleSubmit(onSubmit)}
                    >
                        Register
                    </StyledButton>
                    <Grid container mt={2}>
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
