package com.ozius.internship.project.dto;

import com.ozius.internship.project.entity.user.Address;
import com.ozius.internship.project.entity.order.OrderStatus;
import com.ozius.internship.project.entity.seller.LegalDetails;
import com.ozius.internship.project.entity.seller.SellerType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
    private long id;
    private OrderStatus orderStatus;
    private Address shippingAddress;
    private String sellerEmail;
    private String buyerFirstName;
    private String buyerLastName;
    private String buyerEmail;
    private String buyerTelephone;
    private LegalDetails legalDetails;
    private SellerType sellerType;
    private Set<OrderItemDTO> orderItems;
    private LocalDateTime orderDate;
    private float totalPrice;
    private String orderNumber;
}
