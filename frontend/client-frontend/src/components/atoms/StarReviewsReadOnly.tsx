import {makeStyles, Rating, useMediaQuery} from "@mui/material";
import React from "react";
import {styled} from "@mui/system";
import useTheme from "@/theme/themes";

const CustomRating = styled(Rating)({
    '& .MuiRating-root': {
        // border: '1px solid white',
        color: "red",
    },
});

const StarReviewsReadOnly = ({rating}: {rating: number}) => {
// TODO - change border color
    const theme = useTheme();
    const smallScreenSize = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <CustomRating
            name="half-rating-read"
            size={smallScreenSize ? "small" : "medium"}
            defaultValue={rating}
            precision={0.5}
            readOnly
        />
    );
};

export default StarReviewsReadOnly;