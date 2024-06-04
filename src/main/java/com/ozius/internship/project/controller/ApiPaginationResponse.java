package com.ozius.internship.project.controller;

import lombok.Getter;

@Getter
public class ApiPaginationResponse<T> {

    private final int page;
    private final int itemsPerPage;
    private final T data;

    private final int numberOfElements;

    public ApiPaginationResponse(int page, int itemsPerPage, int numberOfElements, T data) {
        this.page = page;
        this.itemsPerPage = itemsPerPage;
        this.data = data;
        this.numberOfElements = numberOfElements;
    }

}
