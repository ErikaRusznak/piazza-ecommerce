import React from "react";
import {useTheme} from "@mui/material/styles";
import {useRouter} from "next/navigation";
import {Box, Divider, Typography} from "@mui/material";

type ProductSpecificInfoProps = {
    label: "Producer" | "Category" | "City";
    information: string;
}
const ProductSpecificInfo = ({label, information}: ProductSpecificInfoProps) => {

    const theme = useTheme();
    const router = useRouter();

    return (
        <>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mx: {xs: 1},
            }}>
                <Typography variant="body1" sx={{
                    fontWeight: "bold", color: theme.palette.info.main
                }}>
                    {label}
                </Typography>
                <Typography
                    sx={{
                        color: theme.palette.info.main,
                        cursor: label === 'Producer' ? 'pointer' : 'default',
                        '&:hover': {
                            textDecoration: label === 'Producer' ? 'underline' : 'none',
                        },
                    }}
                     onClick={() => {
                         if (label === "Producer") {
                             router.push(`/${information}`)
                         }
                     }}>
                    {information}
                </Typography>
            </Box>
            <Divider sx={{backgroundColor: theme.palette.lightColor.main, width: "full", my: 2}}/>
        </>
    );
};

export default ProductSpecificInfo;