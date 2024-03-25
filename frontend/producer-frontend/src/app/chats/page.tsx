"use client";

import React from "react";
import MainLayout from "@/components/templates/MainLayout";
import Typography from "@mui/material/Typography";
import useTheme from "@/theme/themes";

const ChatPage = () => {

    const theme = useTheme();

    return (
        <MainLayout>
            <Typography>Chat page</Typography>
        </MainLayout>
    );
};

export default ChatPage;