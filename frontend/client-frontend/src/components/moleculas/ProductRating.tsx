import React from 'react';
import { styled } from '@mui/system';
import {Typography, useMediaQuery} from '@mui/material';
import StarReviewsReadOnly from "@/components/atoms/StarReviewsReadOnly";
import useTheme from "@/theme/themes";

type ProductRatingProps = {
    rating: number;
    numReviews?: number;
    isRatingDisplayed: boolean;
    viewType: 'simple' | 'detailed' | 'extended';
};

const ProductRating: React.FC<ProductRatingProps> = ({
                                                         rating,
                                                         numReviews,
                                                         isRatingDisplayed,
                                                         viewType,
                                                     }) => {
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
                                sx={{ fontSize: '14px', fontWeight: 'medium', color: '#dddddd' }}
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