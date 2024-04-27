package com.ozius.internship.project.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ChatMessageDTO {

    protected String content;
    protected long senderId;
    protected long recipientId;
    protected LocalDateTime date;
    protected boolean isRead;
    protected long buyerId;
    protected long courierId;
    protected long sellerId;
    protected long orderId;
}
