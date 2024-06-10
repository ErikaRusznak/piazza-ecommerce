package com.ozius.internship.project.service.filtering.transformers;

public interface ResultTransformer<I,O> {
    O transform(I input);
}
