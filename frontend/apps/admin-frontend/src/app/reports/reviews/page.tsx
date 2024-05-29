"use client";

import React, {useEffect, useState} from "react";
import {useTheme} from "@mui/material/styles";
import {useRouter} from "next/navigation";
import Typography from "@mui/material/Typography";
import {Box, Button, Container} from "@mui/material";
import MainLayout from "@/components/templates/MainLayout";
import {AddIcon} from "@/components/atoms/icons";
import DeleteCategoryModal from "@/components/organisms/modals/DeleteCategoryModal";
import {UnauthenticatedMessage} from "ui";
import {TableContainerComponent} from "ui";
import {useAuth, baseURL} from "components";
import {getAllReviewsThatHaveReportsApi} from "../../../../api/entities/ReportsApi";

const ReviewsWithReportsPage = () => {

    const theme = useTheme();
    const router = useRouter();
    const {isAuthenticated} = useAuth();
    const [reviews, setReviews] = useState([]);
    // const renderCell = (item: any, key: string) => {
    //     switch (key) {
    //         case 'Image':
    //             return (
    //                 <img src={`${baseURL}${item.imageName}`} alt={item.name}
    //                      style={{width: '100%', height: 'auto', maxWidth: '70px'}}/>
    //             );
    //         case 'Name':
    //             return <Typography sx={{fontWeight: theme.typography.fontWeightRegular}}>{item.name}</Typography>;
    //         case 'Actions':
    //             return (
    //                 <>
    //                     <Button size="small" color="primary"
    //                             onClick={() => router.push(`/categories/${item.name}`)}>
    //                         View
    //                     </Button>
    //                     <Button size="small" color="secondary" onClick={() => router.push(`/categories/edit/${item.id}`)}>
    //                         Edit
    //                     </Button>
    //                     <Button size="small" color="error" onClick={() => toggleModal(item.id)}>
    //                         Delete
    //                     </Button>
    //                 </>
    //             );
    //         default:
    //             return null;
    //     }
    // };

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

    console.log("reviews", reviews);
    return (

            <MainLayout>
                {isAuthenticated ? (
                    <Container>
                        <Box sx={{pb: 2}}>
                            <Typography variant="h5" color={theme.palette.info.main}>
                                Reviews that have been reported
                            </Typography>
                        </Box>
                        {/*<TableContainerComponent*/}
                        {/*    items={categoriesToDisplay}*/}
                        {/*    tableCellLabels={tableCellLabels}*/}
                        {/*    renderCell={renderCell}*/}
                        {/*/>*/}
                    </Container>
                ) : (
                    <UnauthenticatedMessage/>
                )}
            </MainLayout>

    );
};

export default ReviewsWithReportsPage;