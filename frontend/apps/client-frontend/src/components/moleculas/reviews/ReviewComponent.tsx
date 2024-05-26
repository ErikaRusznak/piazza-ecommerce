import React, {useEffect, useState} from "react";
import { useAuth } from "components";
import {getReviewByIdApi} from "components";
import ProductRating from "@/components/moleculas/ProductRating";
import {Box, Button, Typography, useMediaQuery} from "@mui/material";
import {EditNoteIcon} from "@/components/atoms/icons";
import {useTheme} from "@mui/material/styles";
import EditReviewModal from "@/components/organisms/modals/EditReviewModal";
import {getCommentsForReviewApi} from "../../../../api/entities/CommentApi";
import CommentsComponent from "@/components/moleculas/reviews/CommentsComponent";

type ReviewComponentProps = {
    review: any;
    updateReviewInState: (updatedReview: any) => void;
}

const ReviewComponent = ({review, updateReviewInState}: ReviewComponentProps) => {
    const theme = useTheme();
    const {isAuthenticated, username} = useAuth();
    const smallScreenSize = useMediaQuery(theme.breakpoints.down("sm"));
    const firstLetterOfFirstName = review.buyer.firstName.charAt(0);
    const firstLetterOfLastName = review.buyer.lastName.charAt(0);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState<any>([]);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const getCommentsForReview = (reviewId: number) => {
        getCommentsForReviewApi(reviewId)
            .then((res) => {
                setComments(res.data);
            })
            .catch((err) => console.log(err));
    }

    const toggleComments = () => {
        if (!showComments) {
            getCommentsForReview(review.id);
        }
        setShowComments(!showComments);
    }

    const updateReview = (updatedReview: any) => {
        setSelectedReview(updatedReview);
        updateReviewInState(updatedReview);
    };

    const getReviewById = (reviewId: number) => {
        getReviewByIdApi(reviewId)
            .then((res) => {
                setSelectedReview(res.data);
            })
            .catch((err) => console.log(err));
    }


    useEffect(() => {
        getReviewById(review.id);
        getCommentsForReview(review.id);
    }, []);

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
                        {(isAuthenticated && review.buyer.email === username) && (
                            <Box sx={{
                                display: "flex", justifyContent: "center", alignItems: "center"
                            }}>
                                <EditNoteIcon
                                    sx={{
                                        pl: 1,
                                        color: theme.palette.lightColor.main,
                                        "&:hover": {color: theme.palette.primary.main},
                                        cursor: "pointer",
                                    }}
                                    onClick={toggleModal}
                                />
                            </Box>
                        )}
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
                        <Box sx={{ display: "flex", justifyContent: "space-between", pt: 1.5 }}>
                            <Typography sx={{color: theme.palette.info.main, fontSize: "14px"}}>{review.publishDate}</Typography>
                            <Button onClick={toggleComments} variant="text" sx={{color: theme.palette.primary.main}}>
                                {showComments ? "Hide Comments" : "Show Comments"}
                            </Button>
                        </Box>

                        {showComments && (
                            <CommentsComponent reviewId={review.id} comments={comments} setComments={setComments}/>
                        )}
                    </Box>
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
