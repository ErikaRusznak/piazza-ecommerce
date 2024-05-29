"use client";

import {useTheme} from "@mui/material/styles";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {Box, Button, Container, Tooltip} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useAuth} from "components";
import {getAllCommentsThatHaveReportsApi} from "../../../../api/entities/ReportsApi";
import MainLayout from "@/components/templates/MainLayout";
import {UnauthenticatedMessage} from "ui";
import {TableContainerComponent} from "ui";

const CommentsWithReportsPage = () => {

    const theme = useTheme();
    const router = useRouter();
    const {isAuthenticated} = useAuth();
    const [comments, setComments] = useState([]);

    const tableCellLabels = ["Comment", "Published By", "Actions"];

    const renderCell = (item: any, key: string) => {
        switch (key) {
            case 'Comment':
                return (
                    <Tooltip title={item.comment} arrow>
                        <Typography
                            sx={{
                                fontSize: "14px",
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 6,
                                lineHeight: '1.15',
                                maxHeight: '6.9em',
                                cursor: "pointer",
                                whiteSpace: "normal",
                                fontWeight: theme.typography.fontWeightRegular,
                            }}
                        >
                            {item.comment}
                        </Typography>
                    </Tooltip>
                );
            case 'Published By':
                return <Typography sx={{fontSize: "14px",}}>{item.publishedBy}</Typography>;
            case 'Actions':
                return (
                    <>
                        <Button size="small" color="primary"
                                onClick={() => router.push(`/reports/comments/${item.id}`)}>
                            View details
                        </Button>
                    </>
                );
            default:
                return null;
        }
    };

    const getCommentsWithReports = () => {
        getAllCommentsThatHaveReportsApi()
            .then((res) => {
                setComments(res.data);
            })
            .catch((err) => console.error(err))
    };

    useEffect(() => {
        getCommentsWithReports();
    }, []);

    const commentsToDisplay = comments?.map((comment: any) => ({
        id: comment.id,
        comment: comment.content,
        publishedBy: comment.account.email
    }))

    return (
        <MainLayout>
            {isAuthenticated ? (
                <Container>
                    <Box sx={{pb: 2}}>
                        <Typography variant="h5" color={theme.palette.info.main}>
                            Comments that have been reported
                        </Typography>
                    </Box>
                    <TableContainerComponent
                        items={commentsToDisplay}
                        tableCellLabels={tableCellLabels}
                        renderCell={renderCell}
                    />
                </Container>
            ) : (
                <UnauthenticatedMessage/>
            )}
        </MainLayout>
    );
};

export default CommentsWithReportsPage;