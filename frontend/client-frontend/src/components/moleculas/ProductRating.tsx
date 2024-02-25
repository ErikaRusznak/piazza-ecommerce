import React from 'react';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';
import StarReviewsReadOnly from "@/components/atoms/StarReviewsReadOnly";

type ProductRatingProps = {
    rating: number;
    numReviews?: number;
    isRatingDisplayed: boolean;
    viewType: 'simple' | 'detailed' | 'extended';
};

const ExtendedLink = styled('p')({
    fontNormal: 'normal',
    fontSize: '14px',
    lineHeight: '20px',
    color: '#4B5563',
    cursor: 'pointer',
    '&:hover': {
        textDecoration: 'underline',
    },
});

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
                        <StarReviewsReadOnly rating={rating} />
                        {(viewType === 'detailed' || viewType === 'extended') && (
                            <Typography
                                variant="body2"
                                component="p"
                                sx={{ marginLeft: 2, fontSize: '14px', fontWeight: 'medium', color: '#6B7280' }}
                            >
                                {rating.toFixed(2)} out of 5
                            </Typography>
                        )}
                    </div>
                    {viewType === 'extended' && (
                        <ExtendedLink onClick={handleClickScroll}>
                            {numReviews} reviews
                        </ExtendedLink>
                    )}
                </div>
            ) : (
                <div>Not enough reviews yet.</div>
            )}
        </div>
    );
};

export default ProductRating;
