"use client";

import {createContext, useContext, useEffect, useState} from "react";
import {getBuyerByEmailApi} from "../api/entities/BuyerApi";
import {useAuth} from "../api/auth/AuthContext";

interface ProfilePictureContextType {
    profilePictureUrl: string|null
    setProfilePictureUrl: (data: string) => void;
}

const ProfilePictureContext = createContext<ProfilePictureContextType|undefined>(undefined);

export const useProfilePicture = ():ProfilePictureContextType => {

    const context = useContext(ProfilePictureContext);
    if(!context) {
        throw new Error("useProfilePicture must be used within a ProfilePictureProvider");
    }
    return context;
};

const ProfilePictureProvider = ({children}:any) => {

    const [user, setUser] = useState<any>(null);
    const {isAuthenticated} = useAuth();

    const getBuyerByEmail = (email: string) => {
        if(isAuthenticated) {
            getBuyerByEmailApi(email)
                .then((res) => {
                    setUser(res.data);
                })
                .catch((err) => console.log(err));
        }
    }

    useEffect(() => {
        const email = sessionStorage.getItem("username");
        if (email) {
            const newEmail = JSON.parse(email);
            getBuyerByEmail(newEmail);
        }
    }, []);

    useEffect(() => {
        if(user) {
            setProfilePictureUrl(user.imageName);
        }
    }, [user]);

    const [profilePictureUrl, setProfilePictureUrl] = useState<string|null>("");

    return (
        <ProfilePictureContext.Provider value={{ profilePictureUrl, setProfilePictureUrl}}>
            {children}
        </ProfilePictureContext.Provider>
    )

};
export default ProfilePictureProvider;

