import React, {useState} from "react";
import {Box, Typography} from "@mui/material";
import FormTextFieldDarkBackground from "@/components/atoms/form/dark/FormTextFieldDarkBackground";
import FormTextAreaDarkBackground from "@/components/atoms/form/dark/FormTextAreaDarkBackground";
import FormSelectFieldDarkBackground from "@/components/atoms/form/dark/FormSelectFieldDarkBackground";
import UploadController from "@/components/atoms/upload/UploadController";
import StyledButton from "@/components/atoms/StyledButton";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {addImageApi} from "../../../../api/entities/ImageApi";
import useTheme from "@/theme/themes";

type AddEditProductFormProps = {
    headerText: string;
    UNIT_OF_MEASURES: {id: number, name: string}[];
    categories: any;
    errorImageMessage: string;
    setErrorImageMessage: (data: any) => void;
    onSubmit: (data: AddEditProductInput) => void;
    fileName: string;
    setFileName: (data: string) => void;
    product?: any | undefined;
}
export type AddEditProductInput = {
    name: string;
    description: string;
    price: number;
    category: string;
    unitOfMeasure: string;
}

const AddProductSchema = yup.object().shape({
    name: yup.string().required("You must provide a product name"),
    description: yup.string().required("You must provide a description")
        .max(150, "Can't write more than 150 characters"),
    price: yup.number()
        .min(0.1, 'Price must be greater than or equal to 0')
        .required('You must provide a price'),
    category: yup.string()
        .required("You must choose a category"),
    unitOfMeasure: yup.string()
        .required("You must choose a unit of measure"),
});

// todo - take unit of measures from the backend


const AddEditProductForm = ({
    headerText,
    onSubmit,
    UNIT_OF_MEASURES,
    categories,
    errorImageMessage,
    setErrorImageMessage, fileName, setFileName,
    product
   }: AddEditProductFormProps) => {

    const theme = useTheme();
    const defaultValues = {
        name: product ? product.name : "",
        description: product ? product.description : "",
        price: product ? product.price : "",
        category: product ? product.category.name : "",
        unitOfMeasure: product ? product.unitOfMeasure.name : "",
    }
    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: {errors},
        getValues,
    } = useForm<AddEditProductInput>({
        resolver: yupResolver(AddProductSchema),
        defaultValues: defaultValues
    });

    const handleAddImage = (file: File) => {
        addImageApi(file)
            .then((res) => {
                setFileName(res.data);
                setErrorImageMessage("");
            })
            .catch((err) => {
                console.log(err);
                setErrorImageMessage("Failed to upload image. Please try again.")
            })
    };

    return (
        <Box sx={{display: "block", maxWidth: "25rem", margin: "auto"}}>
            <Typography variant="h5" color={theme.palette.info.main} sx={{textAlign: "center", fontWeight: "bold"}}>
                {headerText}
            </Typography>

            <form style={{marginTop: "1rem"}}>
                <FormTextFieldDarkBackground
                    name="name"
                    control={control}
                    label="Product name"
                    type="text"/>
                <FormTextAreaDarkBackground
                    name="description"
                    control={control}
                    label="Description"
                    type="text"
                />
                <FormTextFieldDarkBackground
                    name="price"
                    control={control}
                    label="Price"
                    type="number"/>
                <FormSelectFieldDarkBackground
                    name="category"
                    control={control}
                    label="Category"
                    items={categories}
                />
                <FormSelectFieldDarkBackground
                    name="unitOfMeasure"
                    control={control}
                    label="Unit of measure"
                    items={UNIT_OF_MEASURES}
                />

                <UploadController
                    onFileChange={handleAddImage}
                    fileName={fileName}
                    setFileName={setFileName}
                />

                {errorImageMessage && (
                    <Typography variant="body2" color="error" sx={{ mt: 1 }}>{errorImageMessage}</Typography>
                )}

                <StyledButton
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2, backgroundColor: theme.palette.background.lighter}}
                    onClick={handleSubmit(onSubmit)}
                >
                    {headerText}
                </StyledButton>

            </form>
        </Box>
    );
};

export default AddEditProductForm;