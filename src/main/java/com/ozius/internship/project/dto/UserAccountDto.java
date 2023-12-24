package com.ozius.internship.project.dto;

import com.ozius.internship.project.entity.UserStatus;
import lombok.Data;

@Data
public class UserAccountDto {
    private String firstName;
    private String lastName;
    private String email;
    private String imageName;
    private String telephone;
    private UserStatus userStatus;
}
