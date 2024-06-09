"use client";

import React, {useState} from "react";
import MainLayout from "@/components/templates/MainLayout";
import {SubmitHandler} from "react-hook-form";
import {useAlert, useAuth} from "components";
import {useRouter} from "next/navigation";
import {UnauthenticatedMessage} from "ui";
import AddEditCategoryForm, {AddEditCategoryInput} from "@/components/organisms/categories/AddEditCategoryForm";
import {createCategoryApi} from "../../../../api/entities/CategoryApi";

const AddProductPage = () => {

    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const {pushAlert} = useAlert();
    const [fileName, setFileName] = useState<string>("");
    const [errorImageMessage, setErrorImageMessage] = useState<string>("");

    const onSubmit: SubmitHandler<AddEditCategoryInput> = async (data:AddEditCategoryInput) => {
        if (!fileName) {
            setErrorImageMessage("Please upload an image before submitting.");
            return;
        }
        createCategoryApi({
            name: data.name,
            imageName: fileName,
        })
            .then((res) => {
                router.push(`/categories`);
                pushAlert({
                    type: "success",
                    title: "Add category",
                    paragraph: "Category was added successfully!"
                });
            })
            .catch((err) => {
                console.error(err);
                pushAlert({
                    type: "error",
                    title: "Add category",
                    paragraph: "Could not add category."
                });
            });
    };

    return  (
        <MainLayout>
            {isAuthenticated ? (
                <AddEditCategoryForm
                    headerText={"Add category"}
                    onSubmit={onSubmit}
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