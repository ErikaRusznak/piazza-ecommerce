import React, { PropsWithChildren } from "react";
import NavigationBar from "@/components/organisms/NavigationBar";
import {PaletteMode} from "@mui/material";

const MainLayout = ({ children }: PropsWithChildren) => {

    return (
        <>
            <NavigationBar />
            {children}
        </>
    );
};
export default MainLayout;
