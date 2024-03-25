import {Rating, useMediaQuery} from "@mui/material";
import React from "react";
import useTheme from "@/theme/themes";
import {StarBorderIcon} from "@/components/atoms/icons";

const StarReviewsReadOnly = ({rating}: {rating: number}) => {

    const theme = useTheme();
    const smallScreenSize = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Rating
            name="half-rating-read"
            size={smallScreenSize ? "small" : "medium"}
            defaultValue={rating}
            precision={0.5}
            readOnly
            emptyIcon={
                <StarBorderIcon fontSize="inherit" sx={{color: "#faaf00"}}/>
            }
        />
    );
};

export default StarReviewsReadOnly;