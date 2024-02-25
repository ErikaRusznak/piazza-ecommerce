import React, { FC, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box, useTheme } from '@mui/system';
import {Modal} from "@mui/base";
import {Backdrop, Fade, Typography} from "@mui/material";

type BaseModalProps = {
    children: React.ReactNode;
    isModalOpen: boolean;
    toggleModal: () => void;
};

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const BaseModal: FC<BaseModalProps> = ({ children, isModalOpen, toggleModal }) => {

    const theme = useTheme();

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
