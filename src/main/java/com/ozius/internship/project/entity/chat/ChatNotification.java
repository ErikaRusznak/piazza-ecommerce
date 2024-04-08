package com.ozius.internship.project.entity.chat;

import com.ozius.internship.project.entity.BaseEntity;
import com.ozius.internship.project.entity.user.UserAccount;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

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
        String RECEIVER_ID = "RECEIVER_ID";
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

    @Column(name = Columns.RECEIVER_ID, nullable = false)
    private long receiverId;

    protected ChatNotification(){
    }

    public ChatNotification(long id, String content, long senderId, long receiverId) {
        this.id = id;
        this.content = content;
        this.senderId = senderId;
        this.receiverId = receiverId;
    }
}
