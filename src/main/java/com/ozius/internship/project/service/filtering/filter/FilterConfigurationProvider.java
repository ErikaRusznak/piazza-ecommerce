package com.ozius.internship.project.service.filtering.filter;

import com.ozius.internship.project.service.filtering.filter.converter.CapitalizeConverter;
import com.ozius.internship.project.service.filtering.filter.converter.FilterConfiguration;
import com.ozius.internship.project.service.filtering.filter.converter.NoTransformationConverter;
import com.ozius.internship.project.service.filtering.filter.converter.OrderStatusConverter;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class FilterConfigurationProvider {

    private final Map<String, FilterConfiguration<?>> filterConfigurationMap = new HashMap<>();

    public FilterConfigurationProvider() {
        mapCriteriaToFormatInDataBase("productName", new FilterConfiguration<>(Operation.STARTS_WITH, new CapitalizeConverter()));
        mapCriteriaToFormatInDataBase("categoryName", new FilterConfiguration<>(Operation.EQ, new NoTransformationConverter()));
        mapCriteriaToFormatInDataBase("cityName", new FilterConfiguration<>(Operation.EQ, value -> value));
        mapCriteriaToFormatInDataBase("orderStatus", new FilterConfiguration<>(Operation.EQ, new OrderStatusConverter()));
        mapCriteriaToFormatInDataBase("priceFrom", new FilterConfiguration<>(Operation.GTE, new NoTransformationConverter()));
        mapCriteriaToFormatInDataBase("priceTo", new FilterConfiguration<>(Operation.LTE, new NoTransformationConverter()));
        mapCriteriaToFormatInDataBase("sellerAlias", new FilterConfiguration<>(Operation.EQ, value -> value));
    }

    public FilterConfiguration<?> getConfigurationForFilter(String filter){
        return filterConfigurationMap.get(filter);
    }

    private void mapCriteriaToFormatInDataBase(String criteria, FilterConfiguration<?> filterConfiguration) {
        filterConfigurationMap.put(criteria, filterConfiguration);
    }
}