package com.ozius.internship.project.dto;

import lombok.Data;

@Data
public class SellerDTO {
    private long id;
    private String alias;

    public long getId() {
        return id;
    }

    public String getAlias() {
        return alias;
    }
}
