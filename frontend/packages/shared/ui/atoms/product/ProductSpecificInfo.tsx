
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { Box, Divider, Typography } from "@mui/material";
import {darkTheme} from "../../themes/themes";

type ProductSpecificInfoProps = {
    label: "Producer" | "Category" | "City" | "Price" | "Rating" | "No. reviews" | "No. remaining items";
    information: string;
    rating?: number;
};

const ProductSpecificInfo: React.FC<ProductSpecificInfoProps> = ({ label, information, rating }) => {
    const theme = useTheme();
    const router = useRouter();

    const handleProducerClick = () => {
        if (label === "Producer") {
            router.push(`/sellers//${information}`);
        }
    };

    const getRatingColor = () => {
        if (rating !== undefined) {
            if (rating >= 0 && rating <= 2.5) {
                return "red";
            }
            if (rating > 2.5 && rating < 4) {
                return "orange";
            }
            if (rating >= 4) {
                return "green";
            }
        }
        return theme.palette.info.main;
    };

    return (
        <>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mx: { xs: 1 },
            }}>
                <Typography variant="body1" sx={{ fontWeight: "bold", color: theme.palette.info.main }}>
                    {label}
                </Typography>
                <Typography
                    sx={{
                        color: rating !== undefined ? getRatingColor() : theme.palette.info.main,
                        cursor: label === 'Producer' ? 'pointer' : 'default',
                        '&:hover': {
                            textDecoration: label === 'Producer' ? 'underline' : 'none',
                        },
                    }}
                    onClick={handleProducerClick}
                >
                    {information}
                </Typography>
            </Box>
            <Divider sx={{ backgroundColor: darkTheme.palette.lightColor.main, width: "100%", my: 2 }} />
        </>
    );
};

export default ProductSpecificInfo;
