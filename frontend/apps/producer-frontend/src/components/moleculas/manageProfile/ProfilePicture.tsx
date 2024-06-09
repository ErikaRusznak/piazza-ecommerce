import React, {useState} from "react";
import {addImageApi, useAlert} from "components";
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
    const {pushAlert} = useAlert();

    const handleProfilePicUpdate = async (file: File) => {
        try {
            const res = await addImageApi(file);
            setFileName(res.data);
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
