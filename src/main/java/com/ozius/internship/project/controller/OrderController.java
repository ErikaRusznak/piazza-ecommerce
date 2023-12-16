package com.ozius.internship.project.controller;

import com.ozius.internship.project.dto.FullOrderDTO;
import com.ozius.internship.project.dto.OrderFromCartItemsDTO;
import com.ozius.internship.project.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/fullOrder/{id}")
    @PreAuthorize("hasRole('CLIENT') and @orderService.canAccessOrder(authentication.name, #id)")
    public ResponseEntity<FullOrderDTO> getFullOrderById(@PathVariable long id) {
        FullOrderDTO fullOrderDTO = orderService.getFullOrderById(id);
        return ResponseEntity.ok(fullOrderDTO);
    }
}
