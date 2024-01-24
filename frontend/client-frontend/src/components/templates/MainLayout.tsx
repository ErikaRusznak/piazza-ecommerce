import React, { PropsWithChildren } from "react";
import NavigationBar from "@/components/organisms/NavigationBar";

const MainLayout = ({ children }: PropsWithChildren) => {

    return (
        <>
            <NavigationBar />
            {children}
        </>
    );
};
export default MainLayout;
