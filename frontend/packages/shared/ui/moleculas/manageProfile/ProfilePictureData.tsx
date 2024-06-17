"use client";

import {Avatar, Box, Grid, IconButton} from "@mui/material";
import {Edit} from "@mui/icons-material";
import {baseURL, updateUserAccountApi} from "components";
import {useTheme} from "@mui/material/styles";
import {useState} from "react";
import {UserType} from "client-frontend/src/components/moleculas/manageProfile/ProfilePicture";

type ProfilePictureDataProps = {
    setUser: (data: UserType)=>void;
    user: UserType;
    handleProfilePicUpdate: (file: File) => Promise<any>;
    fileName: string | null;
};

const ProfilePictureData = ({user, setUser, handleProfilePicUpdate, fileName}:ProfilePictureDataProps) => {

    const theme = useTheme();
    const [hovered, setHovered] = useState<boolean>(false);

    const handleButtonClick = () => {
        const fileInput = document.getElementById("file-input");
        if (fileInput) {
            fileInput.click();
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

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const fileName = await handleProfilePicUpdate(file);
            updateUser(user, fileName);
        }
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

export default ProfilePictureData;