import React, {useEffect, useState} from "react";
import {Badge, BadgeProps} from "@mui/material";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

interface CustomizedBadgeProps extends BadgeProps {
    increaseSize: boolean;
}

const StyledBadge = styled(Badge, { shouldForwardProp: (prop) => prop !== "increaseSize" })<
    CustomizedBadgeProps
>(({ theme, increaseSize }) => ({
    "& .MuiBadge-badge": {
        right: -3,
        top: 2,
        backgroundColor: theme.palette.primary.main,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
        color: "white",
        transform: increaseSize ? "scale(1)" : "",
        transition: "transform 0.3s ease",
    },
}));

type CustomizedBadgesProps = {
    children: React.ReactNode;
    badgeContent: number;
    onClick?: (event: any) => void;
    sx?: any;
};

const CustomizedBadges = ({ children, badgeContent, sx, onClick }:CustomizedBadgesProps) => {
    const [prevBadgeContent, setPrevBadgeContent] = useState(badgeContent);
    const [increaseSize, setIncreaseSize] = useState(false);

    useEffect(() => {
        if (badgeContent !== prevBadgeContent) {
            setIncreaseSize(true);
            setTimeout(() => {
                setIncreaseSize(false);
                setPrevBadgeContent(badgeContent);
            }, 300);
        }
    }, [badgeContent, prevBadgeContent]);

    return (
        <IconButton onClick={onClick} sx={sx}>
            <StyledBadge badgeContent={badgeContent} increaseSize={increaseSize}>
                {children}
            </StyledBadge>
        </IconButton>
    );
};

export default CustomizedBadges;
