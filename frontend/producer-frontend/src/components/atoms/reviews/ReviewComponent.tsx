import React, {useEffect, useState} from "react";
import useTheme from "@/theme/themes";
import {Box, Typography, useMediaQuery} from "@mui/material";
import {useAuth} from "../../../../api/auth/AuthContext";
import ProductRating from "@/components/atoms/reviews/ProductRating";
import {EditNoteIcon} from "@/components/atoms/icons";
import {getReviewByIdApi} from "../../../../api/entities/ReviewApi";

type ReviewComponentProps = {
    review: any; // TODO - make review type
}

const ReviewComponent = ({review}: ReviewComponentProps) => {

    const theme = useTheme();
    const firstLetterOfFirstName = review.buyer.firstName.charAt(0);
    const firstLetterOfLastName = review.buyer.lastName.charAt(0);
    const smallScreenSize = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <>
            <Box sx={{
                display: "flex", flexDirection: "column", mb: 2, border: "1px solid #a5b4fc",
                borderRadius: "14px",
                boxShadow: `0px 4px 10px rgba(0, 0, 0, 0.1)`,
            }}>
                <Box sx={{
                    display: "flex", justifyContent: "space-between", borderRadius: "14px", alignItems: "center"
                }}>
                    <Box sx={{display: "flex", gap: 1, padding: theme.spacing(2,2,0,2)}}>
                        {!smallScreenSize && (
                            <Box sx={{
                                width: "2rem",
                                textAlign: "center",
                                alignContent: "center",
                                color: theme.palette.info.main,
                                backgroundColor: theme.palette.primary.main,
                                borderRadius: "20px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                            }}>
                                <Typography variant="body2">
                                    {firstLetterOfFirstName}{firstLetterOfLastName}
                                </Typography>
                            </Box>
                        )}
                        <Typography sx={{color: theme.palette.info.main, fontWeight: "bold"}}>{review.buyer.firstName} {review.buyer.lastName}</Typography>
                    </Box>
                    <Box sx={{display: "flex", gap: 1, pr: 2, pt:2}}>
                        <ProductRating
                            rating={review.rating}
                            isRatingDisplayed={true}
                            viewType='simple'
                        />
                    </Box>
                </Box>

                <Box sx={{
                    display: "flex", justifyContent: "space-between", pt: 1.5
                }}>
                    <Box sx={{px: 2, pb:3, width: "100%"}}>
                        <Typography variant="body1" sx={{color: theme.palette.info.main}}>
                            {review.description}
                        </Typography>

                        <Box sx={{ display: "flex", justifyContent: "space-between", pt: 1.5, }}>
                            <Typography sx={{color: theme.palette.info.main, fontSize: "14px"}}>{review.publishDate}</Typography>
                        </Box>
                    </Box>


                </Box>
            </Box>
        </>
    );
};

export default ReviewComponent;