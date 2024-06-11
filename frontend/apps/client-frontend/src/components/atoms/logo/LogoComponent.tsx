import React from "react";
import Link from "next/link";
import Image from "next/image";
import {Box, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";

const LogoComponent = () => {

    const theme = useTheme();
    const isSmallerScreen = useMediaQuery(theme.breakpoints.down("md"));
    const src = isSmallerScreen ? "/small-fresh-corner-logo.png" : "/fresh-corner-logo.png";
    return (
        <Box>
            <Link href={"/"}>
                <Image
                    src={src}
                    alt="icon"
                    width={isSmallerScreen ? 40 : 135}
                    height={isSmallerScreen ? 40 : 30}
                    priority={true}
                />
            </Link>
        </Box>
    )
}

export default LogoComponent;