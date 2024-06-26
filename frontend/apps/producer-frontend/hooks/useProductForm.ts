import { useEffect, useState } from "react";
import {useAuth} from "../api/auth/AuthContext";
import {getAllCategoriesApi} from "components";
import {getSellerByIdApi} from "components";

const useProductForm = () => {
    const {  id } = useAuth();
    const [categories, setCategories] = useState<any>();
    const [seller, setSeller] = useState<any>();

    const UNIT_OF_MEASURES = [
        { id: 0, name: "KILOGRAM" },
        { id: 1, name: "ONE_HUNDRED_GRAM" },
        { id: 2, name: "ONE_UNIT" },
    ];

    useEffect(() => {
        const getCategoryList = () => {
            getAllCategoriesApi()
                .then((res) => {
                    setCategories(res.data.data);
                })
                .catch((err) => console.error(err));
        };

        const getSellerById = (id: number) => {
            if (id) {
                getSellerByIdApi(id)
                    .then((res) => {
                        setSeller(res.data);
                    })
                    .catch((err) => console.error(err));
            }
        };

        getCategoryList();
        getSellerById(id);
    }, [id]);

    return { categories, seller, UNIT_OF_MEASURES };
};

export default useProductForm;
