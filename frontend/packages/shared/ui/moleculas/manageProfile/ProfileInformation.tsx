"use client";
import {Typography} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import {Box} from "@mui/material";
import {object} from "yup";
import * as yup from "yup";
import {api, useAlert} from "components";
import {Resolver, SubmitHandler} from "react-hook-form";
import { useForm } from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import "yup-phone-lite";
import FormTextFieldDarkBackground from "../../atoms/form/dark/FormTextFieldDarkBackground";
import StyledButton from "../../atoms/StyledButton";
import {updateUserAccountApi} from "components";

type ProfileInformationFormInput = {
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
};

type UserType = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    imageName: string | null;
    password: string;
    telephone: string;
    userRole: string;
};

type ProfileInformationProps = {
    user: UserType;
    setUser: (data: UserType) => void;
};

const profileInformationSchema = object().shape({
    email: yup.string()
        .required("The email field is required")
        .email("Invalid email")
        .test('checkDuplicateEmail', "Email already registered", function (value) {
            if (value === this.parent.email) {
                return true;
            }
            return new Promise((resolve) => {
                api.get(`/api/users/${value}`)
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

const ProfileInformation = ({user, setUser}:ProfileInformationProps) => {

    const theme = useTheme();
    const {pushAlert} = useAlert();

    const {
        handleSubmit,
        control,
        formState: {errors},
    } = useForm<ProfileInformationFormInput>({
        resolver: yupResolver(profileInformationSchema) as Resolver<ProfileInformationFormInput>,
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            telephone: user.telephone
        },
    });

    const onSubmit: SubmitHandler<ProfileInformationFormInput> = async (values:any) => {
        updateUserAccountApi(user.id, values.firstName, values.lastName, values.email, user.imageName, values.telephone)
            .then((res) => {
                setUser(res.data);
                pushAlert({
                    type: "success",
                    title: "Profile information",
                    paragraph: "Profile information was updated successfully!"
                });
            })
            .catch((err) => {
                console.error(err);
                pushAlert({
                    type: "error",
                    title: "Profile information",
                    paragraph: "Could not update profile information."
                });
            })
    };

    return user ? (
        <Box sx={{border: "1px solid #a5b4fc", borderRadius: "14px", p: 2}}>
            <Typography variant="h5" sx={{color: theme.palette.info.main, mb:2}}>Profile Information</Typography>
            <form onSubmit={handleSubmit(onSubmit)} style={{}}>
                <FormTextFieldDarkBackground
                    name="firstName"
                    control={control}
                    label="First name"
                    type="text"/>
                <FormTextFieldDarkBackground
                    name="lastName"
                    control={control}
                    label="Last name"
                    type="text"/>
                <FormTextFieldDarkBackground
                    name="email"
                    control={control}
                    label="Email"
                    type="text"/>
                <FormTextFieldDarkBackground
                    name="telephone"
                    control={control}
                    label="Phone number"
                    type="text"/>
                <StyledButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 2, mb: 1, backgroundColor: theme.palette.background.lighter}}
                >
                    Update profile
                </StyledButton>
            </form>

        </Box>
    ) :null;
};

export default ProfileInformation;