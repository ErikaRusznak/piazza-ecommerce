"use client";

import React, {useEffect, useState} from "react";
import {useTheme} from "@mui/material/styles";
import MainLayout from "@/components/templates/MainLayout";
import Typography from "@mui/material/Typography";
import {useAuth} from "../../../../api/auth/AuthContext";
import {UnauthenticatedMessage} from "ui";
import {Box, useMediaQuery} from "@mui/material";
import {getProductByIdApi} from "components";
import {baseURL} from "components";
import ProductInformation from "@/components/moleculas/product/ProductInformation";
import ReviewItems from "@/components/moleculas/product/ReviewItems";
import {AddIcon} from "@/components/atoms/icons";
import {StyledButton} from "ui";
import AddProductsInStoreModal from "@/components/organisms/modals/AddProductsInStoreModal";

type ProductPageProps = {
    params: {
        id: string;
    }
}

const ProductPage = ({params}: ProductPageProps) => {

    const theme = useTheme();
    const id = Number(params.id);
    const {isAuthenticated} = useAuth();
    const [product, setProduct] = useState<any>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const getProductById = (productId: number) => {
        getProductByIdApi(productId)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => console.error(err))
    };

    useEffect(() => {
        getProductById(id);
    }, []);

    const downMedScreenSize = useMediaQuery(theme.breakpoints.down("md"));
    const widthForImage = downMedScreenSize ? "19rem" : "20rem";

    const updateProductData = (newProductData: any) => {
        setProduct(newProductData);
    };

    return (
        <>
            <MainLayout>
                {isAuthenticated && product ? (
                    <Box>
                        <Box sx={{
                            display: "flex", justifyContent: "center", alignItems: "center",
                            flexDirection: "column"
                        }}>
                            <Box>
                                <Box>
                                    <Typography variant="h4" sx={{
                                        fontWeight: "",
                                        color: theme.palette.info.main,
                                        mt: 2,
                                        ml: {xs: 2, sm: 0},
                                    }}>
                                        {product.name}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{display: "flex", justifyContent: "center",
                                        flexDirection: "row", alignItems: "center",
                                        [theme.breakpoints.down("md")]: {
                                            flexDirection: "column",
                                        },
                                        mt: 2}}>
                                    <Box sx={{ [theme.breakpoints.down("md")]: {mt: 2}}}>
                                        <Box sx={{
                                            display: "flex", justifyContent: "center",
                                            pr: 1, borderRight: "1px solid #a5b4fc",
                                            [theme.breakpoints.down("md")]: {
                                                borderRight: "none", mt: 2, pr: 0,
                                            },
                                        }}>
                                            <img
                                                src={`${baseURL}${product.imageName}`}
                                                alt={product.name}
                                                style={{width: widthForImage}}
                                            />
                                        </Box>
                                    </Box>
                                    <Box sx={{ml: 4, display: "flex", justifyContent: "center", flexDirection: "column",
                                        [theme.breakpoints.down("md")]: {mx: 1}
                                    }}>
                                        <ProductInformation
                                            product={product}
                                        />
                                        <StyledButton variant="contained" sx={{height: "3rem", alignSelf: "center"}}
                                                      onClick={toggleModal}>
                                            <AddIcon sx={{mr: 1}}/>
                                            Add More Products
                                        </StyledButton>
                                    </Box>
                                </Box>
                            </Box>

                            <Box sx={{
                                display: "flex", justifyContent: "center", alignItems: "center",
                                width: "100%", maxWidth: "53rem", [theme.breakpoints.down("md")]: {maxWidth: "38rem"},
                            }}>
                                <Box sx={{ width: "100%", mt: 2}}>
                                    <ReviewItems
                                        productId={product.id}

                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ) : (
                    <UnauthenticatedMessage/>
                )}
            </MainLayout>

            {product && (
                <AddProductsInStoreModal
                    toggleModal={toggleModal}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    productId={id}
                    updateProductData={updateProductData}
                />
            )}
        </>

    );
};

export default ProductPage;