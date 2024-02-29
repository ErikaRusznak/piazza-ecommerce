"use client";

import React, {useEffect, useState} from "react";
import {useRouteAlias} from "../../../../hooks/useRouteAlias";
import {Box, CircularProgress, Container, Grid, Paper, Typography} from "@mui/material";
import useTheme from "@/theme/themes";
import {useAuth} from "../../../../api/auth/AuthContext";
import {getSellerByAliasApi} from "../../../../api/entities/SellerApi";
import MainLayout from "@/components/templates/MainLayout";
import {baseURL} from "../../../../api/ApiClient";
import SellerDetailsComponent from "@/components/moleculas/sellers/SellerDetailsComponent";
import MainProductList from "@/components/organisms/product/MainProductList";
import ProductAddToCartModal from "@/components/organisms/modals/ProductAddToCartModal";
import {getProductsApi} from "../../../../api/entities/ProductApi";
import PaginationComponent from "@/components/moleculas/PaginationComponent";

type SellerPageContentProps = {
    sellerAlias: string;
}
const SellerPageContent = ({sellerAlias}: SellerPageContentProps) => {

    const theme = useTheme();
    const [seller, setSeller] = useState<any>(null);
    const {username} = useAuth();

    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalNumberOfProducts, setTotalNumberOfProducts] = useState(0);
    const numberOfPages = Math.ceil(totalNumberOfProducts / itemsPerPage);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productId, setProductId] = useState<number>(0);

    const [products, setProducts] = useState([]);

    const createFilterCriteria = (criteria: string, operation: string, value: string) => {
        return `${criteria}[${operation}]${value}`;
    }

    const getProducts = (page: number, newItemsPerPage: number, sortSpecs: any[], filterSpecs: any[]) => {
        getProductsApi(page, newItemsPerPage, sortSpecs, filterSpecs)
            .then((res) => {
                setProducts(res.data.data);
                setTotalNumberOfProducts(res.data.numberOfElements);
            })
            .catch((err) => console.log(err))
    }

    const getSeller = (sellerAlias: string) => {
        getSellerByAliasApi(sellerAlias)
            .then((res) => {
                setSeller(res.data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        const filterSpecs = buildFilterSpecs();
        getProducts(currentPage, itemsPerPage, [], filterSpecs);
        getSeller(sellerAlias);
    }, [sellerAlias]);

    const toggleModal = (productId: number) => {
        setIsModalOpen(!isModalOpen);
        setProductId(productId);
    }

    const buildFilterSpecs = () => {
        const filterSearchSpec = [];
        filterSearchSpec.push(createFilterCriteria("sellerAlias", "eq", sellerAlias));
        return filterSearchSpec;
    }

    return seller && (
        <MainLayout>
            <ProductAddToCartModal
                toggleModal={toggleModal}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                productId={productId}
            />
            <Container sx={{mx: "auto", mt: {sm: 4, md: 16}, maxWidth: "7xl", px: 2}}>
                <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", gap: 8, mt: 4, flexDirection: "column"}}>
                    <Box sx={{flex: "1"}}>
                        <Paper
                            sx={{borderRadius: "xl", overflow: "hidden", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"}}>
                            <Grid container spacing={6} p={6}>
                                <Grid item xs={12} md={3}
                                      sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                    <img
                                        src={`${baseURL}${seller.account.imageName}`}
                                        alt={seller.account.imageName}
                                        style={{width: "100%"}}/>
                                </Grid>
                                <Grid item xs={12} md={9}>
                                    <SellerDetailsComponent seller={seller} username={username}/>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>

                    <Box sx={{
                        px: 2,
                        flex: "1",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        color: "text.zinc800"
                    }}>
                        <Typography variant="h5" sx={{mb: -2, fontWeight: "bold"}}>
                            Products
                        </Typography>
                        <Paper
                            sx={{borderRadius: "2xl", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", mt: 4, mb: 10, p: 5}}>
                            <MainProductList products={products}
                                             toggleModal={(productId: number) => toggleModal(productId)}/>
                            <PaginationComponent
                                numberOfPages={numberOfPages}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            />
                        </Paper>
                    </Box>
                </Box>
            </Container>
        </MainLayout>
    );

};


const SellerPage = () => {
    const alias = useRouteAlias();
    return <>{alias ? <SellerPageContent sellerAlias={alias}/> : <CircularProgress/>}</>
}
export default SellerPage;