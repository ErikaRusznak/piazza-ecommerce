package com.ozius.internship.project.entity.chat;

import com.ozius.internship.project.entity.BaseEntity;
import com.ozius.internship.project.entity.user.UserAccount;
import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
@Table(name = UserAccount.TABLE_NAME)
public class ChatRoom extends BaseEntity {

    public static final String TABLE_NAME = "chat_room";

    interface Columns{
        String CHAT_ROOM_CODE = "CHAT_ROOM_CODE";
        String SENDER_ID = "SENDER_ID";
        String RECEIVER_ID = "RECEIVER_ID";
    }

    @Column(name = Columns.CHAT_ROOM_CODE, nullable = false)
    private String chatRoomCode;

//    @ManyToOne(fetch = FetchType.LAZY)
////    @JoinColumn(name = Columns.SENDER_ID, foreignKey = @ForeignKey(foreignKeyDefinition = "FOREIGN KEY (" + Columns.SENDER_ID + ") REFERENCES " + UserAccount.TABLE_NAME + " (" + BaseEntity.ID + ") ON DELETE SET NULL"))
//    @JoinColumn(name = Columns.SENDER_ID, nullable = false)
//    private UserAccount sender;
//
//    @ManyToOne(fetch = FetchType.LAZY)
////    @JoinColumn(name = Columns.RECEIVER_ID, foreignKey = @ForeignKey(foreignKeyDefinition = "FOREIGN KEY (" + Columns.RECEIVER_ID + ") REFERENCES " + UserAccount.TABLE_NAME + " (" + BaseEntity.ID + ") ON DELETE SET NULL"))
//    @JoinColumn(name = Columns.RECEIVER_ID, nullable = false)
//    private UserAccount receiver;

    protected ChatRoom() {

    }

    public ChatRoom(String chatRoomCode) {
        this.chatRoomCode = chatRoomCode;
//        this.sender = sender;
//        this.receiver = receiver;
    }

    @Override
    public String toString() {
        return "ChatRoom{" +
                "chatId='" + chatRoomCode + '\'' +
//                ", sender=" + sender.getEmail() +
//                ", receiver=" + receiver.getEmail() +
                '}';
    }
}
