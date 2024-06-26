'use client';
import React, { useEffect, useState } from "react";
import NavigationBar from "@/components/organisms/navbar/NavigationBar";
import {Alert, AlertTitle, Box, LinearProgress, SxProps, Theme} from "@mui/material";
import Footer from "@/components/organisms/footer/Footer";
import { useTheme } from "@mui/material/styles";
import { useThemeToggle } from "ui";
import { useAlert } from "components";
import {GlobalScrollBar} from "ui";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    const theme = useTheme();
    const { isDark } = useThemeToggle();
    const { alert } = useAlert();
    const [showProgress, setShowProgress] = useState(false);

    useEffect(() => {
        if (alert) {
            setShowProgress(true);
            const timer = setTimeout(() => {
                setShowProgress(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    const styles = {
        root: {
            display: "flex",
            flexDirection: "column",
            width: "auto",
            height: "100vh",
        },
        main: {
            flex: "1 1 100%",
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(5, 2, 2, 2),
        },
        footer: {
            backgroundColor: isDark ? theme.palette.background.lighter : "#DBE1FD",
            padding: theme.spacing(2, 2, 2, 2),
        },
        alertContainer: {
            position: "fixed",
            top: "70px",
            right: 0,
            zIndex: 1000,
        },
        '@global': {
            '*::-webkit-scrollbar': {
                width: '0.4em'
            },
            '*::-webkit-scrollbar-track': {
                '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
            },
            '*::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0,0,0,.1)',
                outline: '1px solid slategrey'
            }
        }
    };

    let mainStyles: SxProps<Theme> = [styles.footer, styles.main];
    return (
        <main>
            <NavigationBar />
            {alert && (
                <Box sx={styles.alertContainer}>
                    <Alert severity={alert.type}>
                        <AlertTitle>{alert.title}</AlertTitle>
                        {alert.paragraph}
                    </Alert>
                    {showProgress && <LinearProgress  />} {/* Linear progress bar */}
                </Box>
            )}
            <Box sx={styles.root} id="root">
                <Box component="main" sx={mainStyles}>
                    {children}
                </Box>
                <Box sx={[styles.footer]}>
                    <Footer />
                </Box>
            </Box>
        </main>
    );
};

export default MainLayout;
