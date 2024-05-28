import React, {useEffect, useState} from "react";
import {useTheme} from "@mui/material/styles";
import {Box, Card, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {AddIcon, FavoriteBorderIcon, FavoriteIcon} from "@/components/atoms/icons";
import {baseURL} from "components";
import {StyledButton} from "ui";
import { useAuth } from "components";
import {useFavorite} from "../../../contexts/FavoriteContext";
import {useRouter} from "next/navigation";
import {useThemeToggle} from "ui";

// TODO - make a type for product, not any
type ProductCardProps = {
    product?: any;
    toggleModal: (productId: number) => void;
};

const ProductCard = ({product, toggleModal}: ProductCardProps) => {
    const theme = useTheme();
    const {isDark} = useThemeToggle();
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

    const getAvailabilityLabel = (): {backgroundColorForAvailability: string,labelForAvailability:string} | null => {
        switch(product?.availability) {
            case "OUT_OF_STOCK":
                return {
                    backgroundColorForAvailability: "rgba(255, 0, 0, 0.5)",
                    labelForAvailability: "Not in stock"
                };
            case "FEW_ITEMS_LEFT":
                return {
                    backgroundColorForAvailability: "rgba(255, 165, 0, 0.5)",
                    labelForAvailability: "Few items left"
                };
            default:
                return null;
        }
    };
    const availabilityLabel = getAvailabilityLabel();

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
                backgroundColor: isDark ? theme.palette.background.lighter : "#edf0fe",
                border: "0.5px solid #a5b4fc",
            }}
        >
            {product?.availability !== "AVAILABLE" && (
                <Box
                    sx={{
                        position: "absolute",
                        top: 1,
                        left: 0,
                        background: availabilityLabel?.backgroundColorForAvailability,
                        padding: theme.spacing(0.5, 1),
                        borderRadius: "20px",
                        color: "white",
                        fontWeight: "bold",
                    }}
                >
                    <Typography variant="caption">{availabilityLabel?.labelForAvailability}</Typography>
                </Box>
            )}
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
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    textAlign: "left",
                })}
            >
                <Box sx={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                    <Box
                        sx={theme => ({
                            position: "relative",
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "center",
                            gap: theme.spacing(1),
                        })}>
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
                            alignItems: "center",
                            color: theme.palette.info.main,
                        }}>
                        <Typography sx={{fontSize: "15px"}}>
                            {product.price} RON
                        </Typography>

                    </Box>

                </Box>
                <Box>
                    <IconButton
                        onClick={(e) => {
                            isAuthenticated ? toggleFavorite() : toggleModal(product.id)
                        }}
                        color="primary"
                        disabled={product.availability === "OUT_OF_STOCK" && !isAuthenticated}
                        sx={{
                            borderRadius: "20px",
                            background: theme.palette.background.gradient,
                            border: "1px solid #4f46e5",
                            "&:hover": {
                                background: "linear-gradient(267.27deg, #6366f1 10%, #4f46e5 90%)",
                                border: "1px solid #93B1A6",
                            }
                        }}
                    >
                        {isAuthenticated ? (
                            isFavorite ? (
                                <FavoriteIcon sx={{color: theme.palette.lightColor.main}}/>
                            ) : (
                                <FavoriteBorderIcon sx={{color: theme.palette.lightColor.main}}/>
                            )
                        ) : (
                            <AddIcon sx={{color: theme.palette.lightColor.main}}/>
                        )}

                    </IconButton>
                </Box>
            </Box>
                {isAuthenticated && (
                    <StyledButton
                        fullWidth
                        variant="contained"
                        disabled={product.availability === "OUT_OF_STOCK"}
                        sx={{
                            mt: 1,
                            height: "35px",
                            border: "1px solid #4f46e5",
                            fontSize: "14px",
                            borderRadius: "12px",
                        }}
                        onClick={() => toggleModal(product.id)}
                    >
                        Add to cart
                    </StyledButton>
                )}


        </Card>
    );
};

export default ProductCard;