"use client";

import React, {useEffect, useState} from "react";
import MainLayout from "@/components/templates/MainLayout";
import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/material/styles";
import {useAuth} from "../../../api/auth/AuthContext";
import {getOrdersApi} from "../../../api/entities/OrderApi";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Button, Container, FormControl, MenuItem} from "@mui/material";
import moment from 'moment';
import {UnauthenticatedMessage} from "ui";
import {TableContainerComponent} from "ui";
import {CssTextFieldDarkBackground} from "ui";
import {TablePaginationComponent} from "ui";
import useProductForm from "../../../hooks/useProductForm";

const tableCellLabels = ["Order Number", "Order Date", "Buyer Name", "Total Price", "Status", "Actions"];

export type SortFilter = {
    criteria: "orderDate" | null;
    orderSort: "asc" | "desc" | null;
};

const buildFilterOptionsFromQueryParams = (queryParams: any) => {
    return {
        orderStatus: queryParams.get("orderStatus") ? queryParams.get("orderStatus") : null,
    }
}

const OrdersPage = () => {
    const theme = useTheme();
    const router = useRouter();
    const renderCell = (item: any, key: string) => {
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
                                    router.push(`/orders/${item.id}`)
                                }}>
                            View
                        </Button>
                    </>
                )
            default:
                return null;
        }
    };

    const pathname = usePathname();
    const searchParams = useSearchParams();

    const {isAuthenticated} = useAuth();
    const [orders, setOrders] = useState([]);
    const {seller} = useProductForm();
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
        if (seller) {
            const filterSpecs: string[] = buildFilterSpecs();
            const sortSpecs: string[] = buildSortSpecs();
            setOrRemoveQueryParameters(sortSpecs);
            if (selectedStatusFilter) {
                filterSpecs.push(`orderStatus[eq]${selectedStatusFilter}`);
            }
            getOrdersForSeller(currentPage, itemsPerPage, sortSpecs, filterSpecs);
        }

    }, [filterOptions, orderSort, itemsPerPage, currentPage, seller, selectedStatusFilter]);

    useEffect(() => {
        setFilterOptions(buildFilterOptionsFromQueryParams(searchParams));
    }, [searchParams]);

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
        const filterSearchSpec = [`sellerAlias[eq]${seller.alias}`];
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

    const setOrRemoveQueryParameters = (sortSpecs: string[]) => {
        const newQueryParams = new URLSearchParams();
        if (selectedStatusFilter) {
            newQueryParams.set('orderStatus', selectedStatusFilter!);
        }
        if (sortSpecs.length > 0) {
            newQueryParams.set('sort', sortSpecs[0]);
        } else {
            newQueryParams.delete('sort');
        }

        router.push(pathname + "?" + newQueryParams.toString());
    };


    const displayOrders = orders?.map((order: any) => ({
        id: order.id,
        buyerName: order.buyerFirstName + " " + order.buyerLastName,
        orderNumber: "# " + order.orderNumber,
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
                        <FormControl sx={{mb: 2, width: "200px"}}>
                            <CssTextFieldDarkBackground
                                label="Status"
                                select
                                value={selectedStatusFilter || ""}
                                onChange={handleFilterChange}
                            >
                                <MenuItem value="PENDING">Pending</MenuItem>
                                <MenuItem value="PROCESSING">Processing</MenuItem>
                                <MenuItem value="SHIPPING">Shipping</MenuItem>
                                <MenuItem value="DELIVERED">Delivered</MenuItem>
                                <MenuItem value="CANCELED">Canceled</MenuItem>
                            </CssTextFieldDarkBackground>
                        </FormControl>
                        {displayOrders.length === 0 ? (
                            <Typography>
                                No orders yet!
                            </Typography>
                        ) : (
                            <>
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
                            </>
                        )}

                    </Container>
                ) : (
                    <UnauthenticatedMessage/>
                )}
            </MainLayout>
        </>
    );
};

export default OrdersPage;