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
import {Grid} from "@mui/material";
import StyledButton from "@/components/atoms/StyledButton";
import StyledLink from "@/components/atoms/StyledLink";
import PrincipalFormLayout from "@/components/templates/PrincipalFormLayout";
import FormTextField from "@/components/atoms/form/light/FormTextFields";
import MainLayout from "@/components/templates/MainLayout";
import FormSelectFieldDarkBackground from "@/components/atoms/form/dark/FormSelectFieldDarkBackground";
import UploadController from "@/components/atoms/upload/UploadController";
import {addImageApi} from "../../../api/entities/ImageApi";
import FormSelectField from "@/components/atoms/form/light/FormSelectField";

const sellerTypes = [
    {id: 1, name: "COMPANY"},
    {id: 2, name: "PFA"},
    {id: 3, name: "LOCAL_FARMER"}
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

    sellerAlias: string;
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
    sellerAlias: yup.string().required("Seller Alias is required"),
    sellerType: yup.string().required("Seller Type is required"),
    companyName: yup.string().when("sellerType", {
        is: (sellerType) => sellerType !== "LOCAL_FARMER",
        then: yup.string().required("Company name is required"),
    }),
    cui: yup.string().when("sellerType", {
        is: (sellerType) => sellerType !== "LOCAL_FARMER",
        then: yup.string().required("CUI is required"),
    }),
    companyType: yup.string().when("sellerType", {
        is: (sellerType) => sellerType !== "LOCAL_FARMER",
        then: yup.string().required("Company type is required"),
    }),
    numericCodeByState: yup.number().when("sellerType", {
        is: (sellerType) => sellerType !== "LOCAL_FARMER",
        then: yup.number()
            .required("Numeric code by state is required")
            .min(1, "Price must be greater than or equal to 0"),
    }),
    serialNumber: yup.number().when("sellerType", {
        is: (sellerType) => sellerType !== "LOCAL_FARMER",
        then: yup.number()
            .required("Serial number is required")
            .min(1, "Price must be greater than or equal to 0"),
    }),
    dateOfRegistration: yup.string().when("sellerType", {
        is: (sellerType) => sellerType !== "LOCAL_FARMER",
        then: yup.string().required("Date of registration is required"),
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
        sellerAlias: "",
        sellerType: sellerTypes[0],
        companyName: "",
        cui: "",
        companyType: companyTypes[0],
        numericCodeByState: 0,
        serialNumber: 0,
        dateOfRegistration: "",
    };

    const {
        handleSubmit,
        control,
        formState: {errors},
        getValues,
    } = useForm<RegisterFormInput>({
        mode: "onBlur",
        resolver: yupResolver(RegisterSchema),
        defaultValues: defaultValues
    });

    const sellerType = useWatch({
        control,
        name: "sellerType"
    });


    useEffect(() => {
        // Toggle legal details form fields visibility based on selected seller type
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
                    <form onSubmit={handleSubmit(onSubmit)} style={{marginTop: 1}}>
                        <Grid container spacing={4}>
                            {/* account related */}
                            <Grid item xs={12} sm={6}>
                                <FormTextField
                                    name="firstName"
                                    control={control}
                                    label="First Name"
                                    type="text"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormTextField
                                    name="lastName"
                                    control={control}
                                    label="Last Name"
                                    type="text"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormTextField
                                    name="email"
                                    control={control}
                                    label="Email"
                                    type="text"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormTextField
                                    name="password"
                                    control={control}
                                    label="Password"
                                    type="password"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormTextField
                                    name="confirmPassword"
                                    control={control}
                                    label="Confirm Password"
                                    type="password"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormTextField
                                    name="telephone"
                                    control={control}
                                    label="Phone number"
                                    type="text"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormSelectField
                                    name="sellerType"
                                    control={control}
                                    label="Seller Type"
                                    items={sellerTypes}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <UploadController
                                    onFileChange={handleAddImage}
                                    fileName={fileName}
                                    setFileName={setFileName}
                                />
                            </Grid>

                            {/* legal address */}
                            <Grid item xs={12} sm={6}>
                                <FormTextField
                                    name="addressLine1"
                                    control={control}
                                    label="Address Line 1"
                                    type="text"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormTextField
                                    name="addressLine2"
                                    control={control}
                                    label="Address Line 2"
                                    type="text"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormTextField name="city" control={control} label="City" type="text"/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormTextField name="state" control={control} label="State" type="text"/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormTextField
                                    name="country"
                                    control={control}
                                    label="Country"
                                    type="text"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormTextField name="zipCode" control={control} label="Zip Code" type="text"/>
                            </Grid>

                            {/* legal details */}
                            {showLegalDetails && (
                                <>
                                    <Grid item xs={12} sm={6}>
                                        <FormTextField
                                            name="companyName"
                                            control={control}
                                            label="Company Name"
                                            type="text"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormTextField name="cui" control={control} label="CUI" type="text"/>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormSelectFieldDarkBackground
                                            name="companyType"
                                            control={control}
                                            label="Company Type"
                                            items={companyTypes}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormTextField
                                            name="numericCodeByState"
                                            control={control}
                                            label="Numeric Code By State"
                                            type="number"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormTextField
                                            name="serialNumber"
                                            control={control}
                                            label="Serial Number"
                                            type="number"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormTextField
                                            name="dateOfRegistration"
                                            control={control}
                                            label="Date of Registration"
                                            type="text"
                                        />
                                    </Grid>
                                </>
                            )}

                            <Grid item xs={12}>
                                <StyledButton
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        mt: 3,
                                        mb: 2,
                                        backgroundColor: theme.palette.background.lighter,
                                    }}
                                >
                                    Sign Up
                                </StyledButton>
                            </Grid>
                        </Grid>
                    </form>
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
