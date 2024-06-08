import React, {useState} from "react";
import {addImageApi} from "components";
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
    imageName: string;
};

const ProfilePicture = ({setUser, user}:ProfilePictureProps) => {

    const [fileName, setFileName] = useState<string>(user.imageName);
    const {profilePictureUrl, setProfilePictureUrl} = useProfilePicture();

    const handleProfilePicUpdate = async (file: File) => {
        try {
            const res = await addImageApi(file);
            setFileName(res.data);
            setProfilePictureUrl(res.data);
            return res.data;
        } catch (err) {
            console.error(err);
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
