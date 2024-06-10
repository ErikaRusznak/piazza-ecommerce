package com.ozius.internship.project.service.filtering.filter.converter;

public class NoTransformationConverter implements FilterValueConverter<String>{
    @Override
    public String convert(String value) {
        return value;
    }
}
