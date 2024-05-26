import React, {useEffect, useState} from "react";
import {useTheme} from "@mui/material/styles";
import {getReviewsApi} from "components";
import {Box, Typography} from "@mui/material";
import ReviewComponent from "@/components/atoms/reviews/ReviewComponent";

type ReviewItemsProps = {
    productId: number;

}

const ReviewItems = ({productId}:ReviewItemsProps) => {

    const theme = useTheme();
    const [reviews, setReviews] = useState<any>([]);

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

    return (
        <Box id="reviews">
            <Box sx={{
                display: "flex", flexDirection: "column", gap: 1,
                color: theme.palette.info.main,
                border: "1px solid #a5b4fc",
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
                            />
                        </div>
                    ))}
                </Box>
            </Box>


        </Box>
    );
};

export default ReviewItems;