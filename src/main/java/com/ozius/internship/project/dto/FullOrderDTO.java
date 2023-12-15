package com.ozius.internship.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.util.Set;

@Data
public class FullOrderDTO {

    private Set<OrderDTO> orders;
    private LocalDate publishDate;
}
