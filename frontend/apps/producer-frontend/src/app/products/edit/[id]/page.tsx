"use client";

import React, {useEffect, useState} from "react";
import MainLayout from "@/components/templates/MainLayout";
import AddEditProductForm, {AddEditProductInput} from "@/components/organisms/products/AddEditProductForm";
import {UnauthenticatedMessage} from "ui";
import {useAuth} from "../../../../../api/auth/AuthContext";
import {useRouter} from "next/navigation";
import {SubmitHandler} from "react-hook-form";
import {getProductByIdApi, useAlert} from "components";
import useProductForm from "../../../../../hooks/useProductForm";
import {updateProductApi} from "../../../../../api/entities/ProductApi";

type EditProductPageProps = {
    params: {
        id: string;
    }
}
const EditProductPage = ({params}: EditProductPageProps) => {

    const id = Number(params.id);
    const { isAuthenticated, username } = useAuth();
    const router = useRouter();
    const { categories, seller, UNIT_OF_MEASURES } = useProductForm();
    const [product, setProduct] = useState<any>();
    const {pushAlert} = useAlert();
    const [fileName, setFileName] = useState<string>(product?.imageName);
    const [errorImageMessage, setErrorImageMessage] = useState<string>("");

    const getProductById = (productId: number) => {
        getProductByIdApi(productId)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => console.error(err))
    }

    useEffect(() => {
        getProductById(id);
    }, [username])

    useEffect(() => {
        setFileName(product?.imageName)
    }, [product]);


    const onSubmit: SubmitHandler<AddEditProductInput> = async (data:AddEditProductInput) => {
        if (!fileName) {
            setErrorImageMessage("Please upload an image before submitting.");
            return;
        }
        const selectedCategory = categories?.find((category:any) => category.name === data.category);
        const selectedUnitOfMeasure = (UNIT_OF_MEASURES.find(unit => unit.name === data.unitOfMeasure))?.name;
        updateProductApi({
            id: id,
            name: data.name,
            description: data.description,
            imageName: fileName,
            price: data.price,
            category: selectedCategory,
            seller: seller,
            unitOfMeasure: selectedUnitOfMeasure
        })
            .then((res) => {
                router.push(`/products`);
                pushAlert({
                    type: "success",
                    title: "Update product",
                    paragraph: "Product was updated successfully!"
                });
            })
            .catch((err) => {
                console.error(err);
                pushAlert({
                    type: "error",
                    title: "Update product",
                    paragraph: "Could not update product."
                });
            });
    };

    return categories && (
        <MainLayout>
            {isAuthenticated && product ? (
                <AddEditProductForm
                    headerText={"Edit product"}
                    onSubmit={onSubmit}
                    UNIT_OF_MEASURES={UNIT_OF_MEASURES}
                    categories={categories}
                    errorImageMessage={errorImageMessage}
                    setErrorImageMessage={setErrorImageMessage}
                    fileName={fileName}
                    setFileName={setFileName}
                    product={product}
                />
            ) : (
                <UnauthenticatedMessage/>
            )}

        </MainLayout>
    );
};

export default EditProductPage;