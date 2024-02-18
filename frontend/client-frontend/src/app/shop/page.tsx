"use client";

import React, {useEffect, useState} from "react";
import MainLayout from "@/components/templates/MainLayout";
import {Box, List, ListItem, Typography} from "@mui/material";
import useTheme from "@/theme/themes";
import {useRouter} from "next/navigation";
import {getProductsApi} from "../../../api/entities/ProductApi";
import ProductCard from "@/components/moleculas/ProductCard";
import MainProductList from "@/components/organisms/product/MainProductList";
import SearchComponent from "@/components/moleculas/filtering/SearchComponent";
import FilteringComponent from "@/components/organisms/filtering/FilteringComponent";

const buildFilterOptionsFromQueryParams = (queryParams) => {
    return {
        priceFrom: queryParams.get('priceFrom') ? parseInt(queryParams.get('priceFrom')) : null,
        priceTo: queryParams.get('priceTo') ? parseInt(queryParams.get('priceTo')) : null,
        categoryName: queryParams.get('categoryName') ? queryParams.getAll('categoryName') : [],
        cityName: queryParams.get('cityName') ? queryParams.getAll('cityName') : [],
        productName: queryParams.get('productName') ? queryParams.get('productName') : null
    };
}

const ProductsPage = () => {

    const theme = useTheme();
    const router = useRouter();
    const [products, setProducts] = useState([]);

    const [itemsPerPage, setItemsPerPage] = useState(12);
    // const [totalNumberProducts, setTotalNumberProducts] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    //
    // const [productSort, setProductSort] = useState({criteria: null, orderSort: null});
    //
    // const [queryParams, setQueryParams] = useState(new URLSearchParams(location.search));
    //
    // const [filterOptions, setFilterOptions] = useState(buildFilterOptionsFromQueryParams(new URLSearchParams(location.search)));
    //
    // const [isModalOpen, setIsModalOpen] = useState(false);
    //
    // const [productId, setProductId] = useState(null);
    //
    const [isLoading, setLoading] = useState(true)

    const getProducts = (page, newItemsPerPage, sortSpecs, filterSpecs) => {
        // setItemsPerPage(newItemsPerPage);
        getProductsApi(page, newItemsPerPage, sortSpecs, filterSpecs)
            .then((res) => {
                setProducts(res.data.data);
                // setTotalNumberProducts(res.data.numberOfElements);
                setLoading(false)

            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        // const filterSpecs = buildFilterSpecs();
        // const sortSpecs = buildSortSpecs();
        // setOrRemoveQueryParameters(filterOptions);
        getProducts(currentPage, itemsPerPage, [], []);
    }, [/*filterOptions, productSort,*/ itemsPerPage, currentPage]);

    // useEffect(() => {
    //     navigate({search: queryParams.toString()});
    // }, [queryParams]);
    //
    // useEffect(() => {
    //     setFilterOptions(buildFilterOptionsFromQueryParams(new URLSearchParams(location.search)));
    // }, [location.search]);
    //
    // useEffect(() => {
    //     setCurrentPage(1);
    // }, [breakpoint]);

    // const handleItemsPerPageChange = (event) => {
    //     const newItemsPerPage = parseInt(event.target.value);
    //     const filterSpecs = buildFilterSpecs();
    //     const sortSpecs = buildSortSpecs();
    //     setCurrentPage(1);
    //     getProducts(1, newItemsPerPage, sortSpecs, filterSpecs);
    // }
    //
    // const handleSortChanged = (sortFilter) => {
    //     setProductSort(sortFilter);
    //     setCurrentPage(1);
    // }
    // const handleOnFilterChanged = (newFilterOptions) => {
    //     setFilterOptions(newFilterOptions);
    //     setCurrentPage(1);
    // }
    //
    // const createFilterCriteria = (criteria, operation, value) => {
    //     return `${criteria}[${operation}]${value}`;
    // }
    // const createSortCriteria = (criteria, orderSort) => {
    //     return `${criteria}-${orderSort}`;
    // }
    //
    // const createValueForFilterCriteria = (filterOption) => {
    //     if (Array.isArray(filterOption)) {
    //         if (filterOption.length > 1) {
    //             return filterOption.join('|');
    //         } else if (filterOption.length === 1) {
    //             return filterOption[0];
    //         } else {
    //             return null;
    //         }
    //     } else {
    //         return filterOption;
    //     }
    // };
    //
    // const buildFilterSpecs = () => {
    //     const filterSearchSpec = [];
    //     if (filterOptions.categoryName.length) {
    //         const value = createValueForFilterCriteria(filterOptions.categoryName);
    //         filterSearchSpec.push(createFilterCriteria("categoryName", "eq", value));
    //     }
    //     if (filterOptions.cityName.length) {
    //         const value = createValueForFilterCriteria(filterOptions.cityName);
    //         filterSearchSpec.push(createFilterCriteria("cityName", "eq", value));
    //     }
    //     if (filterOptions.priceFrom) {
    //         filterSearchSpec.push(createFilterCriteria("priceFrom", "gte", filterOptions.priceFrom));
    //     }
    //     if (filterOptions.priceTo) {
    //         filterSearchSpec.push(createFilterCriteria("priceTo", "lte", filterOptions.priceTo));
    //     }
    //     if (filterOptions.productName) {
    //         filterSearchSpec.push(createFilterCriteria("productName", "starts_with", filterOptions.productName));
    //     }
    //     return filterSearchSpec;
    // }
    //
    // const buildSortSpecs = () => {
    //     const sortSpecs = [];
    //     if (productSort.criteria && productSort.orderSort) {
    //         sortSpecs.push(createSortCriteria(productSort.criteria, productSort.orderSort));
    //     }
    //     return sortSpecs;
    // }
    //
    // const setOrRemoveQueryParameters = (filterOptions) => {
    //     const newQueryParams = new URLSearchParams();
    //
    //     for (let key in filterOptions) {
    //         const value = filterOptions[key];
    //         if (value !== null && value !== '' && (Array.isArray(value) ? value.length > 0 : true)) {
    //             setSearchQueryParameters(key, value, newQueryParams);
    //         } else {
    //             newQueryParams.delete(key);
    //         }
    //     }
    //     setQueryParams(newQueryParams);
    // }
    //
    //
    // const setSearchQueryParameters = (key, value, newQueryParams) => {
    //     if (Array.isArray(value)) {
    //         for (let val in value) {
    //             newQueryParams.append(key, value[val]);
    //         }
    //     } else {
    //         newQueryParams.set(key, value);
    //     }
    // }
    //

    return (
        <MainLayout>
            <Box sx={{
                maxWidth: "872px",
                margin: "0 auto",
                [theme.breakpoints.only("lg")]: {
                    maxWidth: "872px"
                },
                [theme.breakpoints.only("md")]: {
                    maxWidth: "872px"
                },
                [theme.breakpoints.only("sm")]: {
                    maxWidth: "567px",
                },
                [theme.breakpoints.only("xs")]: {
                    maxWidth: "320px",
                },
            }}>
                <Typography variant="h4" sx={{color: theme.palette.info.main}}>
                    Check the products
                </Typography>
                <FilteringComponent />
            </Box>
            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <MainProductList products={products}/>
            </Box>
        </MainLayout>
    );
};

export default ProductsPage;