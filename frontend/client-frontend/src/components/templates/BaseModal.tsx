import React, { FC } from 'react';
import { Box, useTheme } from '@mui/system';
import {Modal} from "@mui/base";
import {Backdrop, Fade, useMediaQuery} from "@mui/material";

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
        width: smallScreenSize ? 300 : 400,
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isModalOpen}
                onClose={toggleModal}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
            >
                <Fade in={isModalOpen}>
                    <Box sx={style}>
                        {children}
                    </Box>
                </Fade>
            </Modal>

        </div>
    );
};

export default BaseModal;
