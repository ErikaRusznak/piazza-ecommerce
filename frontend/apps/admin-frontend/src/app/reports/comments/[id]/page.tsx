"use client";

import React, {useEffect, useState} from "react";
import {useAuth} from "components";
import {Box, Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import {TableContainerComponent, UnauthenticatedMessage} from "ui";
import {getReportsForSpecificCommentApi} from "../../../../../api/entities/ReportsApi";
import MainLayout from "@/components/templates/MainLayout";
import {getCommentByIdApi} from "../../../../../api/entities/CommentApi";
import CommentDetails from "@/components/moleculas/reports/CommentDetails";

type ReportsFromSpecificCommentPageProps = {
    params: {
        id: string;
    }
}

const ReportsFromSpecificCommentPage = ({params}:ReportsFromSpecificCommentPageProps) => {

    const {isAuthenticated} = useAuth();
    const commentId = Number(params.id);
    const [comment, setComment] = useState<any>();
    const [reportsForComment, setReportsForComment] = useState([]);

    const tableCellLabels = ["Reported By", "Reason"];

    const renderCell = (item: any, key: string) => {
        switch (key) {
            case 'Reported By':
                return (
                    <Typography sx={{fontSize: "14px",}}>
                        {item.reportedBy}
                    </Typography>
                );
            case 'Reason':
                return <Typography sx={{fontSize: "14px",}}>{item.reason}</Typography>;
            default:
                return null;
        }
    };

    const getCommentById = (id: number) => {
        getCommentByIdApi(id)
            .then((res) => {
                setComment(res.data);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const getReportsForComment = (id: number) => {
        getReportsForSpecificCommentApi(id)
            .then((res) => {
                setReportsForComment(res.data);
            })
            .catch((err) => console.error(err));
    }

    useEffect(() => {
        getCommentById(commentId);
        getReportsForComment(commentId);
    }, [commentId]);

    const reportsToDisplay = reportsForComment?.map((report: any) => ({
        id: report.id,
        reportedBy: report.reportedBy,
        reason: report.reason
    }))

    return (
        <MainLayout>
            {isAuthenticated ? (
                <Container>
                    {commentId && (
                        <>

                            <CommentDetails
                                commentId={comment?.id}
                                commentDescription={comment?.content}
                                publishedBy={comment?.account.email}
                            />

                            <Box sx={{mt: 2}}>
                                <TableContainerComponent
                                    items={reportsToDisplay}
                                    tableCellLabels={tableCellLabels}
                                    renderCell={renderCell}
                                />
                            </Box>

                        </>
                    )}
                </Container>
            ) : (
                <UnauthenticatedMessage/>
            )}
        </MainLayout>
    );
};

export default ReportsFromSpecificCommentPage;