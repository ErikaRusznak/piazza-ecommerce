"use client";

import React, { useEffect, useState } from "react";
import {
    Box,
    CircularProgress,
    Container,
    Paper,
    Typography,
    useMediaQuery,
} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import { useAuth } from "components";
import { getSellerByAliasApi } from "../../../../api/entities/SellerApi";
import MainLayout from "@/components/templates/MainLayout";
import SellerDetailsComponent from "@/components/moleculas/sellers/SellerDetailsComponent";
import MainProductList from "@/components/organisms/product/MainProductList";
import ProductAddToCartModal from "@/components/organisms/modals/ProductAddToCartModal";
import { getProductsApi } from "components";
import PaginationComponent from "@/components/moleculas/PaginationComponent";
import {useRouteAlias} from "components";
import {baseURL} from "components";
import {BreadcrumbsComponent} from "ui";
import SellerMap from "@/components/moleculas/SellerMap";
import {useThemeToggle} from "ui";
import {SellerType} from "../../../../contexts/CartContext";

type SellerPageContentProps = {
    sellerAlias: string;
};

const SellerPageContent = ({ sellerAlias }: SellerPageContentProps) => {
    const theme = useTheme();
    const {isDark} = useThemeToggle();
    const [seller, setSeller] = useState<SellerType|null>(null);
    const { username } = useAuth();

    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalNumberOfProducts, setTotalNumberOfProducts] = useState(0);
    const numberOfPages = Math.ceil(totalNumberOfProducts / itemsPerPage);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productId, setProductId] = useState<number>(0);

    const [products, setProducts] = useState([]);

    const createFilterCriteria = (
        criteria: string,
        operation: string,
        value: string
    ) => {
        return `${criteria}[${operation}]${value}`;
    };

    const getProducts = (
        page: number,
        newItemsPerPage: number,
        sortSpecs: any[],
        filterSpecs: any[]
    ) => {
        getProductsApi(page, newItemsPerPage, sortSpecs, filterSpecs)
            .then((res) => {
                setProducts(res.data.data);
                setTotalNumberOfProducts(res.data.numberOfElements);
            })
            .catch((err) => console.error(err));
    };

    const getSeller = (sellerAlias: string) => {
        getSellerByAliasApi(sellerAlias)
            .then((res) => {
                setSeller(res.data);
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        const filterSpecs = buildFilterSpecs();
        getProducts(currentPage, itemsPerPage, [], filterSpecs);
        getSeller(sellerAlias);
    }, [sellerAlias]);

    const toggleModal = (productId: number) => {
        setIsModalOpen(!isModalOpen);
        setProductId(productId);
    };

    const buildFilterSpecs = () => {
        const filterSearchSpec = [];
        filterSearchSpec.push(createFilterCriteria("sellerAlias", "eq", sellerAlias));
        return filterSearchSpec;
    };

    const breadcrumbsLinks = [
        {label: "Home", link: "/"},
        {label: "Sellers", link: "/sellers"},
        {label: sellerAlias, link: ""}
    ];

    const belowSmallerSize = useMediaQuery(theme.breakpoints.down("sm"));
    const fontSizeForAlias = belowSmallerSize ? "h6" : "h4";
    const fontSizeForSellerType = belowSmallerSize ? "body1" : "h6";

    return seller && (
        <MainLayout>
            <ProductAddToCartModal
                toggleModal={toggleModal}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                productId={productId}
            />
            <Container sx={{ mx: "auto", maxWidth: "7xl", px: 2 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 8,
                        mt: 0,
                        flexDirection: "column",
                    }}
                >
                    <Box sx={{ flex: "1" }}>
                        <BreadcrumbsComponent links={breadcrumbsLinks}/>
                        <Paper
                            sx={{
                                borderRadius: "xl",
                                overflow: "hidden",
                                border: "1px solid #a5b4fc",
                                boxShadow: "0 4px 10px rgba(255, 255, 255, 0.1)",
                                backgroundColor: isDark ? theme.palette.background.lighter : theme.palette.background.darker,
                            }}
                        >
                            <Box sx={{ p: 6, display: "flex", flexDirection: "row",
                                [theme.breakpoints.down("sm")]: {flexDirection: "column", gap: 1},
                                gap: 3
                            }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexDirection: "column",
                                        gap: 2,
                                    }}
                                >
                                    <img
                                        src={`${baseURL}${seller.account.imageName}`}
                                        alt={seller?.account?.imageName ?? undefined}
                                        style={{ width: "60%" }}
                                    />
                                    <Box sx={{display: "flex", justifyContent: "center", flexDirection: "column",
                                        alignItems: "center", [theme.breakpoints.down("sm")]: {alignItems: "left"}
                                    }}>
                                        <Typography variant={fontSizeForAlias} gutterBottom
                                                    sx={{color: isDark ? theme.palette.lightColor.main : theme.palette.primary.main, fontWeight: "bold",
                                                    }}>
                                            {seller.alias}
                                        </Typography>
                                        <Typography variant={fontSizeForSellerType} gutterBottom
                                                    sx={{color: theme.palette.info.main, }}>
                                            {seller.sellerType}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ mt: 2 }}>
                                    <SellerDetailsComponent seller={seller} username={username} />
                                </Box>
                            </Box>
                            <SellerMap seller={seller}/>
                        </Paper>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            width: "full",
                        }}
                    >
                        <Box sx={{backgroundColor: theme.palette.background.default, p:2,
                            border: "1px solid #a5b4fc",
                            borderRadius: "14px",
                        }}>
                            <Typography variant="h5" sx={{ fontWeight: "bold", color: theme.palette.info.main }}>
                                Products
                            </Typography>

                            <Box
                                sx={{
                                    backgroundColor: theme.palette.background.default,
                                    mt: 2,
                                }}
                            >
                                {products.length === 0 ? (
                                    <Typography>
                                        This seller has no products yet!
                                    </Typography>
                                ) : (
                                    <>
                                        <MainProductList
                                            products={products}
                                            toggleModal={(productId: number) => toggleModal(productId)}
                                        />
                                        <Box sx={{display: "flex", justifyContent: "center"}}>
                                            <PaginationComponent
                                                numberOfPages={numberOfPages}
                                                currentPage={currentPage}
                                                setCurrentPage={setCurrentPage}
                                            />
                                        </Box>
                                    </>
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </MainLayout>
    );
};

const SellerPage = () => {
    const alias = useRouteAlias();
    return <>{alias ? <SellerPageContent sellerAlias={alias} /> : <CircularProgress />}</>;
};
export default SellerPage;