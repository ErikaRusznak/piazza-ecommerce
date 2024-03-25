import React, {useEffect, useState} from "react";
import BaseModal from "@/components/templates/BaseModal";
import {Box} from "@mui/system";
import useTheme from "@/theme/themes";
import {COUNTRIES} from "@/components/atoms/countries";
import {object, string} from "yup";
import "yup-phone-lite";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {AddressType, ShippingAddressType} from "@/app/checkout/page";
import {Grid, Typography} from "@mui/material";
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
    shippingAddress: ShippingAddressType | null;
    toggleModal: () => void;
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    setEditingAddress: (value: ShippingAddressType|null) => void;
};
const AddressFormModal = ({
                              onSaveForm,
                              shippingAddress,
                              toggleModal,
                              setIsModalOpen,
                              isModalOpen,
                              setEditingAddress
                          }: AddressFormModalProps) => {
    const theme = useTheme();

    const [isOpen, setIsOpen] = useState(false);
    const [country, setCountry] = useState<string | undefined>(COUNTRIES?.find(option => option.title === shippingAddress?.address.country)?.title)

    const isEditing = shippingAddress?.id !== 0;

    const defaultValues = {
        firstName: shippingAddress?.firstName || "",
        lastName: shippingAddress?.lastName || "",
        address: {
            addressLine1: shippingAddress?.address?.addressLine1 || "",
            addressLine2: shippingAddress?.address?.addressLine2 || "",
            city: shippingAddress?.address?.city || "",
            country: shippingAddress?.address?.country || "" || undefined,
            state: shippingAddress?.address?.state || "",
            zipCode: shippingAddress?.address?.zipCode || "",
        },
        telephone: shippingAddress?.telephone || "",
    };

    const {
        handleSubmit,
        control,
        setValue,
        reset
    } = useForm<ShippingAddressFormInput>({
        resolver: yupResolver(ShippingAddressSchema),
        defaultValues: defaultValues,
    });

    const onSubmit: SubmitHandler<ShippingAddressFormInput> = (values) => {
        if (country) {
            values.address.country = country;
        }
        const address = { ...values, id: shippingAddress?.id };
        onSaveForm(address);
        setEditingAddress(null);
        reset(defaultValues);
    };

    useEffect(() => {
        if (shippingAddress) {
            setValue("firstName", shippingAddress.firstName);
            setValue("lastName", shippingAddress.lastName);
            setValue("telephone", shippingAddress.telephone);

            setValue("address.addressLine1", shippingAddress.address.addressLine1);
            setValue("address.addressLine2", shippingAddress.address.addressLine2);
            setValue("address.country", shippingAddress.address.country);
            setValue("address.city", shippingAddress.address.city);
            setValue("address.state", shippingAddress.address.state);
            setValue("address.zipCode", shippingAddress.address.zipCode);
        }
    }, [shippingAddress, setValue]);


    return (
        <BaseModal
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}>
                <Box sx={{
                    backgroundColor: "rgba(234, 235, 255)",
                    px: 4, py: 2,
                    borderRadius: "14px",
                    border: "1px solid #93B1A6"
                }}>
                    <Typography sx={{fontWeight: "bold"}} variant="h6" color={theme.palette.background.default}>
                        {isEditing ? "Edit address" : "Add address"}
                    </Typography>
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
                                        setCountry(COUNTRIES.find(option => option.value === val)?.title);
                                        setValue('address.country', val);
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
                            {isEditing ? "Update" : "Save"}
                        </StyledButton>

                    </form>
                </Box>

        </BaseModal>
    );
};

export default AddressFormModal;