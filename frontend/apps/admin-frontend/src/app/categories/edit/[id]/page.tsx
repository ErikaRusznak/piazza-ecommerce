"use client";

import React, {useEffect, useState} from "react";
import MainLayout from "@/components/templates/MainLayout";
import {UnauthenticatedMessage} from "ui";
import {useAlert, useAuth} from "components";
import {useRouter} from "next/navigation";
import {SubmitHandler} from "react-hook-form";
import {getCategoryByIdApi, updateCategoryApi} from "../../../../../api/entities/CategoryApi";
import AddEditCategoryForm, {AddEditCategoryInput} from "@/components/organisms/categories/AddEditCategoryForm";

type EditCategoryPageProps = {
    params: {
        id: string;
    }
};

const EditCategoryPage = ({params}: EditCategoryPageProps) => {

    const id = Number(params.id);
    const { isAuthenticated, username } = useAuth();
    const router = useRouter();
    const [category, setCategory] = useState<any>();
    const {pushAlert} = useAlert();
    const [fileName, setFileName] = useState<string>(category?.imageName);
    const [errorImageMessage, setErrorImageMessage] = useState<string>("");

    const getCategoryById = (categoryId: number) => {
        getCategoryByIdApi(categoryId)
            .then((res) => {
                setCategory(res.data);
            })
            .catch((err) => console.error(err))
    }

    useEffect(() => {
        getCategoryById(id);
    }, [username])

    useEffect(() => {
        setFileName(category?.imageName)
    }, [category]);


    const onSubmit: SubmitHandler<AddEditCategoryInput> = async (data:AddEditCategoryInput) => {
        if (!fileName) {
            setErrorImageMessage("Please upload an image before submitting.");
            return;
        }
        updateCategoryApi({
            id: id,
            name: data.name,
            imageName: fileName,
        })
            .then((res) => {
                router.push(`/categories`);
                pushAlert({
                    type: "success",
                    title: "Update category",
                    paragraph: "Category was updated successfully!"
                });
            })
            .catch((err) => {
                console.error(err);
                pushAlert({
                    type: "error",
                    title: "Update category",
                    paragraph: "Could not updated category."
                });
            });
    };

    return (
        <MainLayout>
            {isAuthenticated && category ? (
                <AddEditCategoryForm
                    headerText={"Edit category"}
                    onSubmit={onSubmit}
                    errorImageMessage={errorImageMessage}
                    setErrorImageMessage={setErrorImageMessage}
                    fileName={fileName}
                    setFileName={setFileName}
                    category={category}
                />
            ) : (
                <UnauthenticatedMessage/>
            )}

        </MainLayout>
    );
};

export default EditCategoryPage;