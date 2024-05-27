import React from 'react';
import {Typography} from '@mui/material';
import {StarReviewsReadOnly} from "ui";
import {useTheme} from "@mui/material/styles";
import {useThemeToggle} from "ui";

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
    const theme = useTheme();
    const {isDark} = useThemeToggle();
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
                                sx={{ fontSize: '14px', fontWeight: 'medium', color: isDark ? '#dddddd' : "#aaa", }}
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
                                color: isDark ? '#dddddd' : "#aaa",
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
                <Typography color={theme.palette.info.main}>Not enough reviews yet.</Typography>
            )}
        </div>
    );
};

export default ProductRating;
