import React, {useRef} from 'react';
import { baseURL } from '../../api/ApiClient';
import {useNavigate} from "react-router-dom";

const CategoryComponent = ({ categoryName, imageUrl }) => {

    const navigate = useNavigate();
    const buttonRef2 = useRef();
    const createQueryParam = (categoryName) => {
        const queryParams = new URLSearchParams();
        queryParams.set("categoryName", categoryName);
        const newSearch = queryParams.toString();
        navigate(`/products?${newSearch}`);
    }

    return (
        <div
            className="group relative items-center justify-center p-4 rounded-xl cursor-pointer"
            onClick={() => {
                buttonRef2.current?.click();
                createQueryParam(categoryName);
            }}
        >
            <div className="relative overflow-hidden rounded-xl" style={{ paddingBottom: '100%' }}>
                <img
                    src={`${baseURL}${imageUrl}`}
                    alt={categoryName}
                    className="absolute inset-0 h-full w-full object-cover object-center bg-white"
                />
            </div>
            <h3 className="text-center mt-6 text-lg font-bold cursor-pointer text-zinc-900 dark:text-white">
                <span className="absolute inset-0" />
                <div>{categoryName}</div>
            </h3>
        </div>
    );
};

export default CategoryComponent;
