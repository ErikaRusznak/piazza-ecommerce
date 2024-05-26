"use client";

import React, {useState, createContext, useContext, useEffect} from 'react';
import { ThemeProvider} from '@mui/material/styles';
import {darkTheme, lightTheme} from "@/theme/themes";


const ThemeContext = createContext({
    toggleTheme: () => {},
    isDark: false,
});

export const useThemeToggle = () => useContext(ThemeContext);

const CustomThemeProvider = ({ children }: { children: React.ReactNode }) => {

    const [isDark, setIsDark] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme ? savedTheme === 'dark' : false;
    });
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setIsDark(savedTheme === 'dark');
    }, []);

    const toggleTheme = () => {
        setIsDark(prevIsDark => {
            const newIsDark = !prevIsDark;
            localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
            return newIsDark;
        });
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
