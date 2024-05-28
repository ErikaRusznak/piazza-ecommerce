import React from "react";
import { Box, Collapse, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {KeyboardArrowDownIcon, KeyboardArrowRightIcon} from "@/components/atoms/icons";
import {useTheme} from "@mui/material/styles";

type ExpandableItemProps = {
    label: string;
    children: React.ReactNode;
    isOpen: boolean;
    onClick: () => void;
}
const ExpandableItem = ({ label, children, isOpen, onClick }:ExpandableItemProps) => {

    const theme = useTheme();
    return (
        <Box >
            <Box onClick={onClick} sx={{ cursor: 'pointer' }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        borderBottom: '1px solid #a5b4fc',
                        borderRadius: "5px",
                        '&:hover': {
                            borderColor: theme.palette.lightColor.main,
                        },
                        color: theme.palette.info.main,
                    }}
                >
                    <Typography sx={{fontSize: "18px"}}>{label}</Typography>
                    <IconButton sx={{padding: 0}}>
                        {!isOpen ? (
                            <KeyboardArrowRightIcon style={{color: theme.palette.info.main}}/>
                        ):(
                            <KeyboardArrowDownIcon style={{color: theme.palette.info.main}}/>
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