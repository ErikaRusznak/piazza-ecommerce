import React from 'react';
import { styled } from '@mui/system';
import { Button, Input, Typography } from '@mui/material';
import useTheme from "@/theme/themes";
import themes from "@/theme/themes";

type QuantityInput = {
    quantity: number;
    onQuantityChanged: (change: number) => void;
};

const QuantityContainer = styled("div")({
    display: "flex",
    alignItems: "center",
    border: "1px solid #a5b4fc",
    borderRadius: "0.375rem",

});

const QuantityButton = styled(Button)(({ theme }) => ({
    color: themes().palette.background.default,
    lineHeight: 1.5,
    height: "60%",
    backgroundColor: themes().palette.lightColor.main,
    '&:hover': {
        color: themes().palette.background.default,
        backgroundColor: themes().palette.secondary.main,
    },
    minWidth: "40px",
}));

const QuantityInput: React.FC<QuantityInput> = ({ quantity, onQuantityChanged }) => {
    const theme = useTheme();

    return (
        <QuantityContainer>
            <QuantityButton type="button" onClick={() => onQuantityChanged(-1)}>
                -
            </QuantityButton>

            <Typography
                variant="body2"
                component="div"
                id="quantity"
                sx={{
                    backgroundColor: theme.palette.background.default,
                    height: "2.5rem",
                    width: "2.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "none",
                    color: theme.palette.info.main,
                }}
            >
                {quantity}
            </Typography>

            <QuantityButton type="button" onClick={() => onQuantityChanged(1)}>
                +
            </QuantityButton>
        </QuantityContainer>
    );
};

export default QuantityInput;
