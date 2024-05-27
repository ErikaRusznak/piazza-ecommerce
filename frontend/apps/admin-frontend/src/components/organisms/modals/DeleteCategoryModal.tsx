import React from "react";
import { useTheme } from '@mui/material/styles';
import {BaseModal} from "ui";
import {useRouter} from "next/navigation";
import {Box, Button, Typography} from "@mui/material";
import {deleteCategoryByIdApi} from "../../../../api/entities/CategoryApi";

type DeleteModalProps = {
    isModalOpen: boolean;
    toggleModal: (id: number|null) => void;
    setIsModalOpen: (value: boolean) => void;
    categoryId: number;
    onDelete: (id: number) => void;
};

const DeleteCategoryModal = ({   isModalOpen,
                         toggleModal,
                         setIsModalOpen,
                         categoryId,
                         onDelete   }: DeleteModalProps) => {

    const theme = useTheme();
    const router = useRouter();

    const handleDelete = () => {
        deleteCategoryByIdApi(categoryId)
            .then(res => {
                onDelete(categoryId);
                router.push("/categories");
                setIsModalOpen(false);
            })
            .catch(err => console.log(err))

    };

    return (
        <BaseModal isModalOpen={isModalOpen} toggleModal={() => toggleModal(categoryId)}>
            {categoryId && (
                <Box sx={{
                    color: theme.palette.info.main,
                    backgroundColor: theme.palette.background.default,
                    px: 5, py: 3,
                    borderRadius: "14px",
                    border: "1px solid #a5b4fc",
                    textAlign: "center"
                }}>
                    <Typography>Are you sure you want to delete this category?</Typography>
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
            )}
        </BaseModal>
    );
};

export default DeleteCategoryModal;