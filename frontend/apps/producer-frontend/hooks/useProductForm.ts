import { useEffect, useState } from "react";
import {useAuth} from "../api/auth/AuthContext";
import {getAllCategoriesApi} from "../api/entities/CategoryApi";
import {getSellerByEmailApi} from "../api/entities/SellerApi";

const useProductForm = () => {
    const { username } = useAuth();
    const [categories, setCategories] = useState<any>();
    const [seller, setSeller] = useState<any>();

    const UNIT_OF_MEASURES = [
        { id: 0, name: "KILOGRAM" },
        { id: 1, name: "GRAM" },
        { id: 2, name: "ONE_UNIT" },
    ];

    useEffect(() => {
        const getCategoryList = () => {
            getAllCategoriesApi()
                .then((res) => {
                    setCategories(res.data.data);
                })
                .catch((err) => console.log(err));
        };

        const getSellerByEmail = (email: string) => {
            if (email) {
                getSellerByEmailApi(email)
                    .then((res) => {
                        setSeller(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        };

        getCategoryList();
        getSellerByEmail(username);
    }, [username]);

    return { categories, seller, UNIT_OF_MEASURES };
};

export default useProductForm;
