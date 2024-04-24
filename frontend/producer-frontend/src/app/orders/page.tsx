"use client";

import React, {useEffect, useState} from "react";
import MainLayout from "@/components/templates/MainLayout";
import Typography from "@mui/material/Typography";
import useTheme from "@/theme/themes";
import {useAuth} from "../../../api/auth/AuthContext";
import {getOrdersApi, getOrdersForSellerApi} from "../../../api/entities/OrderApi";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Button, Container, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import moment from 'moment';
import UnauthenticatedMessage from "@/components/atoms/UnauthenticatedMessage";
import TableContainerComponent from "@/components/moleculas/table/TableContainerComponent";
import {CssTextFieldDarkBackground} from "@/components/atoms/form/dark/CssTextFieldDarkBackground";
import TablePaginationComponent from "@/components/moleculas/table/TablePaginationComponent";

;

const tableCellLabels = ["Order Number", "Order Date", "Buyer Name", "Total Price", "Status", "Actions"];


export type SortFilter = {
    criteria: "orderDate" | null;
    orderSort: "asc" | "desc" | null;
};

export type FilterOptions = {
    orderStatus: null | string;
};

const buildFilterOptionsFromQueryParams = (queryParams: any) => {
    return {
        orderStatus: queryParams.get("orderStatus") ? queryParams.get("orderStatus") : null,
    }
}

