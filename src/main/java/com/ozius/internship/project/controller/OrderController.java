package com.ozius.internship.project.controller;

import com.ozius.internship.project.dto.FullOrderDTO;
import com.ozius.internship.project.dto.OrderDTO;
import com.ozius.internship.project.dto.OrderFromCartItemsDTO;
import com.ozius.internship.project.dto.ReviewDTO;
import com.ozius.internship.project.entity.order.Order;
import com.ozius.internship.project.repository.OrderRepository;
import com.ozius.internship.project.service.OrderService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class OrderController {

    private final OrderService orderService;
    private final OrderRepository orderRepository;
    private final ModelMapper modelMapper;

    public OrderController(OrderService orderService, OrderRepository orderRepository, ModelMapper modelMapper) {
        this.orderService = orderService;
        this.orderRepository = orderRepository;
        this.modelMapper = modelMapper;
    }

    @PostMapping("/orders")
    @PreAuthorize("hasRole('CLIENT') and #orderFromCartItemsDTO.email == authentication.name")
    public ResponseEntity<FullOrderDTO> makeOrders(@RequestBody OrderFromCartItemsDTO orderFromCartItemsDTO) {

        FullOrderDTO fullOrderDTO = orderService.makeOrdersFromCheckout(orderFromCartItemsDTO.getEmail(), orderFromCartItemsDTO.getShippingAddress(), orderFromCartItemsDTO.getProducts());
        return ResponseEntity.ok(fullOrderDTO);
    }

    @GetMapping("/fullOrder")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<List<FullOrderDTO>> getFullOrdersForBuyer(Principal principal) {
        String buyerEmail = principal.getName();
        List<FullOrderDTO> fullOrderDTOs = orderService.getFullOrdersForBuyerEmail(buyerEmail);
        return ResponseEntity.ok(fullOrderDTOs);
    }

    @GetMapping("/fullOrder/{id}")
    @PreAuthorize("hasRole('CLIENT') and @orderService.canAccessOrder(authentication.name, #id)")
    public ResponseEntity<FullOrderDTO> getFullOrderById(@PathVariable long id) {
        FullOrderDTO fullOrderDTO = orderService.getFullOrderById(id);
        return ResponseEntity.ok(fullOrderDTO);
    }

    @GetMapping("/orders/{sellerEmail}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<OrderDTO>> getOrdersBySellerAlias(@PathVariable String sellerEmail) {
        List<OrderDTO> orders = orderService.getAllOrdersForSeller(sellerEmail);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/order/{id}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable long id) {
        OrderDTO orderDTO = orderService.getOrderById(id);
        return ResponseEntity.ok(orderDTO);
    }

    @PutMapping("/orders/{id}/processing")
    @PreAuthorize("hasRole('ADMIN')")
    public void markOrderAsProcessing(@PathVariable long id) {
        orderService.markOrderAsProcessing(id);
    }

    @PutMapping("/orders/{id}/shipping")
    @PreAuthorize("hasRole('ADMIN')")
    public void markOrderAsShipping(@PathVariable long id) {
        orderService.markOrderAsShipping(id);
    }

    @PutMapping("/orders/{id}/delivered")
    @PreAuthorize("hasRole('ADMIN')")
    public void markOrderAsDelivered(@PathVariable long id) {
        orderService.markOrderAsDelivered(id);
    }

    @PutMapping("/orders/{id}/canceled")
    @PreAuthorize("hasRole('ADMIN')")
    public void markOrderAsCanceled(@PathVariable long id) {
        orderService.markOrderAsCanceled(id);
    }
}
