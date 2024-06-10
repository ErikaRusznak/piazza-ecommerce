"use client";

/** @jsxImportSource @emotion/react */
import { Global, css } from '@emotion/react';
import { useTheme } from '@mui/material/styles';

const GlobalStyles = () => {
    const theme = useTheme();

    return (
        <Global
            styles={css`
                body {
                    scrollbar-color: ${theme.palette.primary.main} ${theme.palette.background.default};
                    scrollbar-width: thin;
                }
                body::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }
                body::-webkit-scrollbar-thumb {
                    background-color: ${theme.palette.primary.main};
                    border-radius: 10px;
                    border: 2px solid ${theme.palette.background.default};
                }
                body::-webkit-scrollbar-track {
                    background: ${theme.palette.background.default};
                }
            `}
        />
    );
};

export default GlobalStyles;
