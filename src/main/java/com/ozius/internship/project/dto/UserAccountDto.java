package com.ozius.internship.project.dto;

import com.ozius.internship.project.entity.user.UserRole;
import com.ozius.internship.project.security.password.ValidPassword;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserAccountDto {
    protected long id;
    private String firstName;
    private String lastName;
    private String email;
    private String imageName;
    private String telephone;
    private UserRole userRole;
    @ValidPassword
    @NotBlank
    @NotNull
    private String password;
}
