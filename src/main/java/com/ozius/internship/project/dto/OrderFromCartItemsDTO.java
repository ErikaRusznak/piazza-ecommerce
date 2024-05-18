package com.ozius.internship.project.dto;

import com.ozius.internship.project.entity.order.PaymentType;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class OrderFromCartItemsDTO {
    private BuyerAddressDto shippingAddress;
    private List<CheckoutItemDto> products;
    private String email;
    private PaymentType paymentType;
}
