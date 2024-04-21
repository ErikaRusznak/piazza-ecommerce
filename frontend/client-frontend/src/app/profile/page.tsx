"use client";

import React, {useEffect, useState} from "react";
import MainLayout from "@/components/templates/MainLayout";
import {
    Grid, Container,
} from "@mui/material";
import BreadcrumbsComponent from "@/components/atoms/Breadcrumbs";
import ProfileInformation from "@/components/moleculas/manageProfile/ProfileInformation";
import ProfilePicture from "@/components/moleculas/manageProfile/ProfilePicture";
import AddressManagement from "@/components/moleculas/manageProfile/AddressManagement";
import AccountManagement from "@/components/moleculas/manageProfile/AccountManagement";
import {getBuyerByEmailApi} from "../../../api/entities/BuyerApi";

const ManageProfilePage = () => {

    const [user, setUser] = useState<any>(null);

    const getBuyerByEmail = (email: string) => {
        getBuyerByEmailApi(email)
            .then((res) => {
                console.log("res", res.data);
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

    const [addresses, setAddresses] = useState<any>([]);
    const [profileData, setProfileData] = useState<any>({
        firstName: "",
        lastName: "",
        email: "",
        telephone: "",
        newProfilePicture: null,
    });

    const handleProfileUpdate = () => {
        // Implement profile update functionality
        // Use profileData state to update user profile information
    };


    const handleProfilePictureChange = (event: any) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileData((prevState: any) => ({
                ...prevState,
                newProfilePicture: reader.result,
            }));
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

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
                            handleProfilePictureChange={handleProfileUpdate}
                            profileData={profileData}
                            user={user}
                        />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <ProfileInformation
                            user={user}
                            setUser={setUser}
                        />

                    </Grid>
                </Grid>
                <AddressManagement
                    addresses={addresses || []}
                />
                <AccountManagement/>
            </Container>
        </MainLayout>
    );
};

export default ManageProfilePage;
