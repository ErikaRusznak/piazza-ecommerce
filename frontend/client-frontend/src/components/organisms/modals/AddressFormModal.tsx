import React, {useState} from "react";
import BaseModal from "@/components/templates/BaseModal";
import {Box} from "@mui/system";
import useTheme from "@/theme/themes";
import {COUNTRIES} from "@/components/atoms/countries";
import {object, string} from "yup";
import "yup-phone-lite";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {AddressType} from "@/app/checkout/page";
import {Grid} from "@mui/material";
import FormTextField from "@/components/atoms/form/FormTextField";
import CountrySelector from "@/components/atoms/CountrySelector";
import StyledButton from "@/components/atoms/StyledButton";

type ShippingAddressFormInput = {
    firstName: string;
    lastName: string;
    address: AddressType;
    telephone: string;
};

const ShippingAddressSchema = object().shape({
        firstName: string()
            .required(),
        lastName: string()
            .required(),
        address: object().shape({
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
        }),
        telephone: string()
            .phone("RO", 'Please enter valid RO number')
            .required("Telephone Required")
    })
;

type AddressFormModalProps = {
    onSaveForm: (address: any) => void;
    shippingAddress: any | null;
    toggleModal: () => void;
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
}
const AddressFormModal = ({
                              onSaveForm,
                              shippingAddress,
                              toggleModal,
                              setIsModalOpen,
                              isModalOpen
                          }: AddressFormModalProps) => {
    const theme = useTheme();

    const [isOpen, setIsOpen] = useState(false);
    const [country, setCountry] = useState<string | undefined>(COUNTRIES?.find(option => option.title === shippingAddress?.address.country)?.title)

    const defaultAddressValues = {
        addressLine1: "",
        addressLine2: "",
        city: "",
        country: "",
        state: "",
        zipCode: "",
    };
    const defaultValues = {
        firstName: "",
        lastName: "",
        address: defaultAddressValues,
        telephone: "",
    };

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: {errors},
        getValues,
    } = useForm<ShippingAddressFormInput>({
        resolver: yupResolver(ShippingAddressSchema),
        defaultValues: defaultValues,
    });

    const onSubmit = (values: any) => {
        values.address.country = country;
        const address = {...values, id: shippingAddress.id};
        onSaveForm(address);
    };
    return (
        <BaseModal
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
            children={shippingAddress &&
                <Box sx={{
                    backgroundColor: theme.palette.primary.main,
                    px: 4, pb: 2,
                    borderRadius: "14px",
                    border: "1px solid #93B1A6"
                }}>
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
                            name="address.addressLine1"
                            control={control}
                            label="Street, number"
                            type="text"/>
                        <FormTextField
                            name="address.addressLine2"
                            control={control}
                            label="Block, apartment"
                            type="text"/>
                        <FormTextField
                            name="telephone"
                            control={control}
                            label="Telephone"
                            type="text"/>
                        <Grid container gap={1}>
                            <Grid item xs>
                                <FormTextField
                                    name="address.state"
                                    control={control}
                                    label="State"
                                    type="text"/>
                            </Grid>
                            <Grid item xs>
                                <CountrySelector
                                    id='address.country'
                                    open={isOpen}
                                    onToggle={() => setIsOpen(!isOpen)}
                                    onChange={(val: string) => {
                                        setCountry(COUNTRIES.find(option => option.value === val)?.title)
                                    }}
                                    selectedValue={COUNTRIES.find(option => option.title === country)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container gap={1} >
                            <Grid item xs>
                                <FormTextField
                                    name="address.city"
                                    control={control}
                                    label="City"
                                    type="text"/>
                            </Grid>
                            <Grid item xs>
                                <FormTextField
                                    name="address.zipCode"
                                    control={control}
                                    label="Zip code"
                                    type="text"/>
                            </Grid>
                        </Grid>
                        <StyledButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 2, mb: 2, backgroundColor: theme.palette.background.lighter}}
                            onClick={handleSubmit(onSubmit)}
                        >
                            Save
                        </StyledButton>

                    </form>
                </Box>
            }
        />
    );
};

export default AddressFormModal;