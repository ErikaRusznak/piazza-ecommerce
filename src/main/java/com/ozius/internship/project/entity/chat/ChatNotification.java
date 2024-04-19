package com.ozius.internship.project.entity.chat;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(name = ChatNotification.TABLE_NAME)
public class ChatNotification {

    public static final String TABLE_NAME = "chat_notification";

    interface Columns{
//        String CHAT_ROOM_CODE = "CHAT_ROOM_CODE";
        String ID = "ID";
        String CONTENT = "CONTENT";
        String SENDER_ID = "SENDER_ID";
        String RECIPIENT_ID = "RECIPIENT_ID";
    }


//    @ManyToOne(fetch = FetchType.LAZY)
//    @Setter
////    @JoinColumn(name = Columns.CHAT_ROOM_CODE, foreignKey = @ForeignKey(foreignKeyDefinition = "FOREIGN KEY (" + Columns.CHAT_ROOM_CODE + ") REFERENCES " + ChatRoom.TABLE_NAME + " (" + ChatRoom.Columns.CHAT_ROOM_CODE + ") ON DELETE SET NULL"))
//    @JoinColumn(name = Columns.CHAT_ROOM_CODE, nullable = false)
//    private ChatRoom chatRoom;

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
