import {makeStyles, Rating} from "@mui/material";
import React from "react";
import {styled} from "@mui/system";

const CustomRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        border: '1px solid white',
    },
});

const StarReviewsReadOnly = ({rating}: {rating: number}) => {

    return (
        <Rating
            name="half-rating-read"
            defaultValue={rating}
            precision={0.5}
            readOnly
        />
    );
};

export default StarReviewsReadOnly;