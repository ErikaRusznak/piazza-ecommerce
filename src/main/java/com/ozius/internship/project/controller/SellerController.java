package com.ozius.internship.project.controller;

import com.ozius.internship.project.dto.SellerDTO;
import com.ozius.internship.project.entity.user.Address;
import com.ozius.internship.project.service.SellerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sellers")
public class SellerController {

    private final SellerService sellerService;

    public SellerController(SellerService service) {
        this.sellerService = service;
    }

    @GetMapping("/{id}")
    private ResponseEntity<SellerDTO> getSellerById(@PathVariable long id) {
        SellerDTO sellerDTO = sellerService.getSellerById(id);
        return ResponseEntity.ok(sellerDTO);
    }

    @GetMapping("/sellerAlias/{alias}")
    private ResponseEntity<SellerDTO> getSellerByAlias(@PathVariable String alias) {
        SellerDTO sellerDTO = sellerService.getSellerByAlias(alias);
        return ResponseEntity.ok(sellerDTO);
    }

    @GetMapping
    private ResponseEntity<List<SellerDTO>> getSellers() {
        List<SellerDTO> sellers = sellerService.getAllSellers();
        return ResponseEntity.ok(sellers);
    }

    @PutMapping("/legal-address/{id}")
    public ResponseEntity<Void> updateSellerLegalAddress(@PathVariable long id, @RequestBody Address legalAddress) {
        sellerService.updateSellerAddress(id, legalAddress);
        return ResponseEntity.ok().build();
    }
}