const OrdersPage = () => {

    const renderCell = (item: any, key: string) => {
        const theme = useTheme();
        const router = useRouter();
        switch (key) {
            case 'Order Number':
                return item.orderNumber;
            case 'Buyer Name':
                return item.buyerName;
            case 'Order Date':
                return moment(item.orderDate).format("YYYY-MM-DD HH:mm");
            case 'Total Price':
                return `${item.totalPrice.toFixed(2)} RON`;
            case "Status":
                return item.orderStatus;
            case "Actions":
                return (
                    <>
                        <Button size="small" sx={{color: theme.palette.lightColor.main}}
                                onClick={() => {
                                    console.log(item);
                                    router.push(`/orders/${item.id}`)
                                }}>
                            View
                        </Button>
                    </>
                )
            default:
                return null;
        }
    }
    const theme = useTheme();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const {username, isAuthenticated, sellerAlias} = useAuth();
    const [orders, setOrders] = useState([]);

    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalNumberOfOrders, setTotalNumberOfOrders] = useState(0);
    const [orderSort, setOrderSort] = useState<SortFilter>({criteria: null, orderSort: null});

    const [filterOptions, setFilterOptions] = useState(buildFilterOptionsFromQueryParams(new URLSearchParams()));
    const [selectedStatusFilter, setSelectedStatusFilter] = useState<string | null>(null);


    const getOrdersForSeller = (page: number, newItemsPerPage: number, sortSpecs: string[], filterSpecs: string[]) => {
        setItemsPerPage(newItemsPerPage);
        getOrdersApi(page, newItemsPerPage, sortSpecs, filterSpecs)
            .then((res) => {
                setOrders(res.data.data);
                setTotalNumberOfOrders(res.data.numberOfElements);
            })
            .catch((err) => console.error(err))
    }

    useEffect(() => {
        if(sellerAlias) {
            const filterSpecs: string[] = buildFilterSpecs();
            const sortSpecs: string[] = buildSortSpecs();
            setOrRemoveQueryParameters(filterOptions, sortSpecs);
            if (selectedStatusFilter) {
                filterSpecs.push(`orderStatus[eq]${selectedStatusFilter}`);
            }
            getOrdersForSeller(currentPage, itemsPerPage, sortSpecs, filterSpecs);
        }

    }, [filterOptions, orderSort, itemsPerPage, currentPage, sellerAlias, selectedStatusFilter]);

    useEffect(() => {
        setFilterOptions(buildFilterOptionsFromQueryParams(searchParams));
    }, [searchParams]);

    const handleItemsPerPageChange = (itemsPerPage: number) => {
        const filterSpecs = buildFilterSpecs();
        const sortSpecs = buildSortSpecs();
        setCurrentPage(1);
        getOrdersForSeller(1, itemsPerPage, sortSpecs, filterSpecs);
    };


    const handleFilterChange = (event: { target: { value: string; }; }) => {
        setSelectedStatusFilter(event.target.value as string);
        setCurrentPage(1);
    };

    const createFilterCriteria = (criteria: string, operation: string, value: number) => {
        return `${criteria}[${operation}]${value}`;
    };
    const createSortCriteria = (criteria: "orderDate", orderSort: "asc" | "desc") => {
        return `${criteria}-${orderSort}`;
    };

    const buildFilterSpecs = () => {
        const filterSearchSpec = [`sellerAlias[eq]${sellerAlias}`];
        if (filterOptions.orderStatus) {
            filterSearchSpec.push(createFilterCriteria("orderStatus", "eq", filterOptions.orderStatus));
        }

        return filterSearchSpec;
    }

    const buildSortSpecs = () => {
        const sortSpecs = [];
        sortSpecs.push(createSortCriteria("orderDate", "desc"));
        return sortSpecs;
    }

    const setOrRemoveQueryParameters = (filterOptions: {
                                            [x: string]: any;
                                            priceFrom?: number | null;
                                            priceTo?: number | null;
                                            categoryName?: string[];
                                            cityName?: string[];
                                            productName?: string;
                                        },
                                        sortSpecs: string[]) => {
        const newQueryParams = new URLSearchParams();
        for (let key in filterOptions) {
            const value = filterOptions[key];
            if (value !== null && value !== '' && (Array.isArray(value) ? value.length > 0 : true)) {
                setSearchQueryParameters(key, value, newQueryParams);
            } else {
                newQueryParams.delete(key);
            }
        }

        // for sorting
        if (sortSpecs.length > 0) {
            newQueryParams.set('sort', sortSpecs[0]);
        } else {
            newQueryParams.delete('sort');
        }

        router.push(pathname + "?" + newQueryParams.toString());
    };

    const setSearchQueryParameters = (key: string, value: string | string[], newQueryParams: URLSearchParams) => {
        if (Array.isArray(value)) {
            for (let val of value) {
                newQueryParams.append(key, val);
            }
        } else {
            newQueryParams.set(key, value);
        }
    };
    const displayOrders = orders?.map((order: any) => ({
        id: order.id,
        buyerName: order.buyerFirstName + " " + order.buyerLastName,
        orderNumber: "# "+order.orderNumber,
        orderDate: order.orderDate,
        totalPrice: order.totalPrice,
        orderStatus: order.orderStatus,
    }));


    return (
        <>
            <MainLayout>
                {isAuthenticated ? (
                    <Container>
                        <Typography variant="h4" color={theme.palette.info.main} sx={{mb: 2}}>
                            Orders
                        </Typography>
                        <FormControl sx={{ mb: 2, width: "200px" }}>
                            <CssTextFieldDarkBackground
                                label="Status"
                                select
                                value={selectedStatusFilter || ""}
                                onChange={handleFilterChange}
                            >
                                <MenuItem value="ALL">All</MenuItem>
                                <MenuItem value="PENDING">Pending</MenuItem>
                                <MenuItem value="PROCESSING">Processing</MenuItem>
                                <MenuItem value="SHIPPING">Shipping</MenuItem>
                                <MenuItem value="DELIVERED">Delivered</MenuItem>
                                <MenuItem value="CANCELED">Canceled</MenuItem>
                            </CssTextFieldDarkBackground>
                        </FormControl>
                        <TableContainerComponent
                            items={displayOrders}
                            tableCellLabels={tableCellLabels}
                            renderCell={renderCell}
                        />
                        <TablePaginationComponent
                            totalNumberOfProducts={totalNumberOfOrders}
                            currentPage={currentPage}
                            itemsPerPage={itemsPerPage}
                            setCurrentPage={setCurrentPage}
                            setItemsPerPage={setItemsPerPage}
                        />
                    </Container>
                ) : (
                    <UnauthenticatedMessage/>
                )}
            </MainLayout>
        </>
    );
};

export default OrdersPage;