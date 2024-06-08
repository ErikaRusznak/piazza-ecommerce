"use client";

import React, {useEffect, useState} from "react";
import MainLayout from "@/components/templates/MainLayout";
import {
    Grid, Container,
} from "@mui/material";
import {BreadcrumbsComponent} from "ui";
import {ProfileInformation} from "ui";
import ProfilePicture from "@/components/moleculas/manageProfile/ProfilePicture";
import AddressManagement from "@/components/moleculas/manageProfile/AddressManagement";
import {AccountManagement} from "ui";
import {getUserAccountByEmail} from "components";
import {deleteAccountForBuyerByIdApi} from "../../../api/entities/UserAccount";

const ManageProfilePage = () => {

    const [user, setUser] = useState<any>(null);

    const getBuyerByEmail = (email: string) => {
        getUserAccountByEmail(email)
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => console.log(err));
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
            <BreadcrumbsComponent links={breadcrumbsLinks}/>
            <Container maxWidth="lg" sx={{mt: 2}}>
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
