
import React from 'react';
import { updateReviewApi } from '../../../../api/entities/ReviewApi';
import { number, object, string } from 'yup';
import {BaseModal, useThemeToggle} from "ui";
import { Box, Typography } from '@mui/material';
import {FormTextArea, StyledButton} from "ui";
import { Resolver, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {useTheme} from "@mui/material/styles";
import {useAlert} from "components";

type EditReviewModalProps = {
    isModalOpen: boolean;
    toggleModal: () => void;
    setIsModalOpen: (value: boolean) => void;
    review: any;
    description: string;
    updateReview: (updatedReview: any) => void;
};

const editReviewSchema = object().shape({
    description: string()
        .required("Review Description Required"),
    rating: number()
        .required("Rating Required")
        .min(1, "Rating can't be less than 0")
        .max(5, "Rating can't be more then 5")

})

type EditReviewModalInput = {
    description: string;
    rating: number;
};

const EditReviewModal = ({isModalOpen, toggleModal, setIsModalOpen, description, review, updateReview}: EditReviewModalProps) => {

    const theme = useTheme();
    const {isDark} = useThemeToggle();
    const {pushAlert} = useAlert();
    const onSubmit = (values: any) => {
        updateReviewApi(review.id, values.description, values.rating)
            .then((res) => {
                updateReview(res.data)
                setIsModalOpen(false);
                pushAlert({
                    type: "success",
                    title: "Review updated",
                    paragraph: "Your review was updated successfully!"
                });
            })
            .catch((err) => {
                console.error(err);
                pushAlert({
                    type: "error",
                    title: "Review update",
                    paragraph: "Could not update the review."
                });
            })
    };

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: {errors},
        getValues,
    } = useForm<EditReviewModalInput>({
        resolver: yupResolver(editReviewSchema) as Resolver<EditReviewModalInput>,
        defaultValues: {
            description: description,
            rating: review.rating,
        },
    });

    return (
        <>
            <BaseModal
                isModalOpen={isModalOpen}
                toggleModal={toggleModal}>
                    review && (
                        <Box
                            sx={{
                                backgroundColor: 'rgba(234, 235, 255)',
                                px: 4,
                                pb: 2,
                                borderRadius: '14px',
                                border: '1px solid #a5b4fc',
                            }}
                        >
                            <Typography variant="h6" sx={{ my: 2, color: isDark ? theme.palette.info.contrastText : theme.palette.info.main }}>
                                Edit your review
                            </Typography>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <FormTextArea name="description" control={control} label="Description" type="text" />
                                <StyledButton
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, backgroundColor: theme.palette.background.lighter }}
                                >
                                    Update review
                                </StyledButton>
                            </form>
                        </Box>
                    )
            </BaseModal>
        </>
    );
};

export default EditReviewModal;
