import React from "react";
import useTheme from "@/theme/themes";
import {Box, Card, Typography, useMediaQuery} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {AddIcon} from "@/components/atoms/icons";
import {baseURL} from "../../../api/ApiClient";

type IProductCardProps = {
    product?: any;
    onOpenChange?: () => void;
};

const ProductCard = ({ product, onOpenChange }: IProductCardProps) => {
    const theme = useTheme();

    const smallSize = useMediaQuery(theme.breakpoints.down("sm"));
    console.log(smallSize);
    const handleOnClick = (event: React.MouseEvent<Element, MouseEvent>) => {
        event.preventDefault();
        // onOpenChange(product);
    };

    return (
        <Card
            sx={{
                height: "300px",
                width: "200px",
                [theme.breakpoints.down("lg")]: {
                    height: "300px",
                    width: "200px",
                },
                [theme.breakpoints.down("md")]: {
                    height: "280px",
                    width: "180px",
                },
                borderRadius: "20px",
                boxShadow: theme.shadows[3],
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxSizing: "border-box",
                padding: theme.spacing(2),
                gap: theme.spacing(2),
                backgroundColor: theme.palette.background.lighter,
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
                }}
            >
                <img
                    style={{
                        width: "100%",
                        borderRadius: "14px",
                    }}
                    src={`${baseURL}${product.imageName}`}
                    alt={product.name}
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
                    gap: theme.spacing(1),
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
                        }}
                    >
                        Apple
                    </Typography>
                </Box>

                <Box
                    sx={{
                        alignSelf: "stretch",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography>{product.price} RON</Typography>
                    <IconButton
                        onClick={handleOnClick}
                        // variant="solid"
                        color="primary"
                        sx={{
                            "--IconButton-size": "2.5rem",
                            "--Icon-fontSize": "1rem",
                            borderRadius: "20px",
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                </Box>
            </Box>
        </Card>
    );
};

export default ProductCard;