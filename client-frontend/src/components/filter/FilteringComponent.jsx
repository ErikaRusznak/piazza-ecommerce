import React, { useState } from 'react';
import FilterAndSortingItem from './FilterAndSortingItem';
import PriceFilterComponent from './PriceFilterComponent';
import CityFilterComponent from './CityFilterComponent';
import CategoryFilterComponent from './CategoryFilterComponent';
import SortFilterComponent from './SortFilterComponent';

const FilteringComponent = () => {
    const [openFilter, setOpenFilter] = useState(null);

    const handleFilterClick = (filter) => {
        if (openFilter === filter) {
            setOpenFilter(null); // same filter clicked again
        } else {
            setOpenFilter(filter);
        }
    };

    return (
        <div>
            <div className="flex items-center">
                <div className="sm:hidden flex gap-4">
                    <FilterAndSortingItem
                        label="Price"
                        isOpen={openFilter === 'Price'}
                        onClick={() => handleFilterClick('Price')}
                    >
                        <PriceFilterComponent />
                    </FilterAndSortingItem>

                    <FilterAndSortingItem
                        label="City"
                        isOpen={openFilter === 'City'}
                        onClick={() => handleFilterClick('City')}
                    >
                        <CityFilterComponent />
                    </FilterAndSortingItem>

                    <FilterAndSortingItem
                        label="Category"
                        isOpen={openFilter === 'Category'}
                        onClick={() => handleFilterClick('Category')}
                    >
                        <CategoryFilterComponent />
                    </FilterAndSortingItem>

                    <FilterAndSortingItem
                        label="Sort By"
                        isOpen={openFilter === 'Sort'}
                        onClick={() => handleFilterClick('Sort')}
                    >
                        <SortFilterComponent />
                    </FilterAndSortingItem>
                </div>
            </div>
        </div>
    );
};

export default FilteringComponent;
