import React, {useState} from "react";
import {useTheme} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import {Box, Button} from "@mui/material";
import {
    deleteCommentApi,
    deleteReportsForSpecificCommentApi,
} from "../../../../api/entities/ReportsApi";
import {useRouter} from "next/navigation";
import DeleteReportsRelatedModal from "@/components/organisms/modals/DeleteReportsRelatedModal";

type CommentDetailsProps = {
    commentId: number;
    commentDescription: string;
    publishedBy: string;
};

const CommentDetails = ({commentId, commentDescription, publishedBy}: CommentDetailsProps) => {

    const theme = useTheme();
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [descriptionForModal, setDescriptionForModal] = useState<string>("");
    const [onDeleteFunction, setOnDeleteFunction] = useState<() => void>(() => {});

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const deleteAllReportsRelatedToAComment = () => {
        deleteReportsForSpecificCommentApi(commentId)
            .then((res) => {
                console.log("delete was successful");
                router.push("/reports/comments");
            })
            .catch((err) => console.error(err))
    }

    const deleteComment = () => {
        deleteCommentApi(commentId)
            .then((res) => {
                console.log("delete was successful");
                router.push("/reports/comments");
            })
            .catch((err) => console.error(err))
    }

    const handleDismissReports = () => {
        setOnDeleteFunction(() => deleteAllReportsRelatedToAComment);
        setDescriptionForModal("If you agree with this, the reports will be deleted and the comment will still remain.");
        toggleModal();
    };

    const handleAcknowledgeReports = () => {
        setOnDeleteFunction(() => deleteComment);
        setDescriptionForModal("If you agree with this, the comment will be deleted.");
        toggleModal();
    };

    return (
        <>
            <Box sx={{padding: 2, border: `1px solid ${theme.palette.divider}`, borderRadius: 2}}>
                <Typography variant="h6" color={theme.palette.info.main} gutterBottom>
                    Comment Details
                </Typography>
                <Typography gutterBottom>
                    <span
                        style={{fontWeight: theme.typography.fontWeightMedium}}>Content:</span> {commentDescription}
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

export default CommentDetails;