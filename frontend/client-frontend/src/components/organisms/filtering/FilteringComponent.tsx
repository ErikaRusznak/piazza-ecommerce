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

const FilteringComponent = ({filterOptions, onFilterChanged, onSortChanged}) => {

    const [openFilter, setOpenFilter] = useState(null);
    const [filterTags, setFilterTags] = useState([]);

    const [cityOptions, setCityOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);

    const toggleFilter = () => {
        setOpenFilter(null);
    }

    const handleFilterClick = (filter) => {
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
            const newFilterTags = Object.keys(filterOptions)
                .filter(key => !!filterOptions[key])
                .filter(key => key !== "productName")
                .map(key => {
                    return new Tag(key, filterOptions[key], "ONE_VALUE");
                });
            setFilterTags(newFilterTags);
        }
    }, [filterOptions]);


    // for price, sort
    const onFilterRemovedOneOption = (filterNameToRemove) => {
        const updatedFilterOptions = {...filterOptions};
        delete updatedFilterOptions[filterNameToRemove];
        onFilterChanged(updatedFilterOptions);
    }

    // for category, city
    const onFilterRemovedMultipleOptions = (filterNameToRemove, valueToRemove) => {
        const updatedFilterOptions = {...filterOptions};
        if (Array.isArray(updatedFilterOptions[filterNameToRemove])) {
            updatedFilterOptions[filterNameToRemove] = updatedFilterOptions[filterNameToRemove].filter(
                (value) => value !== valueToRemove
            );
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
    const handlePriceChanged = (priceFrom, priceTo) => {
        const newFilterOptions = {...filterOptions, "priceFrom": priceFrom, "priceTo": priceTo};
        onFilterChanged(newFilterOptions);
    }

    // productName
    const handleFilterChanged = (filterName, filterValue) => {
        const newFilterOptions = {...filterOptions, [filterName]: filterValue};
        onFilterChanged(newFilterOptions);
    }

    // city, category
    const handleFilterMultipleOptionsChanged = (filterName, filterValues) => {
        const newFilterOptions = {...filterOptions};
        newFilterOptions[filterName] = filterValues;

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
            return value === null || value.toString() === '' || key === 'filterName';
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
                                              labelFrom="Price From"
                                              labelTo="Price To"
                                              getRangeFrom={10}
                                              getRangeTo={100}
                                              // getRangeFrom={filterOptions.priceFrom}
                                              // getRangeTo={filterOptions.priceTo}
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
                        // getElementsNames={filterOptions.cityName}
                        getElementsNames={"cityname"}
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
                            // getElementsNames={filterOptions.categoryName}
                            getElementsNames={"categoryName"}
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

        </>
    );
};

export default FilteringComponent;
