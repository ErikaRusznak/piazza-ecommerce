package com.ozius.internship.project.dto;

import lombok.Data;

@Data
public class ChatMessageDTO {

    protected String content;
    protected long senderId;
    protected long receiverId;
}
