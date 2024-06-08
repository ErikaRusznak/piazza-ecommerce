package com.ozius.internship.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatNotificationDTO {
    private long id;
    private String content;
    private long senderId;
    private long recipientId;

}
