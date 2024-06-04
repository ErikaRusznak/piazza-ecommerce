package com.ozius.internship.project.entity.chat;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(name = ChatNotification.TABLE_NAME)
public class ChatNotification {

    public static final String TABLE_NAME = "chat_notification";

    interface Columns{
        String ID = "ID";
        String CONTENT = "CONTENT";
        String SENDER_ID = "SENDER_ID";
        String RECIPIENT_ID = "RECIPIENT_ID";
    }

    @Id
    @Column(name = Columns.ID)
    private long id;

    @Column(name = Columns.CONTENT, nullable = false)
    private String content;

    @Column(name = Columns.SENDER_ID, nullable = false)
    private long senderId;

    @Column(name = Columns.RECIPIENT_ID, nullable = false)
    private long recipientId;

    protected ChatNotification(){
    }

    public ChatNotification(long id, String content, long senderId, long recipientId) {
        this.id = id;
        this.content = content;
        this.senderId = senderId;
        this.recipientId = recipientId;
    }
}
