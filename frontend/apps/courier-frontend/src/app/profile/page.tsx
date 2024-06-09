"use client";

import React, {useEffect, useState} from "react";
import MainLayout from "@/components/templates/MainLayout";
import {
    Grid, Container,
} from "@mui/material";
import {BreadcrumbsComponent} from "ui";
import {ProfileInformation} from "ui";
import {AccountManagement} from "ui";
import {useAuth} from "components";
import {UnauthenticatedMessage} from "ui";
import {getUserAccountByEmail} from "components";
import {deleteAccountForCourierByIdApi} from "../../../api/entities/UserAccount";

const ManageProfilePage = () => {

    const [user, setUser] = useState<any>(null);
    const {username, isAuthenticated} = useAuth();

    const getCourierByEmail = (email: string) => {
        getUserAccountByEmail(email)
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => console.error(err));
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
        <MainLayout>
            {isAuthenticated && user ? (
                <>
                    <Container maxWidth="lg" sx={{mt: 2}}>
                        <BreadcrumbsComponent links={breadcrumbsLinks}/>
                        <Grid container spacing={2} mt={1}>
                            <ProfileInformation
                                user={user}
                                setUser={setUser}
                            />
                        </Grid>
                        <AccountManagement
                            user={user}
                            deleteAccountApi={deleteAccountForCourierByIdApi}
                        />
                    </Container>
                </>
            ) : (
                <UnauthenticatedMessage/>
            )}
        </MainLayout>
    );
};

export default ManageProfilePage;
