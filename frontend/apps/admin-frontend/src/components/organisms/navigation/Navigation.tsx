import * as React from 'react';
import {useTheme} from '@mui/material/styles';
import PeopleIcon from '@mui/icons-material/People';
import {
    CategoryIcon, PersonIcon,
} from "@/components/atoms/icons";
import {useAuth} from "components";
import {NavigationAdmProd} from "ui";

export default function Navigation({children}: { children: React.ReactNode }) {

    const theme = useTheme();
    const {isAuthenticated, logout} = useAuth();

    const informationList = [
        {label: "Categories", icon: <CategoryIcon sx={{color: theme.palette.info.main}}/>, href: "/categories"},
        {label: "Requests", icon: <PeopleIcon sx={{color: theme.palette.info.main}}/>, href: "/requests"},
    ];

    const profileList = [
        {label: "Profile", icon: <PersonIcon sx={{color: theme.palette.info.main}}/>, href: "/profile"},
    ];

    return (
        <NavigationAdmProd
            isSeller={false}
            isAuthenticated={isAuthenticated}
            logout={logout}
            nameOfPortal={"Admin Portal"}
            informationList={informationList}
            profileList={profileList}
        >
            {children}
        </NavigationAdmProd>
    );
}
