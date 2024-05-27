import React, {useEffect, useState} from "react";
import {useTheme} from "@mui/material/styles";
import {getReviewsApi} from "components";
import {Box, Button, Typography} from "@mui/material";
import {ReviewComponent} from "ui";
import { useAuth } from "components";
import AddReviewModal from "@/components/organisms/modals/AddReviewModal";

type ReviewItemsProps = {
    productId: number;
    updateProductRating: (newRating: number) => void;
}
const ReviewItems = ({productId, updateProductRating}:ReviewItemsProps) => {

    const theme = useTheme();
    const {isAuthenticated, username} = useAuth();

    const [reviews, setReviews] = useState<any>([]);
    const addReview = (newReview: any) => {
        setReviews([...reviews, newReview]);
    };
    // TODO - create review type

    const getReviewItems = (productId: number) => {
        getReviewsApi(productId)
            .then((res) => {
                setReviews(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    };


    useEffect(() => {
        getReviewItems(productId)
    }, []);

    const updateReviewInState = (updatedReview: any) => {
        const updatedReviewIndex = reviews.findIndex((review: any) => review.id === updatedReview.id);

        if (updatedReviewIndex !== -1) {
            const updatedReviews = [...reviews];
            updatedReviews[updatedReviewIndex] = updatedReview;
            setReviews(updatedReviews);

            const newProductRating = updatedReviews.reduce((sum, review) => sum + review.rating, 0) / updatedReviews.length;
            updateProductRating(newProductRating)
        }
    };


    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
        setIsModalOpen(prevState => !prevState);
    };

    return (
        <Box id="reviews">
            <Box sx={{
                display: "flex", flexDirection: "column", gap: 1,
                color: theme.palette.info.main,
                border: "1px solid #a5b4fc",
                boxShadow: '0px 4px 10px rgba(255, 255, 255, 0.2)',
                p: 3, borderRadius: "14px", pt: 2,
            }}>
                <Box sx={{display: "flex", gap: 2, alignItems: "flex-end"}}>
                    <Typography variant="h5" sx={{fontWeight: "bold"}}>Reviews</Typography>
                    {isAuthenticated &&
                        <Button onClick={toggleModal} variant="outlined" sx={{color: theme.palette.lightColor.main, borderColor: theme.palette.lightColor.main}}>
                            Add Review
                        </Button>
                    }
                </Box>
                <AddReviewModal
                    toggleModal={toggleModal}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    productId={productId}
                    handleAddReview={addReview}
                />

                <Box sx={{
                    display: "flex", flexDirection: "column", gap: 2, mt: 2
                }}>
                    {reviews.map((review: any) => (
                        <div key={review.id}>
                            <ReviewComponent
                                key={review.id}
                                review={review}
                                updateReviewInState={updateReviewInState}
                                isAuthenticated={isAuthenticated}
                                username={username}
                            />
                        </div>
                    ))}
                </Box>
            </Box>


        </Box>

    );
};

export default ReviewItems;