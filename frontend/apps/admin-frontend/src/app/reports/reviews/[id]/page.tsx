"use client";

import React, {useEffect, useState} from "react";
import {useTheme} from "@mui/material/styles";
import {useRouter} from "next/navigation";
import {useAuth} from "components";
import {getReviewByIdApi} from "components";
import {Box, Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import {TableContainerComponent, UnauthenticatedMessage} from "ui";
import {getReportsForSpecificReviewApi} from "../../../../../api/entities/ReportsApi";
import MainLayout from "@/components/templates/MainLayout";
import ReviewDetails from "@/components/moleculas/reports/ReviewDetails";

type ReportsFromSpecificReviewPageProps = {
    params: {
        id: string;
    }
}

const ReportsFromSpecificReviewPage = ({params}: ReportsFromSpecificReviewPageProps) => {

    const {isAuthenticated} = useAuth();
    const reviewId = Number(params.id);
    const [review, setReview] = useState<any>();
    const [reportsForReview, setReportsForReview] = useState([]);

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

    const getReviewById = (id: number) => {
        getReviewByIdApi(id)
            .then((res) => {
                setReview(res.data);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const getReportsForReview = (id: number) => {
        getReportsForSpecificReviewApi(id)
            .then((res) => {
                setReportsForReview(res.data);
            })
            .catch((err) => console.error(err));
    }

    useEffect(() => {
        getReviewById(reviewId);
        getReportsForReview(reviewId);
    }, [reviewId]);


    const reportsToDisplay = reportsForReview?.map((report: any) => ({
        id: report.id,
        reportedBy: report.reportedBy,
        reason: report.reason
    }))

    return (
        <MainLayout>
            {isAuthenticated ? (
                <Container>
                    {reviewId && (
                        <>
                            <ReviewDetails
                                reviewId={review?.id}
                                reviewDescription={review?.description}
                                publishDate={review?.publishDate}
                                publishedBy={review?.buyer.email}
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

export default ReportsFromSpecificReviewPage;