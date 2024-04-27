package com.ozius.internship.project.dto;

import lombok.Data;

@Data
public class GroupChatDTO {
    protected long id;
    protected String groupRoomCode;
    protected String buyerFirstName;
    protected String buyerLastName;
    protected String buyerEmail;
    protected String courierFirstName;
    protected String courierLastName;
    protected String courierEmail;
    protected String sellerFirstName;
    protected String sellerLastName;
    protected String sellerEmail;
    protected String orderNumber;

}
