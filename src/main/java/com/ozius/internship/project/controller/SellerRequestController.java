package com.ozius.internship.project.controller;

import com.ozius.internship.project.entity.user.SellerRequest;
import com.ozius.internship.project.service.SellerRequestService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/seller-requests")
public class SellerRequestController {

    private final SellerRequestService sellerRequestService;

    public SellerRequestController(SellerRequestService sellerRequestService) {
        this.sellerRequestService = sellerRequestService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<SellerRequest>> getAllSellerRequests(@RequestParam int page, @RequestParam int itemsPerPage) {
        Page<SellerRequest> sellerRequests = sellerRequestService.getSellerRequests(page-1, itemsPerPage);
        return ResponseEntity.ok(sellerRequests);
    }

    @PutMapping("/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SellerRequest> approveSellerRequest(@PathVariable long id) {
        SellerRequest approvedSellerRequest = sellerRequestService.approveSellerRequest(id);
        return ResponseEntity.ok(approvedSellerRequest);
    }

    @PutMapping("/{id}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SellerRequest> rejectSellerRequest(@PathVariable long id) {
        SellerRequest approvedSellerRequest = sellerRequestService.rejectSellerRequest(id);
        return ResponseEntity.ok(approvedSellerRequest);
    }
}
