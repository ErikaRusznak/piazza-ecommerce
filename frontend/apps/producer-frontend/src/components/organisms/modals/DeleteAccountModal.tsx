import React from "react";
import {useTheme} from "@mui/material/styles";
import BaseModal from "@/components/templates/BaseModal";
import {Box, Button, Typography} from "@mui/material";
import {useThemeToggle} from "ui";

type DeleteModalProps = {
    isModalOpen: boolean;
    toggleModal: (data: boolean) => void;
    setIsModalOpen: (value: boolean) => void;
    onDelete: () => void;
    userId: string;
}

const DeleteAccountModal = ({ isModalOpen, toggleModal, setIsModalOpen, onDelete, userId }:DeleteModalProps) => {

    const theme = useTheme();
    const {isDark} = useThemeToggle();
    return (
        <BaseModal isModalOpen={isModalOpen} toggleModal={() => toggleModal(true)}>
            {userId && (
                <Box sx={{
                    color: theme.palette.info.main,
                    backgroundColor: isDark ? theme.palette.background.lighter : theme.palette.background.default,
                    px: 5, py: 3,
                    borderRadius: "14px",
                    border: "1px solid #a5b4fc",
                    textAlign: "center"
                }}>
                    <Typography>Are you sure you want to delete this account?</Typography>
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
                                        borderColor: "red",
                                        color: "red",
                                    }
                                }}
                                onClick={() => {
                                    setIsModalOpen(false);
                                    onDelete();
                                }}
                        >
                            Yes, delete
                        </Button>
                    </Box>
                </Box>
            )}
        </BaseModal>
    );
};

export default DeleteAccountModal;