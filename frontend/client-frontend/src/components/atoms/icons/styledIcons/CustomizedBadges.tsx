import * as React from 'react';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import themes from "@/theme/themes";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 2,
        backgroundColor: themes().palette.background.lighter,
        border: `2px solid ${themes().palette.background.paper}`,
        padding: '0 4px',
        color: themes().palette.info.main,
    },
}));

type CustomizedBadgesProps = {
    children: React.ReactNode;
    badgeContent: number;
    onClick?: (event: any) => void;
    sx?: any;
};

const CustomizedBadges = ({ children, badgeContent, sx, onClick }: CustomizedBadgesProps) => {
    return (
        <IconButton onClick={onClick} sx={sx}>
            <StyledBadge badgeContent={badgeContent}>
                {children}
            </StyledBadge>
        </IconButton>
    );
};

export default CustomizedBadges;