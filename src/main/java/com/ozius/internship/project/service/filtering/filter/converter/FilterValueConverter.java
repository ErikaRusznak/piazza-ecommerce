package com.ozius.internship.project.service.filtering.filter.converter;

public interface FilterValueConverter<O> {
    O convert(String value);
}