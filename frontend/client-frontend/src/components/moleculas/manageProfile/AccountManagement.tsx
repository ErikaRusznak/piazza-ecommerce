import React from "react";
import {Button, Paper, Typography} from "@mui/material";
import useTheme from "@/theme/themes";

const AccountManagement = () => {

    const theme = useTheme();
    const handleAccountDelete = () => {

    };

    return (
        <Paper elevation={3} style={{padding: theme.spacing(2), marginTop: 20}}>
            <Typography variant="h4">Account Management</Typography>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleAccountDelete}
            >
                Delete Account
            </Button>
        </Paper>
    );
};

export default AccountManagement;