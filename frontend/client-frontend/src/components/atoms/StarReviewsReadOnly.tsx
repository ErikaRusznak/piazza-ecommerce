import {makeStyles, Rating} from "@mui/material";
import React from "react";
import {styled} from "@mui/system";

const CustomRating = styled(Rating)({
    '& .MuiRating-root': {
        // border: '1px solid white',
        color: "red",
    },
});

const StarReviewsReadOnly = ({rating}: {rating: number}) => {
// TODO - change border color
    return (
        <CustomRating
            name="half-rating-read"
            defaultValue={rating}
            precision={0.5}
            readOnly
        />
    );
};

export default StarReviewsReadOnly;