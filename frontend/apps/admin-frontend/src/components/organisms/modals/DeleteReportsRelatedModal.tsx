import React from "react";
import { useTheme } from '@mui/material/styles';
import {BaseModal} from "ui";
import {useRouter} from "next/navigation";
import {Box, Button, Typography} from "@mui/material";

type DeleteReportsRelatedModalProps = {
    isModalOpen: boolean;
    toggleModal: () => void;
    setIsModalOpen: (value: boolean) => void;
    onDelete: () => void;
    description: string;
};

const DeleteReportsRelatedModal = ({   isModalOpen,
                                 toggleModal,
                                 setIsModalOpen,
                                 onDelete,
                                 description,
                             }: DeleteReportsRelatedModalProps) => {

    const theme = useTheme();

    const handleDelete = () => {
        onDelete();
    };

    return (
        <BaseModal isModalOpen={isModalOpen} toggleModal={toggleModal}>

                <Box sx={{
                    color: theme.palette.info.main,
                    backgroundColor: theme.palette.background.default,
                    px: 5, py: 3,
                    borderRadius: "14px",
                    border: "1px solid #a5b4fc",
                    textAlign: "center"
                }}>
                    <Typography>{description}</Typography>
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
                                onClick={handleDelete}
                        >
                            Yes, delete
                        </Button>
                    </Box>
                </Box>

        </BaseModal>
    );
};

export default DeleteReportsRelatedModal;