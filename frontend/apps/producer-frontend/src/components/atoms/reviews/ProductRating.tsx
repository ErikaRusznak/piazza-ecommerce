import React from "react";
import {Typography} from "@mui/material";
import {StarReviewsReadOnly} from "ui";

type ProductRatingProps = {
    rating: number;
    numReviews?: number;
    isRatingDisplayed: boolean;
    viewType: 'simple' | 'detailed' | 'extended';
};

const ProductRating = ({
                           rating,
                           numReviews,
                           isRatingDisplayed,
                           viewType
                       }: ProductRatingProps) => {
    const handleClickScroll = () => {
        const element = document.getElementById('reviews');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="items-center">
            {isRatingDisplayed ? (
                <div>
                    <div className="flex">
                        <StarReviewsReadOnly
                            rating={rating}

                        />
                        {(viewType === 'detailed' || viewType === 'extended') && (
                            <Typography
                                variant="body2"
                                component="p"
                                sx={{fontSize: '14px', fontWeight: 'medium', color: '#dddddd'}}
                            >
                                {rating.toFixed(2)} out of 5
                            </Typography>
                        )}
                    </div>
                    {viewType === 'extended' && (
                        <Typography
                            sx={{
                                fontNormal: 'normal',
                                fontSize: '14px',
                                lineHeight: '20px',
                                color: '#dddddd',
                                cursor: 'pointer',
                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                            }}
                            onClick={handleClickScroll}>
                            {numReviews} reviews
                        </Typography>
                    )}
                </div>
            ) : (
                <div>Not enough reviews yet.</div>
            )}
        </div>

    );
};

export default ProductRating;