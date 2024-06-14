"use client";

import React, {useState} from "react";
import MainLayout from "@/components/templates/MainLayout";
import {SubmitHandler} from "react-hook-form";
import {createProductApi} from "../../../../api/entities/ProductApi";
import {useAuth} from "../../../../api/auth/AuthContext";
import {useRouter} from "next/navigation";
import {UnauthenticatedMessage} from "ui";
import AddEditProductForm, {AddEditProductInput} from "@/components/organisms/products/AddEditProductForm";
import useProductForm from "../../../../hooks/useProductForm";
import {useAlert} from "components";

const AddProductPage = () => {

    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const { categories, seller, UNIT_OF_MEASURES } = useProductForm();
    const {pushAlert} = useAlert();
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
            unitOfMeasure: selectedUnitOfMeasure,
            quantity: data.quantity,
        })
            .then((res) => {
                router.push(`/products`);
                pushAlert({
                    type: "success",
                    title: "Add product",
                    paragraph: "Product was added successfully!"
                });
            })
            .catch((err) => {
                console.error(err);
                pushAlert({
                    type: "error",
                    title: "Add product",
                    paragraph: "Could not add product."
                });
            });
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