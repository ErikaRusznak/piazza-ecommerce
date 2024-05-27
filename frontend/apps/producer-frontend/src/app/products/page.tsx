"use client";
import React, {useEffect, useState} from "react";
import {useTheme} from "@mui/material/styles";
import MainLayout from "@/components/templates/MainLayout";
import Typography from "@mui/material/Typography";
import {
    Box,
    Button, Container
} from "@mui/material";
import {baseURL} from "components";
import {useAuth} from "../../../api/auth/AuthContext";
import {useRouter} from "next/navigation";
import {UnauthenticatedMessage} from "ui";
import {TableContainerComponent} from "ui";
import {getProductsApi} from "components";
import {AddIcon} from "@/components/atoms/icons";
import {StyledButton} from "ui";
import {TablePaginationComponent} from "ui";
import DeleteProductModal from "@/components/organisms/modals/DeleteProductModal";
import useProductForm from "../../../hooks/useProductForm";

const tableCellLabels = ["Image", "Name", "Category", "Price", "Actions"];

// TODO - create product type
const ProductsPage = () => {
    const theme = useTheme();
    const router = useRouter();
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
            case 'Actions':
                return (
                    <>
                        <Button size="small" sx={{color: theme.palette.lightColor.main}}
                                onClick={() => router.push(`/products/${item.id}`)}>
                            View
                        </Button>
                        <Button size="small" color="primary" onClick={() => router.push(`/products/edit/${item.id}`)}>
                            Edit
                        </Button>
                        <Button size="small" color="error" onClick={() => toggleModal(item.id)}>
                            Delete
                        </Button>
                    </>
                );
            default:
                return null;
        }
    };

    const {isAuthenticated} = useAuth();
    const {seller} = useProductForm();
    const [products, setProducts] = useState<any>([]);
    const [totalNumberOfProducts, setTotalNumberOfProducts] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = (productId: number | null ) => {
        setProductIdToDelete(productId);
        setIsModalOpen(!isModalOpen);
    }

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
        if(seller) {
            getProducts(currentPage, itemsPerPage, [], [`sellerAlias[eq]${seller.alias}`]);
        }
    }, [itemsPerPage, currentPage, totalNumberOfProducts, seller]);

    const onDelete = (productId: number) => {
        setProducts(products.filter((product:any) => product.id !== productId));
        setTotalNumberOfProducts(totalNumberOfProducts - 1);
    };

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
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                            pb: 2
                        }}>
                            <Typography variant="h4" color={theme.palette.info.main}>
                                Products
                            </Typography>
                            <StyledButton variant="contained" sx={{height: "3rem"}}
                                          onClick={() => router.push("/products/add")}>
                                <AddIcon sx={{mr: 1}}/>
                                Add Product
                            </StyledButton>
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
            {productIdToDelete && (
                <DeleteProductModal
                    toggleModal={toggleModal}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    productId={productIdToDelete}
                    onDelete={onDelete}
                />
            )}

        </>
    );
};

export default ProductsPage;
