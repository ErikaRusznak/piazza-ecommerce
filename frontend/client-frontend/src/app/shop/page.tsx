"use client";

import React, {useEffect, useState} from "react";
import MainLayout from "@/components/templates/MainLayout";
import {Box, Typography} from "@mui/material";
import useTheme from "@/theme/themes";
import {useRouter} from "next/navigation";
import {getProductsApi} from "../../../api/entities/ProductApi";
import MainProductList from "@/components/organisms/product/MainProductList";
import FilteringComponent from "@/components/organisms/filtering/FilteringComponent";
import NumberOfPageSelect from "@/components/atoms/filtering/NumberOfPageSelect";
import PaginationComponent from "@/components/moleculas/PaginationComponent";

export type SortFilter = {
    criteria: "productPrice" | "productName" | null;
    orderSort: "asc" | "desc" | null;
}

export type FilterOptions = {
    categoryName: [] | string[];
    cityName: [] | string[];
    priceFrom: null | number;
    priceTo: null | number;
    productName: null | string;
    [key: string]: number | string | string[] | null | undefined;
    // sellerAlias: null | string;
}

const buildFilterOptionsFromQueryParams = (queryParams: any) => {
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

    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [totalNumberProductsPerPage, setTotalNumberProductsPerPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [productSort, setProductSort] = useState<SortFilter>({criteria: null, orderSort: null});

    const [queryParams, setQueryParams] = useState(new URLSearchParams(location.search));

    const [filterOptions, setFilterOptions] = useState(buildFilterOptionsFromQueryParams(new URLSearchParams(location.search)));

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [productId, setProductId] = useState(null);

    const [isLoading, setLoading] = useState(true)

    const [totalNumberOfProducts, setTotalNumberOfProducts] = useState(0);
    const getProducts = (page: number, newItemsPerPage: number, sortSpecs: string[], filterSpecs: string[]) => {
        setItemsPerPage(newItemsPerPage);
        getProductsApi(page, newItemsPerPage, sortSpecs, filterSpecs)
            .then((res) => {
                setProducts(res.data.data);
                setTotalNumberOfProducts(res.data.numberOfElements);
                setTotalNumberProductsPerPage(res.data.numberOfElements);
                setLoading(false)

            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        const filterSpecs: string[] = buildFilterSpecs();
        const sortSpecs: string[] = buildSortSpecs();
        setOrRemoveQueryParameters(filterOptions);
        getProducts(currentPage, itemsPerPage, sortSpecs, filterSpecs);
    }, [filterOptions, productSort, itemsPerPage, currentPage]);

    // useEffect(() => {
    //     navigate({search: queryParams.toString()});
    // }, [queryParams]);

    useEffect(() => {
        setFilterOptions(buildFilterOptionsFromQueryParams(new URLSearchParams(location.search)));
    }, [location.search]);

    // useEffect(() => {
    //     setCurrentPage(1);
    // }, [breakpoint]);

    const handleItemsPerPageChange = (itemsPerPage: number) => {
        const filterSpecs = buildFilterSpecs();
        const sortSpecs = buildSortSpecs();
        setCurrentPage(1);
        getProducts(1, itemsPerPage, sortSpecs, filterSpecs);
    }

    const handleSortChanged = (sortFilter: SortFilter) => {
        setProductSort(sortFilter);
        setCurrentPage(1);
    }
    const handleOnFilterChanged = (newFilterOptions: FilterOptions) => {
        setFilterOptions(newFilterOptions);
        setCurrentPage(1);
    }

    const createFilterCriteria = (criteria: string, operation: string, value: number) => {
        return `${criteria}[${operation}]${value}`;
    }
    const createSortCriteria = (criteria: "productPrice" | "productName", orderSort: "asc" | "desc") => {
        return `${criteria}-${orderSort}`;
    }

    const createValueForFilterCriteria = (filterOption: any[]) => {
        if (Array.isArray(filterOption)) {
            if (filterOption.length > 1) {
                return filterOption.join('|');
            } else if (filterOption.length === 1) {
                return filterOption[0];
            } else {
                return null;
            }
        } else {
            return filterOption;
        }
    };

    const buildFilterSpecs = () => {
        const filterSearchSpec = [];
        if (filterOptions.categoryName.length) {
            const value = createValueForFilterCriteria(filterOptions.categoryName);
            filterSearchSpec.push(createFilterCriteria("categoryName", "eq", value));
        }
        if (filterOptions.cityName.length) {
            const value = createValueForFilterCriteria(filterOptions.cityName);
            filterSearchSpec.push(createFilterCriteria("cityName", "eq", value));
        }
        if (filterOptions.priceFrom) {
            filterSearchSpec.push(createFilterCriteria("priceFrom", "gte", filterOptions.priceFrom));
        }
        if (filterOptions.priceTo) {
            filterSearchSpec.push(createFilterCriteria("priceTo", "lte", filterOptions.priceTo));
        }
        if (filterOptions.productName) {
            filterSearchSpec.push(createFilterCriteria("productName", "starts_with", filterOptions.productName));
        }
        return filterSearchSpec;
    }

    const buildSortSpecs = () => {
        const sortSpecs = [];
        if (productSort.criteria && productSort.orderSort) {
            sortSpecs.push(createSortCriteria(productSort.criteria, productSort.orderSort));
        }
        return sortSpecs;
    }

    const setOrRemoveQueryParameters = (filterOptions: {
        [x: string]: any;
        priceFrom?: number | null;
        priceTo?: number | null;
        categoryName?: string[];
        cityName?: string[];
        productName?: string;
    }) => {
        const newQueryParams = new URLSearchParams();

        for (let key in filterOptions) {
            const value = filterOptions[key];
            if (value !== null && value !== '' && (Array.isArray(value) ? value.length > 0 : true)) {
                setSearchQueryParameters(key, value, newQueryParams);
            } else {
                newQueryParams.delete(key);
            }
        }
        setQueryParams(newQueryParams);
    }


    const setSearchQueryParameters = (key: string, value: string[], newQueryParams: URLSearchParams) => {
        if (Array.isArray(value)) {
            for (let val in value) {
                newQueryParams.append(key, value[val]);
            }
        } else {
            newQueryParams.set(key, value);
        }
    }

    const numberOfPages = Math.ceil(totalNumberOfProducts / itemsPerPage);


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
                <FilteringComponent
                    filterOptions={filterOptions}
                    onFilterChanged={handleOnFilterChanged}
                    onSortChanged={handleSortChanged}/>

                <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", mt: 1}}>
                    <MainProductList products={products}/>
                </Box>
                <Box sx={{display: "flex", justifyContent: "space-between", position: "relative", mt: 2}}>
                    <Box sx={{position: "absolute", left: 0}}>
                        <NumberOfPageSelect
                            handleItemsPerPageChange={handleItemsPerPageChange}
                        />
                    </Box>
                    <Box sx={{position: "absolute", left: "50%", transform: "translateX(-50%)"}}>
                        <PaginationComponent
                            numberOfPages={numberOfPages}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </Box>
                </Box>
            </Box>
        </MainLayout>
    );
};

export default ProductsPage;