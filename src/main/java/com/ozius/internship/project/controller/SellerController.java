package com.ozius.internship.project.controller;

import com.ozius.internship.project.dto.SellerDTO;
import com.ozius.internship.project.entity.seller.LegalDetails;
import com.ozius.internship.project.entity.user.Address;
import com.ozius.internship.project.service.SellerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/sellerAlias/{alias}")
    private ResponseEntity<SellerDTO> getSellerByAlias(@PathVariable String alias) {
        SellerDTO sellerDTO = sellerService.getSellerByAlias(alias);
        return ResponseEntity.ok(sellerDTO);
    }

    @GetMapping("/sellers")
    private ResponseEntity<List<SellerDTO>> getSellers() {
        List<SellerDTO> sellers = sellerService.getAllSellers();
        return ResponseEntity.ok(sellers);
    }

    @PutMapping("/seller/legal-details/{id}")
    public ResponseEntity<Void> updateSellerLegalDetails(
            @PathVariable long id,
            @RequestBody LegalDetails legalDetails
    ) {
        sellerService.updateSellerLegalDetails(id, legalDetails);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/seller/legal-address/{id}")
    public ResponseEntity<Void> updateSellerLegalAddress(@PathVariable long id, @RequestBody Address legalAddress) {
        sellerService.updateSellerAddress(id, legalAddress);
        return ResponseEntity.ok().build();
    }
}
