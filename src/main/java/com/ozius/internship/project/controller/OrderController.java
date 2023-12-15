package com.ozius.internship.project.controller;

import com.ozius.internship.project.dto.FullOrderDTO;
import com.ozius.internship.project.dto.OrderFromCartItemsDTO;
import com.ozius.internship.project.entity.order.FullOrder;
import com.ozius.internship.project.entity.order.Order;
import com.ozius.internship.project.entity.seller.Seller;
import com.ozius.internship.project.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/order")
    @PreAuthorize("hasRole('CLIENT') and #orderFromCartItemsDTO.email == authentication.name")
    public ResponseEntity<FullOrderDTO> makeOrders(@RequestBody OrderFromCartItemsDTO orderFromCartItemsDTO) {

        FullOrderDTO fullOrderDTO = orderService.makeOrdersFromCheckout(orderFromCartItemsDTO.getEmail(), orderFromCartItemsDTO.getShippingAddress(), orderFromCartItemsDTO.getProducts());
        return ResponseEntity.ok(fullOrderDTO);
    }
}
