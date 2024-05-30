package com.ozius.internship.project.dto;

import com.ozius.internship.project.entity.seller.CompanyType;
import com.ozius.internship.project.entity.seller.SellerType;
import com.ozius.internship.project.entity.user.UserRole;
import com.ozius.internship.project.security.password.ValidPassword;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class RegisterSellerDTO {

    private long id;
    private SellerType sellerType;
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
    private String alias;
    private String country;
    private String state;
    private String city;
    private String addressLine1;
    private String addressLine2;
    private String zipCode;
    private String companyName;
    private String cui;
    private CompanyType companyType;
    private LocalDate dateOfRegistration;
    private int numericCodeByState;
    private int serialNumber;
    private String reason;
}
