import { Rating } from "@mui/material";
import React from "react";

const StarReviewsReadOnly = ({rating}: {rating: number}) => {

    return (
        <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly />
    );
};

export default StarReviewsReadOnly;