import React from "react";
import {Avatar, Grid, IconButton, Paper} from "@mui/material";
import {PhotoCamera} from "@mui/icons-material";
import useTheme from "@/theme/themes";

type ProfilePictureProps = {
    handleProfilePictureChange: () => void;
    profileData: any;
    user: any;
}
const ProfilePicture = ({handleProfilePictureChange, profileData, user}:ProfilePictureProps) => {

    const theme = useTheme();
    return (
        <Paper elevation={3} style={{padding: theme.spacing(2)}}>
            <Grid container justifyContent="center" alignItems="center">
                <input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    style={{display: "none"}}
                    onChange={handleProfilePictureChange}
                />
                <label htmlFor="icon-button-file">
                    <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                    >
                        <Avatar
                            alt="Profile Picture"
                            src={profileData.newProfilePicture || user?.imageName}
                            sx={{width: 150, height: 150}}
                        />
                        <PhotoCamera fontSize="large"/>
                    </IconButton>
                </label>
            </Grid>
        </Paper>
    );
};

export default ProfilePicture;
