package com.ozius.internship.project.controller;

public class ApiResponse<T> {

    private final int numberOfElements;
    private final T data;

    public ApiResponse(int numberOfElements, T data) {
        this.numberOfElements = numberOfElements;
        this.data = data;
    }

    public int getNumberOfElements() {
        return numberOfElements;
    }

    public T getData() {
        return data;
    }
}