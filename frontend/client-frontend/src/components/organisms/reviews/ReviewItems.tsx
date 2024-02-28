import React, {useEffect, useState} from "react";
import useTheme from "@/theme/themes";
import {getReviewsApi} from "../../../../api/entities/ReviewApi";
import {Box, Typography} from "@mui/material";
import ReviewComponent from "@/components/moleculas/reviews/ReviewComponent";

type ReviewItemsProps = {
    productId: number;
    updateProductRating: (newRating: number) => void;
}
const ReviewItems = ({productId, updateProductRating}:ReviewItemsProps) => {

    const theme = useTheme();
    const [reviews, setReviews] = useState<any>([]);
    // TODO - create review type

    const getReviewItems = (productId: number) => {
        getReviewsApi(productId)
            .then((res) => {
                setReviews(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

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

    return (
        <Box id="reviews">
            <Box sx={{
                display: "flex", flexDirection: "column", gap: 1,
                color: theme.palette.info.main,
                border: "1px solid #93B1A6",
                boxShadow: '0px 4px 10px rgba(255, 255, 255, 0.2)',
                p: 3, borderRadius: "14px", pt: 2,
            }}>
                <Typography variant="h5" sx={{fontWeight: "bold"}}>Reviews</Typography>

                <Box sx={{
                    display: "flex", flexDirection: "column", gap: 2, mt: 2
                }}>
                    {reviews.map((review: any) => (
                        <div key={review.id}>
                            <ReviewComponent
                                key={review.id}
                                review={review}
                                updateReviewInState={updateReviewInState}
                            />
                        </div>
                    ))}
                </Box>
            </Box>


        </Box>
    );
};

export default ReviewItems;