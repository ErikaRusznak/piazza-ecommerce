package com.ozius.internship.project.dto;

import lombok.Data;

@Data
public class CommentDTO {
    private long id;
    private UserAccountDto account;
    private String content;
}
