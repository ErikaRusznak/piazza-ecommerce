import React, {useState} from 'react';
import {Box, Typography} from '@mui/material';
import {addCommentApi} from "../../../../api/entities/CommentApi";
import { useAuth } from "components";
import {useTheme} from "@mui/material/styles";
import {CssTextFieldDarkBackground} from "ui";
import {StyledButton} from "ui";

type CommentsComponentType = {
    reviewId: number;
    comments: any[];
    setComments: (p: any[]) => void;
};

const CommentsComponent = ({reviewId, comments, setComments}:CommentsComponentType) => {

    const theme = useTheme();

    const [newComment, setNewComment] = useState("");
    const {isAuthenticated} = useAuth();

    const handleAddComment = () => {
        const userId = Number(sessionStorage.getItem('id'));
        addCommentApi(reviewId, userId, newComment)
            .then((res) => {
                setComments([...comments, res.data]);
                setNewComment("");
            })
            .catch((err) => console.log(err));
    }

    return (
        <Box sx={{ml: 4}}>
            {comments.map((comment: any) => (
                <Box key={`${reviewId}-${comment.id}`} sx={{mt: 2, borderLeft: "2px solid #a5b4fc", pl: 2}}>
                    <Typography variant="body2" sx={{color: theme.palette.info.main, fontWeight: "bold"}}>{comment.account.firstName} {comment.account.lastName}</Typography>
                    <Typography variant="caption" sx={{color: theme.palette.info.main}}>{comment.content}</Typography>
                </Box>
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
                    <StyledButton onClick={handleAddComment} variant="contained" >
                        Submit
                    </StyledButton>
                </Box>
            )}
        </Box>
    );
};

export default CommentsComponent;
