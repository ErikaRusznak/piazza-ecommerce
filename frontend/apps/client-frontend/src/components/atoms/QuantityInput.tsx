import React from 'react';
import { styled } from '@mui/system';
import { Button, Typography } from '@mui/material';
import {useTheme} from "@mui/material/styles";

type QuantityInput = {
    quantity: number;
    onQuantityChanged: (change: number) => void;
    availableQuantity: number;
};

const QuantityContainer = styled("div")({
    display: "flex",
    alignItems: "center",
    border: "1px solid #a5b4fc",
    borderRadius: "0.375rem",

});

const QuantityButton = styled(Button)(({ theme }) => ({
    color: theme.palette.background.default,
    lineHeight: 1.5,
    height: "60%",
    backgroundColor: theme.palette.lightColor.main,
    '&:hover': {
        color: theme.palette.background.default,
        backgroundColor: theme.palette.secondary.main,
    },
    minWidth: "40px",
}));

const QuantityInput: React.FC<QuantityInput> = ({ quantity, onQuantityChanged, availableQuantity }) => {
    const theme = useTheme();

    return (
        <QuantityContainer>
            <QuantityButton type="button" disabled={quantity == 1} onClick={() => onQuantityChanged(-1)}>
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

            <QuantityButton type="button" disabled={quantity >= availableQuantity} onClick={() => onQuantityChanged(1)}>
                +
            </QuantityButton>
        </QuantityContainer>
    );
};

export default QuantityInput;
