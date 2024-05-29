"use client";
import {useState} from 'react';
import {Box, Typography} from '@mui/material';
import {addCommentApi} from "components";
import {useTheme} from "@mui/material/styles";
import {CssTextFieldDarkBackground} from "../form/dark/CssTextFieldDarkBackground";
import StyledButton from "../StyledButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tooltip from '@mui/material/Tooltip';
import AddReportModal from "../../organisms/modals/AddReportModal";

type CommentsComponentType = {
    reviewId: number;
    comments: any[];
    setComments: (p: any[]) => void;
    isAuthenticated: boolean;
};

const CommentsComponent = ({reviewId, comments, setComments, isAuthenticated}: CommentsComponentType) => {

    const theme = useTheme();

    const [newComment, setNewComment] = useState("");

    const [isReportModalOpen, setIsReportModalOpen] = useState(false);

    const toggleReportModal = () => {
        setIsReportModalOpen(!isReportModalOpen);
    }

    const handleAddComment = () => {
        const userId = Number(sessionStorage.getItem('id'));
        addCommentApi(reviewId, userId, newComment)
            .then((res) => {
                setComments([...comments, res.data]);
                setNewComment("");
            })
            .catch((err) => console.log(err));
    }
    const userId = parseInt(sessionStorage.getItem("id") || "0");

    return (
        <Box sx={{ml: 4}}>
            {comments.map((comment: any) => (
                <div key={`${reviewId}-${comment.id}`}>
                    <Box sx={{mt: 2, borderLeft: "2px solid #a5b4fc", pl: 2}}>
                        <Box sx={{display: "flex", alignItems: "center"}}>
                            <Typography variant="subtitle2" sx={{
                                color: theme.palette.info.main,
                                fontWeight: "bold"
                            }}>
                                {comment.account.firstName} {comment.account.lastName}
                            </Typography>
                            {(isAuthenticated && userId === comment.account.id) && (
                                <Tooltip title="Report the comment" placement="bottom-end">
                                    <MoreVertIcon
                                        sx={{
                                            fontSize: "20px",
                                            color: theme.palette.lightColor.main,
                                            "&:hover": {color: theme.palette.primary.main},
                                            cursor: "pointer",
                                        }}
                                        onClick={toggleReportModal}
                                    />
                                </Tooltip>
                            )}
                        </Box>
                        <Typography variant="caption"
                                    sx={{color: theme.palette.info.main}}>{comment.content}</Typography>
                    </Box>
                    <AddReportModal
                        isModalOpen={isReportModalOpen}
                        toggleModal={toggleReportModal}
                        idCommentOrReviewToReport={comment.id}
                        userId={userId}
                        reportFor={"comment"}
                    />
                </div>

            ))}
            {isAuthenticated && (
                <Box sx={{mt: 2, display: "flex", gap: 3}}>
                    <CssTextFieldDarkBackground
                        size="small"
                        label="Add a comment"
                        value={newComment}
                        fullWidth
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <StyledButton onClick={handleAddComment} variant="contained">
                        Submit
                    </StyledButton>
                </Box>
            )}
        </Box>
    );
};

export default CommentsComponent;
