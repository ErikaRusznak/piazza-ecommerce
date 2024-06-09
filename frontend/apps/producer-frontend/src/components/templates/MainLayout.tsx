"use client";

import React, {useEffect, useState} from "react";
import Navigation from "@/components/organisms/navigation/Navigation";
import {useAlert} from "components";
import {Alert, AlertTitle, Box, LinearProgress} from "@mui/material";

type MainLayoutProps = {
    children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {

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
        alertContainer: {
            position: "fixed",
            top: "70px",
            right: 0,
            zIndex: 1000,
        },
    }
    return (
        <Navigation isSeller={true}>
            {alert && (
                <Box sx={styles.alertContainer}>
                    <Alert severity={alert.type}>
                        <AlertTitle>{alert.title}</AlertTitle>
                        {alert.paragraph}
                    </Alert>
                    {showProgress && <LinearProgress  />}
                </Box>
            )}
            {children}
        </Navigation>
    );
};

export default MainLayout;
