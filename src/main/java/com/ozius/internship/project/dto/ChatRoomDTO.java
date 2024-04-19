package com.ozius.internship.project.dto;

import lombok.Data;

@Data
public class ChatRoomDTO {
    protected long id;
    protected String chatRoomCode;
    protected String senderFirstName;
    protected String senderLastName;
    protected String senderEmail;
    protected String recipientFirstName;
    protected String recipientLastName;
    protected String recipientEmail;
}
