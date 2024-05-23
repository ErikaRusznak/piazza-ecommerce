"use client";

import React, {useEffect, useState} from "react";
import MainLayout from "@/components/templates/MainLayout";
import { Container} from "@mui/material";
import ProfileInformation from "@/components/moleculas/manageProfile/ProfileInformation";
import {getUserAccountByEmail} from "../../../api/entities/UserAccount";
import {useAuth} from "../../../api/auth/AuthContext";
import UnauthenticatedMessage from "@/components/atoms/UnauthenticatedMessage";

const ManageProfilePage = () => {

    const [user, setUser] = useState<any>(null);
    const {isAuthenticated} = useAuth();
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

    return (
        <MainLayout>
            {isAuthenticated ? (
                (user) && (
                    <>
                        <Container maxWidth="lg" sx={{mt: 2}}>
                            <ProfileInformation
                                user={user}
                                setUser={setUser}
                            />
                        </Container>
                    </>
                )
            ) : (
                <UnauthenticatedMessage/>
            )}
        </MainLayout>
    );
};

export default ManageProfilePage;
