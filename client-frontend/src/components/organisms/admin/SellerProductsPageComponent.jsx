import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import useBreakpoint from "../../../hooks/useBreakpoint";
import {getProductsApi} from "../../../api/entities/ProductApi";
import FilteringComponent from "../../moleculas/filter/FilteringComponent";
import NoEntityMessageComponent from "../../atoms/error/NoEntityMessageComponent";
import SelectionOfNumberPerPage from "../../atoms/input/SelectionOfNumberPerPage";
import ProductComponent from "../../moleculas/ProductComponent";
import PaginationComponent from "../../moleculas/PaginationComponent";
import ProductAddToCartModal from "../../moleculas/modals/ProductAddToCartModal";

const buildFilterOptionsFromQueryParams = (queryParams) => {
    return {
        priceFrom: queryParams.get('priceFrom') ? parseInt(queryParams.get('priceFrom')) : null,
        priceTo: queryParams.get('priceTo') ? parseInt(queryParams.get('priceTo')) : null,
        categoryName: queryParams.get('categoryName') ? queryParams.getAll('categoryName') : [],
        cityName: queryParams.get('cityName') ? queryParams.getAll('cityName') : [],
        productName: queryParams.get('productName') ? queryParams.get('productName') : null,
        sellerAlias: queryParams.get('sellerAlias') ? queryParams.get('sellerAlias') : null,
    };
}

const SellerProductsPageComponent = () => {

    const [products, setProducts] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [totalNumberProducts, setTotalNumberProducts] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [productSort, setProductSort] = useState({criteria: null, orderSort: null});

    const location = useLocation()
    const navigate = useNavigate();
    const [queryParams, setQueryParams] = useState(new URLSearchParams(location.search));

    const [filterOptions, setFilterOptions] = useState(buildFilterOptionsFromQueryParams(new URLSearchParams(location.search)));

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [productId, setProductId] = useState(null);

    const [isLoading, setLoading] = useState(true)

    const breakpoint = useBreakpoint();

    const { sellerAlias } = useParams();

    const toggleModal = (productId) => {
        setIsModalOpen(!isModalOpen);
        setProductId(productId);
    }

    const getProducts = (page, newItemsPerPage, sortSpecs, filterSpecs) => {
        setItemsPerPage(newItemsPerPage);
        getProductsApi(page, newItemsPerPage, sortSpecs, filterSpecs)
            .then((res) => {
                setProducts(res.data.data);
                setTotalNumberProducts(res.data.numberOfElements);
                setLoading(false)

            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        const filterSpecs = buildFilterSpecs();
        const sortSpecs = buildSortSpecs();
        setOrRemoveQueryParameters(filterOptions);
        getProducts(currentPage, itemsPerPage, sortSpecs, filterSpecs);
    }, [filterOptions, productSort, itemsPerPage, currentPage]);

    useEffect(() => {
        navigate({search: queryParams.toString()});
    }, [queryParams]);

    useEffect(() => {
        setFilterOptions(buildFilterOptionsFromQueryParams(new URLSearchParams(location.search)));
    }, [location.search]);

    useEffect(() => {
        setCurrentPage(1);
    }, [breakpoint]);

    const handleItemsPerPageChange = (event) => {
        const newItemsPerPage = parseInt(event.target.value);
        const filterSpecs = buildFilterSpecs();
        const sortSpecs = buildSortSpecs();
        setCurrentPage(1);
        getProducts(1, newItemsPerPage, sortSpecs, filterSpecs);
    }

    const handleSortChanged = (sortFilter) => {
        setProductSort(sortFilter);
        setCurrentPage(1);
    }
    const handleOnFilterChanged = (newFilterOptions) => {
        setFilterOptions(newFilterOptions);
        setCurrentPage(1);
    }

    const createFilterCriteria = (criteria, operation, value) => {
        return `${criteria}[${operation}]${value}`;
    }
    const createSortCriteria = (criteria, orderSort) => {
        return `${criteria}-${orderSort}`;
    }

    const createValueForFilterCriteria = (filterOption) => {
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
        filterSearchSpec.push(createFilterCriteria("sellerAlias", "eq", sellerAlias));

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

    const setOrRemoveQueryParameters = (filterOptions) => {
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


    const setSearchQueryParameters = (key, value, newQueryParams) => {
        if (Array.isArray(value)) {
            for (let val in value) {
                newQueryParams.append(key, value[val]);
            }
        } else {
            newQueryParams.set(key, value);
        }
    }

    return (
        <div className="">
            {isLoading === false &&
                <section>
                    <div className="mx-auto mt-10 max-w-7xl px-10">
                        <header>
                            <h2 className="text-3xl mb-10 font-bold text-zinc-800 dark:text-white">
                                {sellerAlias}'s products
                            </h2>
                        </header>

                        <div className="mb-8">
                            <div>
                                <FilteringComponent
                                    filterOptions={filterOptions}
                                    onFilterChanged={handleOnFilterChanged}
                                    onSortChanged={handleSortChanged}
                                />
                            </div>

                        </div>

                        {(totalNumberProducts === 0) ? (<NoEntityMessageComponent
                            header="Products do not exist yet."
                            paragraph="Sorry, we could not find the products you are looking for."/>) : (
                            <div>

                                <SelectionOfNumberPerPage
                                    itemsPerPage={itemsPerPage}
                                    setItemsPerPage={setItemsPerPage}
                                    handleItemsPerPageChange={handleItemsPerPageChange}
                                />

                                <ul className={`mt-2 h-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4 items-center`}>
                                    {products.map((product) => (
                                        <div className="col-span-1" key={product.id}>
                                            <div className="flex items-center justify-center h-full">
                                                <ProductComponent
                                                    key={product.id}
                                                    id={product.id}
                                                    name={product.name} xs
                                                    imageName={product.imageName}
                                                    price={product.price}
                                                    sellerAlias={product.seller.alias}
                                                    rating={product.rating}
                                                    toggleModal={() => toggleModal(product.id)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </ul>

                                <div className="mt-10 flex pb-10 justify-center">
                                    <PaginationComponent
                                        className="pagination-bar"
                                        currentPage={currentPage}
                                        totalCount={totalNumberProducts}
                                        itemsPerPage={itemsPerPage}
                                        handlePageChange={page => setCurrentPage(page)}
                                    />
                                </div>

                            </div>
                        )}
                    </div>

                </section>
            }

            <ProductAddToCartModal
                toggleModal={toggleModal}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                productId={productId}
            />
        </div>
    );
}

export default SellerProductsPageComponent;