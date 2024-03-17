"use client";

import React, {useEffect, useState} from "react";
import useTheme from "@/theme/themes";
import MainLayout from "@/components/templates/MainLayout";
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormTextAreaDarkBackground from "@/components/atoms/form/dark/FormTextAreaDarkBackground";
import {getAllCategoriesApi} from "../../../../api/entities/CategoryApi";
import FormSelectFieldDarkBackground from "@/components/atoms/form/dark/FormSelectFieldDarkBackground";
import StyledButton from "@/components/atoms/StyledButton";
import {createProductApi} from "../../../../api/entities/ProductApi";
import {useAuth} from "../../../../api/auth/AuthContext";
import {useRouter} from "next/navigation";
import {addImageApi} from "../../../../api/entities/ImageApi";
import UploadController from "@/components/atoms/upload/UploadController";
import FormTextField from "@/components/atoms/form/light/FormTextFields";
import FormTextFieldDarkBackground from "@/components/atoms/form/dark/FormTextFieldDarkBackground";

type AddProductInput = {
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

const UNIT_OF_MEASURES = [
    {id: 0, name: "KILOGRAM"},
    {id: 1, name: "GRAM"},
    {id: 2, name: "ONE_UNIT"},
];
const categoryss = [
    {id: 0, name: "KILOGRAM"},
    {id: 1, name: "GRAM"},
    {id: 2, name: "ONE_UNIT"},
];

const AddProductPage = () => {

    const theme = useTheme();
    const [categories, setCategories] = useState<any>();
    const { sellerAlias } = useAuth();
    const router = useRouter();

    const [file, setFile] = useState<any>(null);
    const [fileName, setFileName] = useState();

    const getCategoryList = () => {
        getAllCategoriesApi()
            .then((res) => {
                setCategories(res.data.data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getCategoryList();
    }, [])

    const onSubmit: SubmitHandler<AddProductInput> = async (data, e) => {
        console.log("data:", data);
        createProductApi({
            name: data.name,
            description: data.description,
            // imageName: fileName,
            price: data.price,
            category: data.category,
            seller: sellerAlias,
            unitOfMeasure: data.unitOfMeasure
        })
            .then((res) => {
                console.log(res);
                router.push(`/products`);
            })
            .catch((err) => console.error(err));
    };

    const handleAddImage = () => {
        addImageApi(file)
            .then((res) => {
                console.log(res.data);
                setFileName(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    };
    const handleFileChange = (event: { target: { files: React.SetStateAction<null>[]; }; }) => {
        setFile(event.target.files[0]);
    };

    console.log("file", file)
    console.log("filename", fileName)

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: {errors},
        getValues,
    } = useForm<AddProductInput>({
        resolver: yupResolver(AddProductSchema),
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            category: "",
            unitOfMeasure: "",
        }
    });

    return categories && (
        <MainLayout>
            <Box sx={{display: "block", maxWidth: "25rem", margin: "auto"}}>
                <Typography variant="h5" color={theme.palette.info.main} sx={{textAlign: "center"}}>Add product</Typography>

                <form style={{marginTop: "1rem"}} >
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
                        onFileChange={(file) => setFile(file)}
                    />


                    <StyledButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2, backgroundColor: theme.palette.background.lighter}}
                        onClick={handleSubmit(onSubmit)}
                    >
                        Add product
                    </StyledButton>

                </form>
            </Box>
        </MainLayout>
    );
};

export default AddProductPage;