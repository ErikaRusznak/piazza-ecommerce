import React from "react";
import { useRouter } from "next/navigation";
import { baseURL } from "../../../api/ApiClient";
import { Box, Typography } from "@mui/material";
import useTheme from "@/theme/themes";

type SellerSimplifiedInfoProps = {
    seller: any;
};

const SellerSimplifiedInfo = ({ seller }: SellerSimplifiedInfoProps) => {
    const router = useRouter();
    const theme = useTheme();

    return (
        <Box
            sx={{
                width: "100%",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                    transform: "scale(1.03)",
                },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexDirection: "row",
                    m: 2,
                    [theme.breakpoints.down("sm")]: { flexDirection: "column", alignItems: "center" },
                }}
            >
                <img
                    src={`${baseURL}${seller.account.imageName}`}
                    alt={seller.account.imageName}
                    onClick={() => router.push(`/${seller.alias}`)}
                    style={{ width: "150px", borderRadius: "14px", margin: 2, cursor: "pointer" }}
                />
                <Box
                    sx={{
                        pl: 3,
                        textAlign: "left",
                        [theme.breakpoints.down("sm")]: { textAlign: "center", pl: 0 },
                    }}
                >
                    <Box>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: "bold",
                                color: theme.palette.primary.main,
                                mb: 1,
                                cursor: "pointer",
                                "&:hover": { textDecoration: "underline" },
                            }}
                            onClick={() => router.push(`/${seller.alias}`)}
                        >
                            {seller.alias}
                        </Typography>
                        <Typography sx={{ fontWeight:600, mb: 1, color: theme.palette.secondary.main }}>
                            {seller.sellerType}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography sx={{ color: theme.palette.info.main, fontWeight:"light" }}>
                            {`${seller.addressLine1}, ${seller.addressLine2}`}
                        </Typography>
                        <Typography sx={{ color: theme.palette.info.main }}>
                            {`${seller.city}, ${seller.state}, ${seller.country}`}
                        </Typography>
                        <Typography sx={{ color: theme.palette.info.main, mt: 1 }}>
                            {seller.account.email}
                        </Typography>
                        <Typography sx={{ color: theme.palette.info.main}}>
                            {seller.account.telephone}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default SellerSimplifiedInfo;