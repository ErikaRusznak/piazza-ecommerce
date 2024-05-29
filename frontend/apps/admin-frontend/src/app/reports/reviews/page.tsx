"use client";

import React, {useEffect, useState} from "react";
import {useTheme} from "@mui/material/styles";
import {useRouter} from "next/navigation";
import Typography from "@mui/material/Typography";
import {Box, Button, Container, Tooltip} from "@mui/material";
import MainLayout from "@/components/templates/MainLayout";
import {UnauthenticatedMessage} from "ui";
import {TableContainerComponent} from "ui";
import {useAuth} from "components";
import {getAllReviewsThatHaveReportsApi} from "../../../../api/entities/ReportsApi";
import moment from "moment/moment";

const ReviewsWithReportsPage = () => {

    const theme = useTheme();
    const router = useRouter();
    const {isAuthenticated} = useAuth();
    const [reviews, setReviews] = useState([]);

    const tableCellLabels = ["Review", "Published Date", "Published By", "Actions"];

    const renderCell = (item: any, key: string) => {
        switch (key) {
            case 'Review':
                return (
                    <Tooltip title={item.review} arrow>
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
                            {item.review}
                        </Typography>
                    </Tooltip>
                );
            case 'Published Date':
                return (
                    <Typography sx={{fontSize: "14px",}}>
                        {moment(item.publishedDate).format("YYYY-MM-DD")}
                    </Typography>
                );

            case 'Published By':
                return <Typography sx={{fontSize: "14px",}}>{item.publishedBy}</Typography>;
            case 'Actions':
                return (
                    <>
                        <Button size="small" color="primary"
                                onClick={() => router.push(`/reports/reviews/${item.id}`)}>
                            View details
                        </Button>
                    </>
                );
            default:
                return null;
        }
    };

    const getReviewsWithReports = () => {
        getAllReviewsThatHaveReportsApi()
            .then((res) => {
                setReviews(res.data);
            })
            .catch((err) => console.error(err))
    };

    useEffect(() => {
        getReviewsWithReports();
    }, []);

    const reviewsToDisplay = reviews?.map((review: any) => ({
        id: review.id,
        review: review.description,
        publishedDate: review.publishDate,
        publishedBy: review.buyer.email
    }))
    return (
            <MainLayout>
                {isAuthenticated ? (
                    <Container>
                        <Box sx={{pb: 2}}>
                            <Typography variant="h5" color={theme.palette.info.main}>
                                Reviews that have been reported
                            </Typography>
                        </Box>
                        <TableContainerComponent
                            items={reviewsToDisplay}
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

export default ReviewsWithReportsPage;