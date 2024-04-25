package com.ozius.internship.project.dto;

import lombok.Data;

@Data
public class CourierDTO {
    protected long id;
    private String firstName;
    private String lastName;
    private String imageName;
    private String telephone;
    private String email;
}
