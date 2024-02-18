import React from "react";
import {Accordion, AccordionDetails, AccordionSummary, Box, Collapse, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {KeyboardArrowDownIcon, KeyboardArrowRightIcon} from "@/components/atoms/icons";

type ExpandableItemProps = {
    label: string;
    children: React.ReactNode;
    isOpen: boolean;
    onClick: () => void;
}
const ExpandableItem = ({ label, children, isOpen, onClick }:ExpandableItemProps) => {
    return (
        <Box >
            <Box onClick={onClick} sx={{ cursor: 'pointer' }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        // borderBottom: '1px solid #d7d7d7',
                        borderRadius: 'md',
                        paddingBottom: 1,
                        transition: 'border-color 0.3s',
                        '&:hover': {
                            borderColor: '#4CAF50', // Example hover border color
                        },
                        color: 'text.primary',
                    }}
                >
                    <Typography variant="h6">{label}</Typography>
                    <IconButton>
                        {!isOpen ? (
                            <KeyboardArrowRightIcon />
                        ):(
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </Box>

                <Collapse in={isOpen}>
                    <Box sx={{ left: '0' }}>
                        <Box sx={{ zIndex: 50 }}>
                            {children}
                        </Box>
                    </Box>
                </Collapse>
            </Box>
        </Box>
    );
};
export default ExpandableItem;