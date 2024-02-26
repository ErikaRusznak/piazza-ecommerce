import React from "react";
import useTheme from "@/theme/themes";
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
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Typography variant="body1" sx={{
                    fontWeight: "bold", color: theme.palette.info.main
                }}>
                    {label}
                </Typography>
                <Box
                    sx={{
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
                </Box>
            </Box>
            <Divider sx={{backgroundColor: "yellow", width: "full", my: 2}}/>
        </>
    );
};

export default ProductSpecificInfo;