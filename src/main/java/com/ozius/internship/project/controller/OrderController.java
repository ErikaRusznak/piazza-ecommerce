package com.ozius.internship.project.controller;

import com.ozius.internship.project.dto.FullOrderDTO;
import com.ozius.internship.project.dto.OrderDTO;
import com.ozius.internship.project.dto.OrderFromCartItemsDTO;

import com.ozius.internship.project.service.OrderService;
import com.ozius.internship.project.service.filtering.OrderPaginationSearchQuery;
import com.ozius.internship.project.service.filtering.filter.FilterSpecs;
import com.ozius.internship.project.service.filtering.sort.SortSpecs;
import jakarta.persistence.EntityManager;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;


@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;
    private final ModelMapper modelMapper;
    private final EntityManager entityManager;

    public OrderController(OrderService orderService, ModelMapper modelMapper, EntityManager entityManager) {
        this.orderService = orderService;
        this.modelMapper = modelMapper;
        this.entityManager = entityManager;
    }

    @PostMapping
    @PreAuthorize("hasRole('CLIENT') and #orderFromCartItemsDTO.email == authentication.name")
    public ResponseEntity<FullOrderDTO> makeOrders(@RequestBody OrderFromCartItemsDTO orderFromCartItemsDTO) {
        FullOrderDTO fullOrderDTO = orderService.makeOrdersFromCheckout(orderFromCartItemsDTO.getEmail(), orderFromCartItemsDTO.getShippingAddress(), orderFromCartItemsDTO.getProducts(), orderFromCartItemsDTO.getPaymentType());
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

    @GetMapping
    @PreAuthorize("hasRole('SELLER')")
    public ApiPaginationResponse<List<OrderDTO>> getOrdersByFilter(
            @RequestParam(name = "itemsPerPage", defaultValue = "10") int itemsPerPage,
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "filter", required = false) FilterSpecs filterSpecs,
            @RequestParam(name = "sort", required = false) SortSpecs sortSpecs
    ) {

        OrderPaginationSearchQuery query = new OrderPaginationSearchQuery(modelMapper, entityManager)
                .filterBy(filterSpecs)
                .orderBy(sortSpecs);

        int numOfTotalProds = query.getResultList().size();

        List<OrderDTO> orderDTOS = query.getPagingResultList(itemsPerPage, page-1);

        return new ApiPaginationResponse<>(page, itemsPerPage, numOfTotalProds, orderDTOS);
    }
//    http://localhost:8080/orders-try?filter=%5B%22orderStatus%5Beq%5DPENDING%22%2C%22sellerAlias%5Beq%5DMega%20Fresh%22%5D


    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable long id) {
        OrderDTO orderDTO = orderService.getOrderById(id);
        return ResponseEntity.ok(orderDTO);
    }

    @PutMapping("/{id}/processing")
    @PreAuthorize("hasRole('SELLER')")
    public void markOrderAsProcessing(@PathVariable long id) {
        orderService.markOrderAsProcessing(id);
    }

    @PutMapping("/{id}/ready-to-ship")
    @PreAuthorize("hasRole('SELLER')")
    public void markOrderAsReadyToShip(@PathVariable long id) {
        orderService.markOrderAsReadyToShip(id);
    }

    @PutMapping("/{id}/shipping")
    @PreAuthorize("hasRole('COURIER')")
    public void markOrderAsShipping(@PathVariable long id) {
        orderService.markOrderAsShipping(id);
    }

    @PutMapping("/{id}/delivered")
    @PreAuthorize("hasRole('COURIER')")
    public void markOrderAsDelivered(@PathVariable long id) {
        orderService.markOrderAsDelivered(id);
    }

    @PutMapping("/{id}/canceled")
    @PreAuthorize("hasRole('SELLER')")
    public void markOrderAsCanceled(@PathVariable long id) {
        orderService.markOrderAsCanceled(id);
    }

    @GetMapping("/email/{courierEmail}")
    @PreAuthorize("hasRole('COURIER')")
    public ResponseEntity<List<OrderDTO>> getOrdersByCourierEmail(@PathVariable String courierEmail) {
        List<OrderDTO> orderDTOS = orderService.getOrdersByCourier(courierEmail);
        return ResponseEntity.ok(orderDTOS);
    }
}
