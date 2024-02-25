import React from 'react';
import { styled } from '@mui/system';
import { Button, Input, Typography } from '@mui/material';

type QuantityInput = {
    quantity: number;
    onQuantityChanged: (change: number) => void;
};

const QuantityContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #E5E7EB',
    borderRadius: '0.375rem',
});

const QuantityButton = styled(Button)(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? 'white' : 'gray',
    backgroundColor: theme.palette.mode === 'dark' ? '#192235' : 'white',
    '&:hover': {
        color: theme.palette.mode === 'dark' ? 'black' : 'white',
        backgroundColor: theme.palette.mode === 'dark' ? '#192235' : 'blue',
    },
}));

const QuantityInput: React.FC<QuantityInput> = ({ quantity, onQuantityChanged }) => {
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
                    backgroundColor: '#192235',
                    height: '2.5rem',
                    width: '4rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    color: 'white',
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
