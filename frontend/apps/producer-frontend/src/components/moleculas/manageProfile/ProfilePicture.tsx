import React, {useState} from "react";
import {Avatar, Box, Grid, IconButton} from "@mui/material";
import {Edit} from "@mui/icons-material";
import {useTheme} from "@mui/material/styles";
import {addImageApi} from "components";
import {UserType} from "@/components/moleculas/manageProfile/ProfileInformation";
import {baseURL} from "components";
import {updateUserAccountApi} from "components";

type ProfilePictureProps = {
    setUser: (data: UserType)=>void;
    user: UserType;
}
const ProfilePicture = ({setUser, user}:ProfilePictureProps) => {

    const theme = useTheme();

    const [fileName, setFileName] = useState<string>(user.imageName);
    const [hovered, setHovered] = useState<boolean>(false);

    const handleButtonClick = () => {
        const fileInput = document.getElementById("file-input");
        if (fileInput) {
            fileInput.click();
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const fileName = await handleProfilePicUpdate(file);
            updateUser(user, fileName);
        }
    };

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

    const updateUser = (user: UserType, fileName: string) => {
        updateUserAccountApi(user.id, user.firstName, user.lastName, user.email, fileName, user.telephone)
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                console.error(err);
            })
    };

    return (
        <Box sx={{border: "1px solid #a5b4fc", borderRadius: "14px"}}>
            <Grid
                container
                justifyContent="center"
                alignItems="center"
            >
                <label htmlFor="icon-button-file">
                    <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        onClick={handleButtonClick}
                        sx={{
                            "&:hover": {
                                "& > .MuiAvatar-root": {
                                    filter: "brightness(50%)",
                                    transition: "filter 0.3s ease-in-out",
                                },
                            },
                        }}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        <Avatar
                            alt={fileName ?? "profile-pic"}
                            src={ `${baseURL}${fileName}` || user.imageName  }
                            sx={{width: 150, height: 150, transition: "filter 0.3s ease-in-out",}}
                        />
                        {hovered && (
                            <Edit
                                sx={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    color: theme.palette.common.white,
                                    opacity: 0.8,
                                    transition: "opacity 0.3s ease-in-out",
                                }}
                            />
                        )}
                    </IconButton>
                </label>
                <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    style={{display: "none"}}
                    onChange={handleFileChange}
                />
            </Grid>
        </Box>
    );
};

export default ProfilePicture;
