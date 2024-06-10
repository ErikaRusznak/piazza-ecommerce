import React, {useCallback, useEffect, useState} from "react";
import {getLocationsApi} from "../../../../api/entities/LocationApi";
import {getAllCategoryNames} from "../../../../api/entities/CategoryApi";
import Tag from "@/components/atoms/filtering/Tag";
import SearchComponent from "@/components/moleculas/filtering/SearchComponent";
import ExpandableItem from "@/components/moleculas/filtering/ExpandableItem";
import {Box, Typography, useMediaQuery} from "@mui/material";
import RangeFilterComponent from "@/components/moleculas/filtering/RangeFilterComponent";
import MultipleChoiceFilterComponent from "@/components/moleculas/filtering/MultipleChoiceFilterComponent";
import SortFilterComponent from "@/components/moleculas/filtering/SortFilterComponent";
import FilterTagContainer from "@/components/moleculas/filtering/FilterTagContainer";
import {FilterOptions, SortFilter} from "@/app/shop/page";
import Button from "@mui/material/Button";
import {useTheme} from "@mui/material/styles";

type FilteringComponentProps = {
    filterOptions: FilterOptions;
    onFilterChanged: (newFilterOptions: FilterOptions) => void;
    onSortChanged: (newSortFilter: SortFilter) => void;
}

export type FilterOptionKeys = "priceFrom" | "priceTo" | "categoryName" | "cityName" | "productName";

export type FilterOptionValues = number | string | [] | string[];

