package com.ozius.internship.project.entity.chat;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(name = GroupChatNotification.TABLE_NAME)
public class GroupChatNotification {

    public static final String TABLE_NAME = "group_chat_notification";

    interface Columns{
        String ID = "ID";
        String CONTENT = "CONTENT";
        String BUYER_ID = "BUYER_ID";
        String COURIER_ID = "COURIER_ID";
        String SELLER_ID = "SELLER_ID";
    }

    @Id
    @Column(name = Columns.ID)
    private long id;

    @Column(name = Columns.CONTENT, nullable = false)
    private String content;

    @Column(name = Columns.BUYER_ID, nullable = false)
    private long buyerId;

    @Column(name = Columns.COURIER_ID, nullable = false)
    private long courierId;

    @Column(name = Columns.SELLER_ID, nullable = false)
    private long sellerId;

    protected GroupChatNotification(){
    }

    public GroupChatNotification(long id, String content, long buyerId, long courierId, long sellerId) {
        this.id = id;
        this.content = content;
        this.buyerId = buyerId;
        this.courierId = courierId;
        this.sellerId = sellerId;
    }

}
