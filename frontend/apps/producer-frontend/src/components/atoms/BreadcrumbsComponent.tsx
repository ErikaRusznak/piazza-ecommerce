import React from "react";
import {Breadcrumbs} from "@mui/material";
import Link from '@mui/material/Link';
import useTheme from "@/theme/themes";

type LinksBreadcrumbType = {
    label: string;
    link: string;
};

type BreadcrumbsComponentProps = {
    links: LinksBreadcrumbType[];
};

const BreadcrumbsComponent = ({links}: BreadcrumbsComponentProps) => {
    const theme = useTheme();

    return (
        <Breadcrumbs aria-label="breadcrumb" sx={{ml:2}} color={theme.palette.info.main}>
            {links.map((item:LinksBreadcrumbType) => (
                <Link key={`${item.label}-${item.link}`}
                      underline="hover"
                      color="inherit" href={item.link}
                      sx={{textTransform: "uppercase", fontWeight: "light"}}>
                    {item.label}
                </Link>
            ))}
        </Breadcrumbs>
    );
};


export default BreadcrumbsComponent;