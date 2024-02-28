import React, {useEffect, useState} from "react";
import {useAuth} from "../../../../api/auth/AuthContext";
import {getReviewByIdApi} from "../../../../api/entities/ReviewApi";
import ProductRating from "@/components/moleculas/ProductRating";
import {Box, Typography} from "@mui/material";
import {EditNoteIcon} from "@/components/atoms/icons";
import useTheme from "@/theme/themes";
import EditReviewModal from "@/components/organisms/modals/EditReviewModal";

type ReviewComponentProps = {
    review: any; // TODO - make review type
    updateReviewInState: (updatedReview: any) => void;
}
const ReviewComponent = ({review, updateReviewInState}: ReviewComponentProps) => {

    /***
     *
     * @param review {{
     *     id: long,
     *     description: string,
     *     rating: float,
     *     buyer: {
     *         firstName: string,
     *         lastName: string,
     *         imageName: string,
     *         telephone: string
     *     }
     *      }}
     */
    const theme = useTheme();
    const firstLetterOfFirstName = review.buyer.firstName.charAt(0);
    const firstLetterOfLastName = review.buyer.lastName.charAt(0);

    const {isAuthenticated, username} = useAuth();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const updateReview = (updatedReview: any) => {
        setSelectedReview(updatedReview)
        updateReviewInState(updatedReview);
    };

    const getReviewById = (reviewId: number) => {
        getReviewByIdApi(reviewId)
            .then((res) => {
                setSelectedReview(res.data)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        getReviewById(review.id);
    }, []);

    return (
        <>
            <Box sx={{
                display: "flex", flexDirection: "column", mb: 2, border: "1px solid #93B1A6",
                borderRadius: "14px",
                boxShadow: `0px 4px 10px rgba(0, 0, 0, 0.1)`,
            }}>
                <Box sx={{
                    display: "flex", justifyContent: "space-between", borderRadius: "14px", alignItems: "center"
                }}>
                    <Box sx={{display: "flex", gap: 1, p: 4}}>
                        <Box sx={{
                            width: 3, textAlign: "center", color: theme.palette.info.main,
                            backgroundColor: theme.palette.background.lighter,
                        }}>
                            <Typography sx={{textAlign: "center", alignItems: "center"}}>
                                {firstLetterOfFirstName}{firstLetterOfLastName}
                            </Typography>
                        </Box>
                        <Typography sx={{color: theme.palette.info.main}}>{review.buyer.firstName} {review.buyer.lastName}</Typography>
                    </Box>
                    <Box sx={{display: "flex", gap: 1, pr: 2}}>
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

                        <Box sx={{ display: "flex", justifyContent: "space-between", pt: 1.5}}>
                            <Typography sx={{color: theme.palette.info.main}}>{review.publishDate}</Typography>
                        </Box>
                    </Box>
                    {(isAuthenticated && review.buyer.email===username) && (
                        <Box>
                            <EditNoteIcon
                                sx={{ width: "10rem",
                                    color: theme.palette.primary.main,
                                    "&:hover": {color: theme.palette.secondary.main},
                                    cursor: "pointer",
                                }}
                                onClick={toggleModal}
                            />
                        </Box>
                    )}

                </Box>
            </Box>

            <EditReviewModal
                toggleModal={toggleModal}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                review={review}
                description={review.description}
                updateReview={updateReview}
            />
        </>
    );
};

export default ReviewComponent;