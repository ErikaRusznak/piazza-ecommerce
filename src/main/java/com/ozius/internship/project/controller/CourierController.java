package com.ozius.internship.project.controller;

import com.ozius.internship.project.dto.CourierDTO;
import com.ozius.internship.project.service.CourierService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/courier")
public class CourierController {

    private final CourierService courierService;

    public CourierController(CourierService courierService) {
        this.courierService = courierService;
    }

    @GetMapping("/{email}")
    public ResponseEntity<CourierDTO> getCourierByEmailDTO(@PathVariable String email) {
        CourierDTO courierDTO = courierService.getCourierByEmailDTO(email);
        return ResponseEntity.ok(courierDTO);
    }
}
