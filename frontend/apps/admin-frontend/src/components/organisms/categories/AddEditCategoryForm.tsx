import React from "react";
import {Box, Typography} from "@mui/material";
import {FormTextFieldDarkBackground, UploadController} from "ui";
import {StyledButton} from "ui";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {addImageApi} from "components";
import { useTheme } from '@mui/material/styles';

type AddEditCategoryForm = {
    headerText: string;
    errorImageMessage: string;
    setErrorImageMessage: (data: any) => void;
    onSubmit: (data: AddEditCategoryInput) => void;
    fileName: string;
    setFileName: (data: string) => void;
    category?: any | undefined;
}
export type AddEditCategoryInput = {
    name: string;
}

const AddCategorySchema = yup.object().shape({
    name: yup.string().required("You must provide a product name"),
});

const AddEditCategoryForm = ({
                                headerText,
                                onSubmit,
                                errorImageMessage,
                                setErrorImageMessage, fileName, setFileName,
                                category
                            }: AddEditCategoryForm) => {

    const theme = useTheme();
    const defaultValues = {
        name: category ? category.name : "",
    }
    const {
        handleSubmit,
        control,
    } = useForm<AddEditCategoryInput>({
        resolver: yupResolver(AddCategorySchema),
        defaultValues: defaultValues
    });

    const handleAddImage = (file: File) => {
        addImageApi(file)
            .then((res) => {
                setFileName(res.data);
                setErrorImageMessage("");
            })
            .catch((err) => {
                console.error(err);
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
                    label="Category name"
                    type="text"/>

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

export default AddEditCategoryForm;