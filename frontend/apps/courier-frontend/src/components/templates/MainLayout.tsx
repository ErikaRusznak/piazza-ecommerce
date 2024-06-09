'use client';
import React, {useEffect, useState} from "react";
import NavigationBar from "@/components/organisms/navbar/NavigationBar";
import {Alert, AlertTitle, Box, LinearProgress, SxProps, Theme} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import { useAlert } from "components";

interface MainLayoutProps {
    children: React.ReactNode;
}
const MainLayout = ({
                        children,
                    }: MainLayoutProps) => {
    const theme = useTheme();
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
            // paddingTop: {xs: "56px", sm: "64px"},
        },
        layoutPaddings: {
            //margin: theme.spacing(0, 2),
            // [theme.breakpoints.down("md")]: {
            //   padding: theme.spacing(0, 0),
            // },
        },

        main: {
            flex: "1 1 100%",
            backgroundColor: theme.palette.background.default,
            // backgroundSize: "cover",
            padding: theme.spacing(5, 2, 2, 2),
        },
        alertContainer: {
            position: "fixed",
            top: "70px",
            right: 0,
            zIndex: 1000,

        },
    };

    let mainStyles: SxProps<Theme> = [styles.layoutPaddings, styles.main];

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
            </Box>
        </main>
    );
};

export default MainLayout;
