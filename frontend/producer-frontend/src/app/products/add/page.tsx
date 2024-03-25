"use client";

import React, {useEffect, useState} from "react";
import useTheme from "@/theme/themes";
import MainLayout from "@/components/templates/MainLayout";
import {SubmitHandler} from "react-hook-form";
import {getAllCategoriesApi} from "../../../../api/entities/CategoryApi";
import {createProductApi} from "../../../../api/entities/ProductApi";
import {useAuth} from "../../../../api/auth/AuthContext";
import {useRouter} from "next/navigation";
import UnauthenticatedMessage from "@/components/atoms/UnauthenticatedMessage";
import {getSellerByEmailApi} from "../../../../api/entities/SellerApi";
import AddEditProductForm, {AddEditProductInput} from "@/components/organisms/products/AddEditProductForm";
import useProductForm from "../../../../hooks/useProductForm";

const AddProductPage = () => {

    const theme = useTheme();
    const { isAuthenticated, username } = useAuth();
    const router = useRouter();
    const { categories, seller, UNIT_OF_MEASURES } = useProductForm();

    const [fileName, setFileName] = useState<string>("");
    const [errorImageMessage, setErrorImageMessage] = useState<string>("");

    const onSubmit: SubmitHandler<AddEditProductInput> = async (data:AddEditProductInput) => {
        if (!fileName) {
            setErrorImageMessage("Please upload an image before submitting.");
            return;
        }
        const selectedCategory = categories?.find((category:any) => category.name === data.category);
        const selectedUnitOfMeasure = (UNIT_OF_MEASURES.find(unit => unit.name === data.unitOfMeasure))?.name;
        createProductApi({
            name: data.name,
            description: data.description,
            imageName: fileName,
            price: data.price,
            category: selectedCategory,
            seller: seller,
            unitOfMeasure: selectedUnitOfMeasure
        })
            .then((res) => {
                console.log(res);
                router.push(`/products`);
            })
            .catch((err) => console.error(err));
    };

    return categories && (
        <MainLayout>
            {isAuthenticated ? (
                <AddEditProductForm
                    headerText={"Add product"}
                    onSubmit={onSubmit}
                    UNIT_OF_MEASURES={UNIT_OF_MEASURES}
                    categories={categories}
                    errorImageMessage={errorImageMessage}
                    setErrorImageMessage={setErrorImageMessage}
                    fileName={fileName}
                    setFileName={setFileName}
                />
            ) : (
                <UnauthenticatedMessage/>
            )}

        </MainLayout>
    );
};

export default AddProductPage;