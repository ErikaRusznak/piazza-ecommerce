package com.ozius.internship.project.dto;

import lombok.Data;

@Data
public class ReportDTO {
    private CommentDTO commentDTO;
    private ReviewDTO reviewDTO;
    private String reason;
}
