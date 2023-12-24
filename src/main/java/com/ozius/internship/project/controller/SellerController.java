package com.ozius.internship.project.controller;

import com.ozius.internship.project.dto.SellerDTO;
import com.ozius.internship.project.service.SellerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SellerController {

    private final SellerService sellerService;

    public SellerController(SellerService service) {
        this.sellerService = service;
    }

    @GetMapping("/seller/{email}")
    private ResponseEntity<SellerDTO> getSellerByEmail(@PathVariable String email) {
        SellerDTO sellerDTO = sellerService.getSellerByEmail(email);
        return ResponseEntity.ok(sellerDTO);
    }
}
