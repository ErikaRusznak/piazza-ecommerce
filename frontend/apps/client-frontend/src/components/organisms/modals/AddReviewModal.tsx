import React from 'react';
import {addReviewApi} from '../../../../api/entities/ReviewApi';
import {number, object, string} from 'yup';
import {BaseModal} from "ui";
import {Box, Rating, Typography, useMediaQuery} from '@mui/material';
import {FormTextArea, StyledButton} from "ui";
import {Controller, Resolver, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useTheme} from "@mui/material/styles";
import {useThemeToggle} from "ui";

type AddReviewModalProps = {
    isModalOpen: boolean;
    toggleModal: () => void;
    setIsModalOpen: (value: boolean) => void;
    productId: number;
    handleAddReview: (review: any) => void;
};

const addReviewSchema = object().shape({
    description: string()
        .required("Review Description Required"),
    rating: number()
        .required("Rating Required")
        .min(1, "Rating can't be less than 0")
        .max(5, "Rating can't be more then 5")

})

type AddReviewModalInput = {
    description: string;
    rating: number;
};

const AddReviewModal = ({isModalOpen, toggleModal, setIsModalOpen, productId, handleAddReview}: AddReviewModalProps) => {

    const theme = useTheme();
    const {isDark} = useThemeToggle();
    const smallScreenSize = useMediaQuery(theme.breakpoints.down("sm"));
    const onSubmit = (values: any) => {
        const userId = Number(sessionStorage.getItem('id'));
        if (userId) {
            addReviewApi(productId, userId, values.description, values.rating)
                .then((res) => {
                    handleAddReview(res.data);
                    setIsModalOpen(false);
                })
                .catch((err) => console.error(err));
        }
    };

    const {
        handleSubmit,
        control,
        formState: {errors},
    } = useForm<AddReviewModalInput>({
        resolver: yupResolver(addReviewSchema) as Resolver<AddReviewModalInput>,
        defaultValues: {
            description: "",
            rating: 0,
        },
    });

    return (
        <>
            <BaseModal
                isModalOpen={isModalOpen}
                toggleModal={toggleModal}>
                    <Box
                        sx={{
                            backgroundColor: 'rgba(234, 235, 255)',
                            px: 4,
                            pb: 2,
                            borderRadius: '14px',
                            border: '1px solid #a5b4fc',
                        }}
                    >
                        <Typography variant="h6" sx={{mt: 2, color: isDark? theme.palette.info.contrastText : theme.palette.info.main}}>
                            Add review
                        </Typography>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormTextArea name="description" control={control} label="Description" type="text"/>
                            <Controller
                                name="rating"
                                control={control}
                                defaultValue={0}
                                render={({field}) => (
                                    <Box sx={{display: 'flex', flexDirection: smallScreenSize ? 'column' : 'row'}}>
                                        <Typography sx={{color: isDark? theme.palette.info.contrastText : theme.palette.info.main}}>
                                            Rating: {" "}
                                        </Typography>
                                        <Rating
                                            name="rating"
                                            value={field.value || 0}
                                            precision={0.5}
                                            onChange={(_, value) => {
                                                field.onChange(value);
                                            }}
                                        />
                                    </Box>
                                )}
                            />
                            <StyledButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2, backgroundColor: theme.palette.background.lighter}}
                            >
                                Update review
                            </StyledButton>
                        </form>
                    </Box>
            </BaseModal>
        </>
    );
};

export default AddReviewModal;
