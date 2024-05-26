"use client";

import React, {useEffect, useState} from "react";
import {Box, Button, Container, Tooltip, Typography} from "@mui/material";
import moment from "moment";
import {useAuth} from "components";
import {getSellerRequestsApi} from "../../../api/entities/SellerRequestsApi";
import MainLayout from "@/components/templates/MainLayout";
import UnauthenticatedMessage from "@/components/atoms/UnauthenticatedMessage";
import TablePaginationComponent from "@/components/moleculas/table/TablePaginationComponent";
import TableContainerComponent from "@/components/moleculas/table/TableContainerComponent";
import {useTheme} from "@mui/material/styles";
import ApproveRejectRequestModal from "@/components/organisms/modals/ApproveRejectRequestModal";

const tableCellLabels = ["Email", "Reason", "Date", "Status", "Actions"];

const RequestsPage = () => {

    const renderCell = (item: any, key: string) => {

        switch (key) {
            case 'Email':
                return item.email;
            case 'Reason':
                return (
                    <Tooltip title={item.reason} arrow>
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
                                whiteSpace: "normal"
                            }}
                        >
                            {item.reason}
                        </Typography>
                    </Tooltip>
                );
            case 'Date':
                return moment(item.date).format("YYYY-MM-DD HH:mm");
            case 'Status':
                return item.status;
            case 'Actions':
                if (item.status === "APPROVED" || item.status === "REJECTED") {
                    return null;
                }
                return (
                    <>
                        <Button size="small" color="success" onClick={() => toggleModal(item.id, "approve")}>
                            Approve
                        </Button>
                        <Button size="small" color="error" onClick={() => toggleModal(item.id, "reject")}>
                            Reject
                        </Button>
                    </>
                );
            default:
                return null;
        }
    };
    const theme = useTheme();
    const {isAuthenticated} = useAuth();

    const [requests, setRequests] = useState<any>([]);
    const [totalNumberOfRequests, setTotalNumberOfRequests] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const [requestIdToUpdate, setRequestIdToUpdate] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [actionType, setActionType] = useState<string | null>(null);

    const getSellerRequests = (page: number, newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);
        getSellerRequestsApi(page, newItemsPerPage)
            .then((res) => {
                setRequests(res.data.content);
                setTotalNumberOfRequests(res.data.totalElements)
            })
            .catch((err) => {
                console.error(err);
            })
    };

    useEffect(() => {
        getSellerRequests(currentPage, itemsPerPage);
    }, [itemsPerPage, currentPage]);

    const toggleModal = (requestId: number | null, actionType: string | null) => {
        setRequestIdToUpdate(requestId);
        setActionType(actionType);
        setIsModalOpen(!isModalOpen);
    };

    const updateRequestStatus = (requestId: number, status: string) => {
        setRequests((prevRequests: any[]) =>
            prevRequests.map((request: any) =>
                request.id === requestId ? { ...request, status: status } : request
            )
        );
    };

    const requestsToDisplay = requests?.map((request: any) => ({
        id: request.id,
        email: request.sellerEmail,
        reason: request.reason,
        date: request.date,
        status: request.status
    }))

    return (
        <>
            <MainLayout>
                {isAuthenticated ? (
                    <Container>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                            pb: 2
                        }}>
                            <Typography variant="h4" color={theme.palette.info.main}>
                                Seller Requests
                            </Typography>

                        </Box>

                        <TableContainerComponent
                            items={requestsToDisplay}
                            tableCellLabels={tableCellLabels}
                            renderCell={renderCell}
                        />

                        <TablePaginationComponent
                            totalNumberOfProducts={totalNumberOfRequests}
                            currentPage={currentPage}
                            itemsPerPage={itemsPerPage}
                            setCurrentPage={setCurrentPage}
                            setItemsPerPage={setItemsPerPage}
                        />
                    </Container>
                ) : (
                    <UnauthenticatedMessage/>
                )}
            </MainLayout>
            {(requestIdToUpdate && actionType) && (
                <ApproveRejectRequestModal
                    toggleModal={toggleModal}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    requestId={requestIdToUpdate}
                    actionType={actionType}
                    updateRequest={updateRequestStatus}
                />
            )}

        </>
    );
};

export default RequestsPage;