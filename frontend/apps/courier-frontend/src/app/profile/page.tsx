"use client";

import React, {useEffect, useState} from "react";
import MainLayout from "@/components/templates/MainLayout";
import {
    Grid, Container,
} from "@mui/material";
import BreadcrumbsComponent from "@/components/atoms/Breadcrumbs";
import ProfileInformation from "@/components/moleculas/manageProfile/ProfileInformation";
import AccountManagement from "@/components/moleculas/manageProfile/AccountManagement";
import {useAuth} from "components";
import UnauthenticatedMessage from "@/components/atoms/UnauthenticatedMessage";
import {getUserAccountByEmail} from "components";

const ManageProfilePage = () => {

    const [user, setUser] = useState<any>(null);
    const {username, isAuthenticated} = useAuth();

    const getCourierByEmail = (email: string) => {
        getUserAccountByEmail(email)
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        if (username) {
            getCourierByEmail(username);
        }
    }, [username]);

    const breadcrumbsLinks = [
        {label: "Home", link: "/"},
        {label: "Profile", link: ""},
    ];
    return (
        <>
            <MainLayout>
                {isAuthenticated && user ? (
                    <>
                        <BreadcrumbsComponent links={breadcrumbsLinks}/>
                        <Container maxWidth="lg" sx={{mt: 2}}>
                            <Grid container spacing={2}>
                                <ProfileInformation
                                    user={user}
                                    setUser={setUser}
                                />
                            </Grid>
                            <AccountManagement
                                user={user}/>
                        </Container>
                    </>
                ) : (
                    <UnauthenticatedMessage/>
                )}
            </MainLayout>
        </>
    );
};

export default ManageProfilePage;
