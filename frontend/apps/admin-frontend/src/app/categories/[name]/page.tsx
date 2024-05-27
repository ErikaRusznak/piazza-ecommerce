"use client";

import React, {useEffect, useState} from "react";
import MainLayout from "@/components/templates/MainLayout";
import Typography from "@mui/material/Typography";
import {useAuth} from "components";
import {UnauthenticatedMessage} from "ui";
import {Box, Container} from "@mui/material";
import {getProductsApi} from "components";
import {baseURL} from "components";
import {StyledButton} from "ui";
import TableContainerComponent from "@/components/moleculas/table/TableContainerComponent";
import {useRouter} from "next/navigation";
import TablePaginationComponent from "@/components/moleculas/table/TablePaginationComponent";
import {ArrowBackIosNew} from "@mui/icons-material";
import {useTheme} from "@mui/material/styles";

type ProductPageProps = {
    params: {
        name: string;
    }
}

const tableCellLabels = ["Image", "Name", "Category", "Price"];

const CategoryProducts = ({params}: ProductPageProps) => {

    const renderCell = (item: any, key: string) => {
        switch (key) {
            case 'Image':
                return (
                    <img src={`${baseURL}${item.imageName}`} alt={item.name}
                         style={{width: '100%', height: 'auto', maxWidth: '70px'}}/>
                );
            case 'Name':
                return item.name;
            case 'Category':
                return item.category;
            case 'Price':
                return `${item.price.toFixed(2)} RON`;
            default:
                return null;
        }
    };

    const theme = useTheme();
    const router = useRouter();
    const categoryName = params.name;
    const {isAuthenticated} = useAuth();
    const [products, setProducts] = useState<any>([]);
    const [totalNumberOfProducts, setTotalNumberOfProducts] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const getProducts = (page: number, newItemsPerPage: number, sortSpecs: string[], filterSpecs: string[]) => {
        setItemsPerPage(newItemsPerPage);
        getProductsApi(page, newItemsPerPage, sortSpecs, filterSpecs)
            .then((res) => {
                setProducts(res.data.data);
                setTotalNumberOfProducts(res.data.numberOfElements);
            })
            .catch((err) => console.log(err))
    };

    useEffect(() => {
        getProducts(currentPage, itemsPerPage, [], [`categoryName[eq]${categoryName}`]);
    }, [itemsPerPage, currentPage, categoryName]);

    const productsToDisplay = products?.map((product: any) => ({
        id: product.id,
        imageName: product.imageName,
        name: product.name,
        category: product.category.name,
        price: product.price,
    }));

    return (
        <>
            <MainLayout>
                {isAuthenticated ? (
                    <Container>
                        <StyledButton variant="contained" sx={{height: "2rem"}}
                                      onClick={() => router.push("/categories")}>
                            <ArrowBackIosNew sx={{mr: 1, fontSize: "15px"}}/>
                            Go back to categories
                        </StyledButton>
                        <Box sx={{
                            py: 2
                        }}>
                            <Typography variant="h6" color={theme.palette.info.main}>
                                Products for {categoryName} category
                            </Typography>
                        </Box>

                        <TableContainerComponent
                            items={productsToDisplay}
                            tableCellLabels={tableCellLabels}
                            renderCell={renderCell}
                        />

                        <TablePaginationComponent
                            totalNumberOfProducts={totalNumberOfProducts}
                            currentPage={currentPage}
                            itemsPerPage={itemsPerPage}
                            setCurrentPage={setCurrentPage}
                            setItemsPerPage={setItemsPerPage}
                        />
                    </Container>
                ) : (
                    <UnauthenticatedMessage/>
                )}
            </MainLayout>

        </>

    );
};

export default CategoryProducts;