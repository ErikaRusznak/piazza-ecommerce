import React, {useState} from "react";
import {useTheme} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import {Box, Button} from "@mui/material";
import moment from "moment";
import {deleteReportsForSpecificReviewApi, deleteReviewApi} from "../../../../api/entities/ReportsApi";
import {useRouter} from "next/navigation";
import DeleteReportsRelatedModal from "@/components/organisms/modals/DeleteReportsRelatedModal";
import {useAlert} from "components";

type ReviewDetailsProps = {
    reviewId: number;
    reviewDescription: string;
    publishDate: string | Date;
    publishedBy: string;
};

const ReviewDetails = ({reviewId, reviewDescription, publishDate, publishedBy}: ReviewDetailsProps) => {

    const theme = useTheme();
    const router = useRouter();
    const {pushAlert} = useAlert();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [descriptionForModal, setDescriptionForModal] = useState<string>("");
    const [onDeleteFunction, setOnDeleteFunction] = useState<() => void>(() => {});

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const deleteAllReportsRelatedToAReview = () => {
        deleteReportsForSpecificReviewApi(reviewId)
            .then((res) => {
                router.push("/reports/reviews");
                pushAlert({
                    type: "success",
                    title: "Delete reports",
                    paragraph: "Reports for review were deleted!"
                });
            })
            .catch((err) => {
                console.error(err);
                pushAlert({
                    type: "error",
                    title: "Delete reports",
                    paragraph: "Could not delete reports for review."
                });
            })
    }

    const deleteReview = () => {
        deleteReviewApi(reviewId)
            .then((res) => {
                router.push("/reports/reviews");
                pushAlert({
                    type: "success",
                    title: "Delete review",
                    paragraph: "Review was deleted successfully!"
                });
            })
            .catch((err) => {
                console.error(err);
                pushAlert({
                    type: "error",
                    title: "Delete review",
                    paragraph: "Could not delete review."
                });
            })
    }

    const handleDismissReports = () => {
        setOnDeleteFunction(() => deleteAllReportsRelatedToAReview);
        setDescriptionForModal("If you agree with this, the reports will be deleted and the review will still remain.");
        toggleModal();
    };

    const handleAcknowledgeReports = () => {
        setOnDeleteFunction(() => deleteReview);
        setDescriptionForModal("If you agree with this, the review will be deleted.");
        toggleModal();
    };

    return (
        <>
            <Box sx={{padding: 2, border: `1px solid ${theme.palette.divider}`, borderRadius: 2}}>
                <Typography variant="h6" color={theme.palette.info.main} gutterBottom>
                    Review Details
                </Typography>
                <Typography gutterBottom>
                    <span
                        style={{fontWeight: theme.typography.fontWeightMedium}}>Content:</span> {reviewDescription}
                </Typography>
                <Typography gutterBottom>
                    <span
                        style={{fontWeight: theme.typography.fontWeightMedium}}>Publish Date:</span> {moment(publishDate).format("YYYY-MM-DD")}
                </Typography>
                <Typography gutterBottom>
                    <span style={{fontWeight: theme.typography.fontWeightMedium}}>Published By:</span> {publishedBy}
                </Typography>
                <Box sx={{display: 'flex', justifyContent: 'space-between', marginTop: 2}}>
                    <Button variant="outlined" color="secondary" onClick={handleDismissReports}>
                        Dismiss Reports
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleAcknowledgeReports}>
                        Acknowledge Reports
                    </Button>
                </Box>
            </Box>

            <DeleteReportsRelatedModal
                isModalOpen={isModalOpen}
                toggleModal={toggleModal}
                setIsModalOpen={setIsModalOpen}
                onDelete={onDeleteFunction}
                description={descriptionForModal}
            />
        </>
    );
};

export default ReviewDetails;