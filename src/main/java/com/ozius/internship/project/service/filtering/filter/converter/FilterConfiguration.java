package com.ozius.internship.project.service.filtering.filter.converter;

import com.ozius.internship.project.service.filtering.filter.Operation;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FilterConfiguration<T> {
    private Operation defaultOperation;
    private FilterValueConverter<T> filterValueConverter;
}