import React, {useState} from "react";
import {Box, Grid, Typography} from "@mui/material";
import {FormTextFieldDarkBackground} from "ui";
import {StyledButton} from "ui";
import {object, string} from "yup";
import "yup-phone-lite";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import CountrySelector from "@/components/atoms/country/CountrySelector";
import {COUNTRIES} from "@/components/atoms/country/countries";
import {useTheme} from "@mui/material/styles";
import {updateSellerAddressApi} from "../../../../api/entities/UserAccount";
import {useAlert} from "components";

const AddressSchema = object().shape({
    addressLine1: string()
        .required(),
    addressLine2: string()
        .required(),
    country: string()
        .required(),
    zipCode: string()
        .required(),
    city: string()
        .required(),
    state: string()
        .required()
});

type AddressDetailsFormProps = {
    setUser: (data: any) => void;
    id: number;
    addressLine1: string;
    addressLine2: string;
    city: string;
    country: string;
    state: string;
    zipCode: string;
};

type AddressDetailsFormInput = {
    addressLine1: string;
    addressLine2: string;
    city: string;
    country: string;
    state: string;
    zipCode: string;
};

const AddressDetailsForm = ({
                                setUser,
                                id,
                                addressLine1,
                                addressLine2,
                                city,
                                country,
                                state,
                                zipCode
                            }: AddressDetailsFormProps) => {

    const defaultValues = {
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        city: city,
        country: country,
        state: state,
        zipCode: zipCode,
    };

    const theme = useTheme();

    const [isOpen, setIsOpen] = useState(false);
    const [countryLocal, setCountryLocal] = useState<string | undefined>(COUNTRIES?.find(option => option.title === country)?.title)
    const {pushAlert} = useAlert();
    const {
        handleSubmit,
        control,
        setValue,
        getValues,
    } = useForm<AddressDetailsFormInput>({
        resolver: yupResolver(AddressSchema),
        defaultValues: defaultValues,
    });

    const onSubmit = () => {
        const values = getValues();
        updateSellerAddressApi(id, values)
            .then(response => {
                pushAlert({
                    type: "success",
                    title: "Legal Address",
                    paragraph: "Legal Address was updated successfully!"
                });
            })
            .catch(error => {
                console.error('Error updating legal address:', error);
                pushAlert({
                    type: "error",
                    title: "Legal Address",
                    paragraph: "Could not update legal address."
                });
            });
    };
    return (
        <Box sx={{p: 2, border: '1px solid #a5b4fc', borderRadius: '14px'}}>
            <Typography variant="h5" sx={{color: theme.palette.info.main, mb: 2}}>Legal Address</Typography>
            <form>
                <Grid container gap={1}>
                    <Grid item xs>
                        <FormTextFieldDarkBackground
                            name="addressLine1"
                            control={control}
                            label="Street, number"
                            type="text"/>
                    </Grid>
                    <Grid item xs>
                        <FormTextFieldDarkBackground
                            name="addressLine2"
                            control={control}
                            label="Block, apartment"
                            type="text"/>
                    </Grid>
                </Grid>
                <Grid container gap={1}>
                    <Grid item xs>
                        <FormTextFieldDarkBackground
                            name="city"
                            control={control}
                            label="City"
                            type="text"/>
                    </Grid>
                    <Grid item xs>
                        <FormTextFieldDarkBackground
                            name="state"
                            control={control}
                            label="State"
                            type="text"/>
                    </Grid>
                </Grid>
                <Grid container gap={1}>
                    <Grid item xs>
                        <FormTextFieldDarkBackground
                            name="zipCode"
                            control={control}
                            label="Zip code"
                            type="text"/>
                    </Grid>
                    <Grid item xs>
                        <CountrySelector
                            id='country'
                            open={isOpen}
                            onToggle={() => setIsOpen(!isOpen)}
                            onChange={(val: string) => {
                                setCountryLocal(COUNTRIES.find(option => option.value === val)?.title);
                                setValue('country', val);
                            }}
                            selectedValue={COUNTRIES.find(option => option.title === countryLocal)}
                        />
                    </Grid>
                </Grid>
                <StyledButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 2, mb: 2.5, backgroundColor: theme.palette.background.lighter}}
                    onClick={handleSubmit(onSubmit)}
                >
                    Update address
                </StyledButton>
            </form>
        </Box>
    );
};

export default AddressDetailsForm;