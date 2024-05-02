package com.ozius.internship.project.dto;

import lombok.Data;
import org.apache.logging.log4j.util.Strings;

@Data
public class GroupChatDTO {
    protected long id;
    protected String groupRoomCode;
    protected long buyerId;
    protected String buyerFirstName;
    protected String buyerLastName;
    protected String buyerEmail;
    protected long courierId;
    protected String courierFirstName;
    protected String courierLastName;
    protected String courierEmail;
    protected long sellerId;
    protected String sellerFirstName;
    protected String sellerLastName;
    protected String sellerEmail;
    protected long orderId;

}
