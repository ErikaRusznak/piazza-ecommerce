package com.ozius.internship.project.dto;

import lombok.Data;

@Data
public class CommentDTO {

    private UserAccountDto account;
    private String content;
}