const FilteringComponent = ({filterOptions, onFilterChanged, onSortChanged}: FilteringComponentProps) => {

    const theme = useTheme();
    const [openFilter, setOpenFilter] = useState<"Price" | "City" | "Category" | "Sort" | null>(null);
    const [filterTags, setFilterTags] = useState<Tag[]>([]);

    const [cityOptions, setCityOptions] = useState<string[]>([]);
    const [categoryOptions, setCategoryOptions] = useState<string[]>([]);

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };
    const handleSaveFilters = () => {
        closeSidebar();
    };

    const toggleFilter = () => {
        setOpenFilter(null);
    }

    const handleFilterClick = (filter: "Price" | "City" | "Category" | "Sort" | null) => {
        setOpenFilter((prevFilter) => (prevFilter === filter ? null : filter));
    };

    const getCities = () => {
        getLocationsApi()
            .then((res) => {
                setCityOptions(res.data);
            })
            .catch((err) => console.error(err));
    };
    const getCategoryNames = () => {
        getAllCategoryNames()
            .then((res) => {
                setCategoryOptions(res.data)
            })
            .catch((err) => console.error(err))
    }

    useEffect(() => {
        getCities();
        getCategoryNames();
    }, []);

    useEffect(() => {
        if (filterOptions && typeof filterOptions === 'object') {
            const newFilterTags: Tag[] = Object.keys(filterOptions)
                .filter(key => !!filterOptions[key as FilterOptionKeys])
                .filter(key => key !== "productName")
                .map(key => {
                    return new Tag(key, filterOptions[key as FilterOptionKeys] as FilterOptionValues, "ONE_VALUE");
                });
            setFilterTags(newFilterTags);
        }
    }, [filterOptions]);


    // for price, sort
    const onFilterRemovedOneOption = (filterNameToRemove: string) => {
        const updatedFilterOptions: FilterOptions = {...filterOptions};
        delete updatedFilterOptions[filterNameToRemove];
        onFilterChanged(updatedFilterOptions);
    }

    // for category, city
    const onFilterRemovedMultipleOptions = (filterNameToRemove: string, valueToRemove: string) => {
        const updatedFilterOptions: FilterOptions = {...filterOptions};

        if (Array.isArray(updatedFilterOptions[filterNameToRemove])) {
            const filteredValues = (updatedFilterOptions[filterNameToRemove] as string[])
                .filter((value) => value !== valueToRemove);

            (updatedFilterOptions[filterNameToRemove] as string[]) = filteredValues as string[] || null;
            onFilterChanged(updatedFilterOptions);
        }
    };

    const removeAllTags = () => {
        const newFilterOptions = {
            priceFrom: null,
            priceTo: null,
            categoryName: [],
            cityName: [],
            productName: null,
            sellerAlias: null,
        };
        onFilterChanged(newFilterOptions);
    }

    // price
    const handlePriceChanged = (priceFrom: number, priceTo: number) => {
        const newFilterOptions = {...filterOptions, "priceFrom": priceFrom, "priceTo": priceTo};
        onFilterChanged(newFilterOptions);
    }

    // productName
    const handleFilterChanged = (filterName: FilterOptionKeys, filterValue: string) => {
        const newFilterOptions = {...filterOptions, [filterName]: filterValue};
        onFilterChanged(newFilterOptions);
    }

    // city, category
    const handleFilterMultipleOptionsChanged = (filterName: FilterOptionKeys, filterValues: string[]) => {
        const newFilterOptions = {...filterOptions};
        (newFilterOptions[filterName] as string[]) = filterValues;

        onFilterChanged(newFilterOptions);
    };

    /**  false if displayed, true if not*/
    const isFilterOptionsEmpty =
        filterOptions && typeof filterOptions === 'object' &&
        Object.keys(filterOptions).every((key) => {
            const value = filterOptions[key];
            if (key === "productName" && value) {
                return true;
            }
            if (Array.isArray(value)) {
                return value.length === 0;
            }
            return value === null || value?.toString() === '' || key === 'filterName';
        });

    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <>
            <Box sx={{my: 2}}>
                <SearchComponent
                    handleSearchChanged={handleFilterChanged}
                    filterName="productName"
                />
            </Box>

            {/*{isSmallScreen ?*/}
            {/*    (<>*/}
            {/*        <Button onClick={toggleSidebar}>Filters</Button>*/}
            {/*        <Box*/}
            {/*            sx={{*/}
            {/*                position: "fixed",*/}
            {/*                top: 0,*/}
            {/*                right: isSidebarOpen ? 0 : "-300px", // Adjust the width of the sidebar accordingly*/}
            {/*                height: "100vh",*/}
            {/*                width: "300px", // Adjust the width of the sidebar accordingly*/}
            {/*                backgroundColor: "#fff",*/}
            {/*                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",*/}
            {/*                transition: "right 0.3s ease-in-out",*/}
            {/*                zIndex: 999,*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            <Box pt={8} pl={1}>*/}
            {/*                <Typography variant="h6" color={theme.palette.info.main}>Filters</Typography>*/}
            {/*                <Box sx={{position: "static"}} pt={2}>*/}
            {/*                    <RangeFilterComponent*/}
            {/*                        smallPageSize={true}*/}
            {/*                        handleRangeChanged={(from, to) => {*/}
            {/*                            // Handle range change*/}
            {/*                        }}*/}
            {/*                        getRangeFrom={filterOptions.priceFrom}*/}
            {/*                        getRangeTo={filterOptions.priceTo}*/}
            {/*                    />*/}
            {/*                </Box>*/}

        {/*                /!*<Button variant="contained" onClick={handleSaveFilters}>*!/*/}
            {/*                /!*    Save Filters*!/*/}
            {/*                /!*</Button>*!/*/}
            {/*            </Box>*/}
            {/*        </Box>*/}
            {/*    </>*/}
            {/*    ) : (*/}
            <Box sx={{display: "flex", gap: 1, position: "relative"}}>
                <ExpandableItem
                    label="Price"
                    isOpen={openFilter === 'Price'}
                    onClick={() => handleFilterClick("Price")}
                >
                    {openFilter === "Price" &&
                        <Box sx={{width: "20px"}}>
                            <RangeFilterComponent onClickInside={(e: any) => e.stopPropagation()}
                                                  toggleRangeFilter={toggleFilter}
                                                  handleRangeChanged={handlePriceChanged}
                                                  getRangeFrom={filterOptions.priceFrom}
                                                  getRangeTo={filterOptions.priceTo}
                            />
                        </Box>}
                </ExpandableItem>
                <ExpandableItem
                    label="City"
                    isOpen={openFilter === 'City'}
                    onClick={() => handleFilterClick("City")}
                >
                    {openFilter === "City" &&
                        <Box sx={{width: "20px"}}>
                            <MultipleChoiceFilterComponent
                                onClickInside={(e: any) => e.stopPropagation()}
                                toggleFilter={toggleFilter}
                                handleListChanged={handleFilterMultipleOptionsChanged}
                                list={cityOptions}
                                filterName="cityName"
                                getElementsNames={filterOptions.cityName}
                            />
                        </Box>}
                </ExpandableItem>
                <ExpandableItem
                    label="Category"
                    isOpen={openFilter === 'Category'}
                    onClick={() => handleFilterClick("Category")}
                >
                    {openFilter === "Category" &&
                        <Box sx={{width: "20px"}}>
                            <MultipleChoiceFilterComponent
                                onClickInside={(e: any) => e.stopPropagation()}
                                toggleFilter={toggleFilter}
                                handleListChanged={handleFilterMultipleOptionsChanged}
                                list={categoryOptions}
                                filterName="categoryName"
                                getElementsNames={filterOptions.categoryName}
                            />
                        </Box>}
                </ExpandableItem>
                <ExpandableItem
                    label="Sort By"
                    isOpen={openFilter === 'Sort'}
                    onClick={() => handleFilterClick('Sort')}
                >
                    {openFilter === "Sort" &&
                        <SortFilterComponent
                            onSortChanged={onSortChanged}
                        />}
                </ExpandableItem>
            </Box>
            {/*)*/}
            {/*}*/}

            {
                !isFilterOptionsEmpty &&
                <div className="">
                    <FilterTagContainer
                        filterTags={filterTags}
                        removeFilterOneOption={onFilterRemovedOneOption}
                        removeFilterMultipleOptions={onFilterRemovedMultipleOptions}
                        removeAllTags={removeAllTags}
                    />
                </div>
            }
        </>
    )
        ;
};

export default FilteringComponent;
