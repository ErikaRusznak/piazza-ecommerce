package com.ozius.internship.project.dto;

import lombok.Data;

@Data
public class CategoryDTO {
    private long id;
    private String name;

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
