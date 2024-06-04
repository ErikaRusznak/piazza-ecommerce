package com.ozius.internship.project.controller;

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

    public int getPage() {
        return page;
    }

    public int getItemsPerPage() {
        return itemsPerPage;
    }

    public T getData() {
        return data;
    }

    public int getNumberOfElements() {
        return numberOfElements;
    }

}