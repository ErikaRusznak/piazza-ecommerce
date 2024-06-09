import * as React from 'react';
import {useTheme} from "@mui/material/styles";
import {NavigationAdmProd} from "ui";
import {
    CategoryIcon, ChatIcon,
    PersonIcon, ShoppingCartCheckoutIcon
} from "@/components/atoms/icons";
import {useAuth} from "../../../../api/auth/AuthContext";

export default function Navigation({children}: { children: React.ReactNode, isSeller: boolean }) {

    const theme = useTheme();
    const {isAuthenticated, logout} = useAuth();

    const informationList = [
        {label: "Products", icon: <CategoryIcon sx={{color: theme.palette.info.main}}/>, href: "/products"},
        {label: "Orders", icon: <ShoppingCartCheckoutIcon sx={{color: theme.palette.info.main}}/>, href: "/orders"},
        {label: "Chat", icon: <ChatIcon sx={{color: theme.palette.info.main}}/>, href: "/chats"}
    ];

    const profileList = [
        {label: "Profile", icon: <PersonIcon sx={{color: theme.palette.info.main}}/>, href: "/profile"},
    ];

    return (
        <NavigationAdmProd
            isSeller={true}
            isAuthenticated={isAuthenticated}
            logout={logout}
            nameOfPortal={"Seller Portal"}
            informationList={informationList}
            profileList={profileList}
        >
            {children}
        </NavigationAdmProd>
    );
}
