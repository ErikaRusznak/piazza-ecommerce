import React, {useEffect, useState} from "react";
import useTheme from "@/theme/themes";
import {Box, Card, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {AddIcon, FavoriteBorderIcon, FavoriteIcon} from "@/components/atoms/icons";
import {baseURL} from "../../../api/ApiClient";
import StyledButton from "@/components/atoms/StyledButton";
import {useAuth} from "../../../api/auth/AuthContext";
import {useFavorite} from "../../../contexts/FavoriteContext";
import {useRouter} from "next/navigation";

// TODO - make a type for product, not any
type ProductCardProps = {
    product?: any;
    onOpenChange?: () => void;
    toggleModal: (productId: number) => void;
};

const ProductCard = ({product, toggleModal, onOpenChange}: ProductCardProps) => {
    const theme = useTheme();
    const router = useRouter();
    const {isAuthenticated} = useAuth();

    const {allFavorites, addToFavorite, removeFromFavorite, checkIsFavorite} = useFavorite();

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        setIsFavorite(checkIsFavorite(allFavorites, product.id));
    }, [allFavorites]);


    const toggleFavorite = () => {
        if (!isFavorite) {
            addToFavorite(product.id);
        } else {
            removeFromFavorite(product.id);
        }
    };


    return (
        <Card
            sx={{
                height: isAuthenticated ? "330px" : "300px",
                width: "200px",
                [theme.breakpoints.only("lg")]: {
                    height: isAuthenticated ? "330px" : "300px",
                    width: "200px",
                },
                [theme.breakpoints.only("md")]: {
                    height: isAuthenticated ? "330px" : "300px",
                    width: "200px",
                },
                [theme.breakpoints.only("sm")]: {
                    height: isAuthenticated ? "280px" : "260px",
                    width: "173px",
                },
                [theme.breakpoints.only("xs")]: {
                    height: isAuthenticated ? "280px" : "260px",
                    width: "148px",
                },
                [theme.breakpoints.only("xxs")]: {
                    height: isAuthenticated ? "280px" : "260px",
                    width: "148px",
                },
                borderRadius: "20px",
                boxShadow: "0px 1px 1px 1px #ffffff20",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxSizing: "border-box",
                padding: theme.spacing(2),
                gap: 1,
                backgroundColor: theme.palette.background.lighter,
                border: "1px solid #93B1A6",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "14px",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "&:hover": {
                        cursor: "pointer",
                    }
                }}
            >
                <img
                    style={{
                        width: "100%",
                        borderRadius: "14px",
                    }}
                    src={`${baseURL}${product.imageName}`}
                    alt={product.name}
                    onClick={() => router.push(`/shop/${product.id}`)}
                />
            </Box>

            <Box
                sx={theme => ({
                    width: "100%",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    textAlign: "left",
                })}
            >
                <Box
                    sx={theme => ({
                        position: "relative",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        gap: theme.spacing(1),
                    })}
                >
                    <Typography
                        sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: "2",
                            alignSelf: "stretch",
                            position: "relative",
                            minHeight: "2.5rem",
                            fontSize: {
                                xs: "18px",
                                md: "20px"
                            },
                            color: theme.palette.info.main,
                            "&:hover": {
                                cursor: "pointer",
                                textDecoration: "underline",
                                color: theme.palette.primary.main,
                            }
                        }}
                        onClick={() => router.push(`/shop/${product.id}`)}
                    >
                        {product.name}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        alignSelf: "stretch",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontSize: {
                            xs: "16px",
                            md: "18px"
                        },
                        color: theme.palette.info.main,
                    }}
                >
                    <Typography>{product.price} RON</Typography>
                    <IconButton
                        onClick={(e) => {
                            isAuthenticated ? toggleFavorite() : toggleModal(product.id)
                        }}
                        color="primary"
                        sx={{
                            borderRadius: "20px",
                            background: theme.palette.background.gradient,
                            border: "1px solid #93B1A6",
                            "&:hover": {
                                background: "linear-gradient(267.27deg, #183D3D 10%, #2e7474 90%)",
                                border: "1px solid #93B1A6",
                            }
                        }}
                    >
                        {isAuthenticated ? (
                            isFavorite ? (
                                <FavoriteIcon sx={{color: theme.palette.primary.main}}/>
                            ) : (
                                <FavoriteBorderIcon sx={{color: theme.palette.primary.main}}/>
                            )
                        ) : (
                            <AddIcon sx={{color: theme.palette.primary.main}}/>
                        )}

                    </IconButton>

                </Box>
                {isAuthenticated && (
                    <StyledButton
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 1,
                            backgroundColor: theme.palette.background.lighter,
                            border: "1px solid #93B1A6",
                            fontSize: "14px",
                            borderRadius: "12px"
                        }}
                        onClick={() => toggleModal(product.id)}
                    >
                        Add to cart
                    </StyledButton>
                )}

            </Box>
        </Card>
    );
};

export default ProductCard;