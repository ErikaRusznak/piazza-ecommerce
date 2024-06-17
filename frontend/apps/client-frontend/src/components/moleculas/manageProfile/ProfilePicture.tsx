import React, {useState} from "react";
import {addImageApi, useAlert} from "components";
import {useProfilePicture} from "../../../../contexts/ProfilePictureContext";
import {ProfilePictureData} from "ui";

type ProfilePictureProps = {
    setUser: (data: UserType)=>void;
    user: UserType;
}

export type UserType = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    imageName: string | null;
    password: string;
    userRole: string;
};

const ProfilePicture = ({setUser, user}:ProfilePictureProps) => {

    const [fileName, setFileName] = useState<string | null>(user?.imageName);
    const {profilePictureUrl, setProfilePictureUrl} = useProfilePicture();
    const {pushAlert} = useAlert();

    const handleProfilePicUpdate = async (file: File) => {
        try {
            const res = await addImageApi(file);
            setFileName(res.data);
            setProfilePictureUrl(res.data);
            pushAlert({
                type: "success",
                title: "Profile picture updated",
                paragraph: "Profile picture was updated successfully!"
            });
            return res.data;
        } catch (err) {
            console.error(err);
            pushAlert({
                type: "error",
                title: "Error updating profile picture",
                paragraph: "Could not update profile picture."
            });
            return "";
        }
    };

    return (
        <ProfilePictureData
            user={user}
            setUser={setUser}
            handleProfilePicUpdate={handleProfilePicUpdate}
            fileName={fileName}
        />
    );
};

export default ProfilePicture;
