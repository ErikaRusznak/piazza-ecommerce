package com.ozius.internship.project.entity.chat;

import com.ozius.internship.project.entity.BaseEntity;
import com.ozius.internship.project.entity.user.UserAccount;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Table(name = UserAccount.TABLE_NAME)
public class ChatNotification extends BaseEntity {

    public static final String TABLE_NAME = "chat_notification";

    interface Columns{
        String CHAT_ROOM_CODE = "CHAT_ROOM_CODE";
        String CONTENT = "CONTENT";
    }


    @ManyToOne(fetch = FetchType.LAZY)
    @Setter
//    @JoinColumn(name = Columns.CHAT_ROOM_CODE, foreignKey = @ForeignKey(foreignKeyDefinition = "FOREIGN KEY (" + Columns.CHAT_ROOM_CODE + ") REFERENCES " + ChatRoom.TABLE_NAME + " (" + ChatRoom.Columns.CHAT_ROOM_CODE + ") ON DELETE SET NULL"))
    @JoinColumn(name = Columns.CHAT_ROOM_CODE, nullable = false)
    private ChatRoom chatRoom;

    @Column(name = Columns.CONTENT, nullable = false)
    private String content;

    protected ChatNotification(){
    }

    public ChatNotification(ChatRoom chatRoom, String content) {
        this.chatRoom = chatRoom;
        this.content = content;
    }
}
