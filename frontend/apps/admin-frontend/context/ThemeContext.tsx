"use client";

import React, { useState, createContext, useContext } from 'react';
import { ThemeProvider, useTheme as useMuiTheme } from '@mui/material/styles';
import {darkTheme, lightTheme} from "@/theme/themes";


const ThemeContext = createContext({
    toggleTheme: () => {},
    isDark: false,
});

export const useThemeToggle = () => useContext(ThemeContext);
export const useTheme = () => useMuiTheme();

const CustomThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    return (
        <ThemeContext.Provider value={{ toggleTheme, isDark }}>
            <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

export default CustomThemeProvider;
