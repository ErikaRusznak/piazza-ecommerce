import React from "react";
import { useTheme } from '@mui/material/styles';
import {BaseModal} from "ui";
import {Box, Button, Typography} from "@mui/material";
import {approveSellerRequestsApi, rejectSellerRequestApi} from "../../../../api/entities/SellerRequestsApi";
import {useAlert} from "components";

type ApproveRejectRequestModalProps = {
    isModalOpen: boolean;
    toggleModal: (id: number|null, actionType: string|null) => void;
    setIsModalOpen: (value: boolean) => void;
    requestId: number;
    actionType: string;
    updateRequest: (requestId: number, status: string) => void;
};

const ApproveRejectRequestModal = ({ isModalOpen,
                                     toggleModal,
                                     setIsModalOpen,
                                     requestId,
                                     actionType,
                                     updateRequest
                                   }: ApproveRejectRequestModalProps) => {

    const theme = useTheme();
    const {pushAlert} = useAlert();

    const getRequestApproved = () => {
        approveSellerRequestsApi(requestId)
            .then((res) => {
                updateRequest(requestId, res.data.status);
                pushAlert({
                    type: "success",
                    title: "Approve request",
                    paragraph: "Email was sent to the seller!"
                });
            })
            .catch((err) => {
                console.error(err);
                pushAlert({
                    type: "error",
                    title: "Approve request",
                    paragraph: "Could not approve request."
                });
            })
    };

    const getRequestRejected = () => {
        rejectSellerRequestApi(requestId)
            .then((res) => {
                updateRequest(requestId, res.data.status);
                pushAlert({
                    type: "success",
                    title: "Reject request",
                    paragraph: "Email was sent to the seller!"
                });
            })
            .catch((err) => {
                console.error(err);
                pushAlert({
                    type: "error",
                    title: "Reject request",
                    paragraph: "Could not reject request."
                });
            })
    };

    const handleAction = () => {
        if(actionType === "approve") {
            getRequestApproved();
        } else {
            getRequestRejected();
        }
        setIsModalOpen(false);
    };
    return (
        <BaseModal isModalOpen={isModalOpen} toggleModal={() => toggleModal(requestId, null)}>
            {requestId && (
                <Box sx={{
                    color: theme.palette.info.main,
                    backgroundColor: theme.palette.background.default,
                    px: 5, py: 3,
                    borderRadius: "14px",
                    border: "1px solid #a5b4fc",
                    textAlign: "center"
                }}>
                    <Typography>Are you sure you want to {actionType} this request?</Typography>
                    <Box sx={{display: "flex", justifyContent: "space-between", mt: 3}}>
                        <Button variant="outlined" size="small"
                                sx={{
                                    borderColor: theme.palette.lightColor.main,
                                    color: theme.palette.lightColor.main,
                                    "&:hover": {
                                        borderColor: theme.palette.primary.main,
                                        color: theme.palette.primary.main,
                                    }
                                }}
                                onClick={() => setIsModalOpen(false)}
                        >
                            No, cancel
                        </Button>
                        <Button variant="outlined" size="small"
                                sx={{
                                    borderColor: theme.palette.lightColor.main,
                                    color: theme.palette.lightColor.main,
                                    "&:hover": {
                                        borderColor: actionType === "approve" ? "green" : "red",
                                        color: actionType === "approve" ? "green" : "red",
                                    }
                                }}
                                onClick={handleAction}
                        >
                            Yes, {actionType}
                        </Button>
                    </Box>
                </Box>
            )}
        </BaseModal>
    );
};

export default ApproveRejectRequestModal;