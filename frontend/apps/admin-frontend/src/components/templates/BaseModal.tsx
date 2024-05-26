import React, { FC } from 'react';
import {Modal, Fade, useMediaQuery, Box} from "@mui/material";
import { useTheme } from '@mui/material/styles';

type BaseModalProps = {
    children: React.ReactNode;
    isModalOpen: boolean;
    toggleModal: () => void;
};

const BaseModal: FC<BaseModalProps> = ({ children, isModalOpen, toggleModal }) => {
    const theme = useTheme();
    const smallScreenSize = useMediaQuery(theme.breakpoints.down("sm"));

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    };

    const modalStyle = {
        width: smallScreenSize ? 300 : 400,
        p: 4,
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isModalOpen}
            onClose={toggleModal}
            closeAfterTransition
        >
            <Fade in={isModalOpen}>
                <Box sx={{ ...style, ...modalStyle }}>
                    {children}
                </Box>
            </Fade>
        </Modal>
    );
};

export default BaseModal;
