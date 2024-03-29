package com.ozius.internship.project.entity.chat;

import com.ozius.internship.project.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = ChatMessage.TABLE_NAME)
public class ChatMessage extends BaseEntity {

    public static final String TABLE_NAME = "chat_message";

    interface Columns {
        String CHAT_ROOM_CODE = "CHAT_ROOM_CODE";
        String CONTENT = "CONTENT";
        String DATE = "DATE";
    }


    @ManyToOne(fetch = FetchType.LAZY)
    @Setter
//    @JoinColumn(name = Columns.CHAT_ROOM_CODE, foreignKey = @ForeignKey(foreignKeyDefinition = "FOREIGN KEY (" + Columns.CHAT_ROOM_CODE + ") REFERENCES " + ChatRoom.TABLE_NAME + " (" + ChatRoom.Columns.CHAT_ROOM_CODE + ") ON DELETE CASCADE"))
    @JoinColumn(name = Columns.CHAT_ROOM_CODE)
    private ChatRoom chatRoom;

    @Column(name = Columns.CONTENT, nullable = false)
    private String content;

    @Column(name = Columns.DATE, nullable = false)
    private LocalDateTime date;

    protected ChatMessage() {
    }

    public ChatMessage(ChatRoom chatRoom, String content) {
        this.chatRoom = chatRoom;
        this.content = content;
        this.date = LocalDateTime.now();
    }

    public long getSenderId() {
        return this.chatRoom.getSender().getId();
    }
    public long getReceiverId() {
        return this.chatRoom.getReceiver().getId();
    }
}
