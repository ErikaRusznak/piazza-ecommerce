import React, {useState} from "react";
import {addImageApi} from "components";
import {ProfilePictureData} from "ui";

export type UserType = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    imageName: string;
}

type ProfilePictureProps = {
    setUser: (data: UserType)=>void;
    user: UserType;
}


const ProfilePicture = ({setUser, user}:ProfilePictureProps) => {

    const [fileName, setFileName] = useState<string>(user.imageName);

    const handleProfilePicUpdate = async (file: File) => {
        try {
            const res = await addImageApi(file);
            setFileName(res.data);
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
