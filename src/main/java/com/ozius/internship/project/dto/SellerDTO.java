package com.ozius.internship.project.dto;

import com.ozius.internship.project.entity.seller.CompanyType;
import com.ozius.internship.project.entity.seller.SellerType;
import lombok.Data;

@Data
public class SellerDTO {
    private long id;
    private SellerType sellerType;
    private UserAccountDto account;
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

}
