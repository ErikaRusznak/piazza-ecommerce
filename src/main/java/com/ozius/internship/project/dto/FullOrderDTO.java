package com.ozius.internship.project.dto;

import com.ozius.internship.project.entity.user.Address;
import lombok.Data;

import java.time.LocalDate;
import java.util.Set;

@Data
public class FullOrderDTO {
    private long id;
    private Set<OrderDTO> orders;
    private LocalDate publishDate;
    private String buyerEmail;
    private Address shippingAddress;
    private String orderNumber;
    private float totalPrice;
}
