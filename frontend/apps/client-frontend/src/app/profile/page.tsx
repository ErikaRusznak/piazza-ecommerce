"use client";

import React, {useEffect, useState} from "react";
import MainLayout from "@/components/templates/MainLayout";
import {
    Grid, Container,
} from "@mui/material";
import {BreadcrumbsComponent} from "ui";
import {ProfileInformation} from "ui";
import ProfilePicture, {UserType} from "@/components/moleculas/manageProfile/ProfilePicture";
import AddressManagement from "@/components/moleculas/manageProfile/AddressManagement";
import {AccountManagement} from "ui";
import {getUserAccountByEmail, useAuth} from "components";
import {deleteAccountForBuyerByIdApi} from "../../../api/entities/UserAccount";
import {useRouter} from "next/navigation";
const ManageProfilePage = () => {

    const [user, setUser] = useState<UserType | null>(null);

    const router = useRouter();
    const {isAuthenticated} = useAuth();
    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, []);

    const getBuyerByEmail = (email: string) => {
        getUserAccountByEmail(email)
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => console.error(err));
    }

    useEffect(() => {
        const email = sessionStorage.getItem("username");
        if (email) {
            const newEmail = JSON.parse(email);
            getBuyerByEmail(newEmail);
        }
    }, []);


    const breadcrumbsLinks = [
        {label: "Home", link: "/"},
        {label: "Profile", link: ""},
    ];

    return user && (
        <MainLayout>
            <Container maxWidth="lg">
                <BreadcrumbsComponent links={breadcrumbsLinks}/>
                <Grid container spacing={2}>

                    <Grid item xs={12} md={4}>
                        <ProfilePicture
                            user={user}
                            setUser={setUser}
                        />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <ProfileInformation
                            user={user}
                            setUser={setUser}
                        />
                    </Grid>
                </Grid>
                <AddressManagement/>
                <AccountManagement
                    user={user}
                    deleteAccountApi={deleteAccountForBuyerByIdApi}
                />
            </Container>
        </MainLayout>
    );
};

export default ManageProfilePage;
