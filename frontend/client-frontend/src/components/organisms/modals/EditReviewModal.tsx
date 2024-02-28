import React from "react";
import {updateReviewApi} from "../../../../api/entities/ReviewApi";
import {number, object, string} from "yup";
import BaseModal from "@/components/templates/BaseModal";
import {FormTextArea} from "@/components/atoms/form/FormTextField";
import {Box, Rating, Typography, useMediaQuery} from "@mui/material";
import StyledButton from "@/components/atoms/StyledButton";
import {Controller, Resolver, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import useTheme from "@/theme/themes";

type EditReviewModalProps = {
    isModalOpen: boolean;
    toggleModal: () => void;
    setIsModalOpen: (value: boolean) => void;
    review: any;
    description: string;
    updateReview: (updatedReview: any) => void;
}

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
}

const EditReviewModal = ({isModalOpen, toggleModal, setIsModalOpen, description, review, updateReview}: EditReviewModalProps) => {

    const theme = useTheme();
    const onSubmit = (values: any) => {
        updateReviewApi(review.id, values.description, values.rating)
            .then((res) => {
                updateReview(res.data)
                setIsModalOpen(false);
            })
            .catch((err) => console.log(err))
    }
    const smallScreenSize = useMediaQuery(theme.breakpoints.down("sm"));

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
        }
    });

    return (
        <>
            <BaseModal
                isModalOpen={isModalOpen}
                toggleModal={toggleModal}
                children={review &&
                    <Box sx={{
                        backgroundColor: theme.palette.primary.main,
                        px: 4, pb: 2,
                        borderRadius: "14px",
                        border: "1px solid #93B1A6"
                    }}>
                        <Typography variant="h6" sx={{my: 2, color: theme.palette.background.default}}>Edit your review</Typography>
                        <form>
                            <FormTextArea
                                name="description"
                                control={control}
                                label="Description"
                                type="text"
                            />
                            <Controller
                                name="rating"
                                control={control}
                                render={({ field }) => (
                                    <Box sx={{display: "flex", flexDirection: smallScreenSize ? "column":"row"}}>
                                        <Typography sx={{color: theme.palette.background.default}}>Change the rating: </Typography>
                                        <Rating
                                            name="rating"
                                            defaultValue={field.value}
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
                                onClick={handleSubmit(onSubmit)}
                            >
                                Update review
                            </StyledButton>
                        </form>
                    </Box>
                }
            />
        </>
    );
};

export default EditReviewModal;