import React, {useEffect, useState} from "react";
import {getLocationsApi} from "../../../../api/entities/LocationApi";
import {getAllCategoryNames} from "../../../../api/entities/CategoryApi";
import Tag from "@/components/atoms/filtering/Tag";
import SearchComponent from "@/components/moleculas/filtering/SearchComponent";
import ExpandableItem from "@/components/moleculas/filtering/ExpandableItem";
import {Box} from "@mui/material";
import RangeFilterComponent from "@/components/moleculas/filtering/RangeFilterComponent";
import MultipleChoiceFilterComponent from "@/components/moleculas/filtering/MultipleChoiceFilterComponent";
import SortFilterComponent from "@/components/moleculas/filtering/SortFilterComponent";
import FilterTagContainer from "@/components/moleculas/filtering/FilterTagContainer";
import {FilterOptions, SortFilter} from "@/app/shop/page";

type FilteringComponentProps = {
    filterOptions: FilterOptions;
    onFilterChanged: (newFilterOptions: FilterOptions) => void;
    onSortChanged: (newSortFilter: SortFilter) => void;
}

export type FilterOptionKeys = "priceFrom" | "priceTo" | "categoryName" | "cityName" | "productName";

export type FilterOptionValues = number | string | [] | string[];

const FilteringComponent = ({filterOptions, onFilterChanged, onSortChanged}:FilteringComponentProps) => {

    const [openFilter, setOpenFilter] = useState<"Price" | "City" | "Category" | "Sort" | null>(null);
    const [filterTags, setFilterTags] = useState<Tag[]>([]);

    const [cityOptions, setCityOptions] = useState<string[]>([]);
    const [categoryOptions, setCategoryOptions] = useState<string[]>([]);

    const toggleFilter = () => {
        setOpenFilter(null);
    }

    const handleFilterClick = (filter: "Price" | "City" | "Category" | "Sort" | null) => {
        if (openFilter === filter) {
            setOpenFilter(null); // same filter clicked again
        } else {
            setOpenFilter(filter);
        }
    };

    const getCities = () => {
        getLocationsApi()
            .then((res) => {
                setCityOptions(res.data);
            })
            .catch((err) => console.log(err));
    };
    const getCategoryNames = () => {
        getAllCategoryNames()
            .then((res) => {
                setCategoryOptions(res.data)
            })
            .catch((err) => console.log(err))
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
        const updatedFilterOptions: FilterOptions = { ...filterOptions };

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


    return (
        <>
            <SearchComponent
                handleSearchChanged={handleFilterChanged}
                filterName="productName"
            />
            <Box sx={{display: "flex", gap: 1, position: "relative"}}>
                <ExpandableItem
                    label="Price"
                    isOpen={openFilter === 'Price'}
                    onClick={() => handleFilterClick("Price")}
                >
                    <Box sx={{width: "20px"}}>
                        <RangeFilterComponent onClickInside={(e:any) => e.stopPropagation()}
                                              toggleRangeFilter={toggleFilter}
                                              handleRangeChanged={handlePriceChanged}
                                              getRangeFrom={filterOptions.priceFrom}
                                              getRangeTo={filterOptions.priceTo}
                        />
                    </Box>
                </ExpandableItem>
                <ExpandableItem
                    label="City"
                    isOpen={openFilter === 'City'}
                    onClick={() => handleFilterClick("City")}
                >
                    <Box sx={{width: "20px"}}>
                    <MultipleChoiceFilterComponent
                        onClickInside={(e:any) => e.stopPropagation()}
                        toggleFilter={toggleFilter}
                        handleListChanged={handleFilterMultipleOptionsChanged}
                        list={cityOptions}
                        filterName="cityName"
                        getElementsNames={filterOptions.cityName}
                    />
                    </Box>
                </ExpandableItem>
                <ExpandableItem
                    label="Category"
                    isOpen={openFilter === 'Category'}
                    onClick={() => handleFilterClick("Category")}
                >
                    <Box sx={{width: "20px"}}>
                        <MultipleChoiceFilterComponent
                            onClickInside={(e:any) => e.stopPropagation()}
                            toggleFilter={toggleFilter}
                            handleListChanged={handleFilterMultipleOptionsChanged}
                            list={categoryOptions}
                            filterName="categoryName"
                            getElementsNames={filterOptions.categoryName}
                        />
                    </Box>
                </ExpandableItem>
                <ExpandableItem
                    label="Sort By"
                    isOpen={openFilter === 'Sort'}
                    onClick={() => handleFilterClick('Sort')}
                >
                    <SortFilterComponent
                        onSortChanged={onSortChanged}
                    />
                </ExpandableItem>
            </Box>
            {!isFilterOptionsEmpty &&
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
    );
};

export default FilteringComponent;
