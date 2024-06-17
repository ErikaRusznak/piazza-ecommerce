"use client";
import React, {useEffect, useState} from "react";
import {useTheme} from "@mui/material/styles";
import MainLayout from "@/components/templates/MainLayout";
import Typography from "@mui/material/Typography";
import {
    Box,
    Button,
    Container,
} from "@mui/material";
import {useAuth, baseURL} from "components";
import {useRouter} from "next/navigation";
import {UnauthenticatedMessage} from "ui";
import {TableContainerComponent} from "ui";
import {AddIcon} from "@/components/atoms/icons";
import {StyledButton} from "ui";
import {getAllCategoriesApi} from "components";
import DeleteCategoryModal from "@/components/organisms/modals/DeleteCategoryModal";

const tableCellLabels = ["Image", "Name", "Actions"];

type CategoryType = {
    id: number;
    name: string;
    imageName: string;
}

const ProductsPage = () => {
    const theme = useTheme();
    const router = useRouter();
    const renderCell = (item: CategoryType, key: string) => {
        switch (key) {
            case 'Image':
                return (
                    <img src={`${baseURL}${item.imageName}`} alt={item.name}
                         style={{width: '100%', height: 'auto', maxWidth: '70px'}}/>
                );
            case 'Name':
                return <Typography sx={{fontWeight: theme.typography.fontWeightRegular}}>{item.name}</Typography>;
            case 'Actions':
                return (
                    <>
                        <Button size="small" color="primary"
                                onClick={() => router.push(`/categories/${item.name}`)}>
                            View
                        </Button>
                        <Button size="small" color="secondary" onClick={() => router.push(`/categories/edit/${item.id}`)}>
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

    const [categories, setCategories] = useState<CategoryType[]>([]);

    const [categoryIdToDelete, setCategoryIdToDelete] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const toggleModal = (categoryId: number | null ) => {
        setCategoryIdToDelete(categoryId);
        setIsModalOpen(!isModalOpen);
    }

    const getCategories = () => {
        getAllCategoriesApi()
            .then((res) => {
                setCategories(res.data.data);
            })
            .catch((err) => console.error(err))
    };

    useEffect(() => {
        getCategories();
    }, []);

    const onDelete = (categoryId: number) => {
        setCategories(categories.filter((category:CategoryType) => category.id !== categoryId));
    };

    const categoriesToDisplay = categories?.map((category: CategoryType) => ({
        id: category.id,
        imageName: category.imageName,
        name: category.name,
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
                                Categories
                            </Typography>
                            <StyledButton variant="contained" sx={{height: "2.5rem"}}
                                          onClick={() => router.push("/categories/add")}>
                                <AddIcon sx={{mr: 1}}/>
                                Add category
                            </StyledButton>
                        </Box>
                        <TableContainerComponent
                            items={categoriesToDisplay}
                            tableCellLabels={tableCellLabels}
                            renderCell={renderCell}
                        />
                    </Container>
                ) : (
                    <UnauthenticatedMessage/>
                )}
            </MainLayout>
            {categoryIdToDelete && (
                <DeleteCategoryModal
                    toggleModal={toggleModal}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    categoryId={categoryIdToDelete}
                    onDelete={onDelete}
                />
            )}

        </>
    );
};

export default ProductsPage;
