package com.ozius.internship.project.dto;

import com.ozius.internship.project.entity.user.UserRole;
import lombok.Data;

@Data
public class SimpleSellerDTO {
    protected long id;
    private String firstName;
    private String lastName;
    private String email;
    private String imageName;
    private String telephone;
    private UserRole userRole;
    private String sellerAlias;
}
