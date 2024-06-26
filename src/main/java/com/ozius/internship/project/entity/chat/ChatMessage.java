package com.ozius.internship.project.entity.chat;

import com.ozius.internship.project.entity.BaseEntity;
import com.ozius.internship.project.entity.user.UserRole;
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
        String CHAT_ROOM_CODE = "CHAT_ROOM_ID";
        String GROUP_CHAT_ROOM_CODE = "GROUP_CHAT_ROOM_ID";
        String CONTENT = "CONTENT";
        String DATE = "DATE";
        String IS_READ = "IS_READ";
        String SENDER_ROLE = "SENDER_ROLE";
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @Setter
    @JoinColumn(name = Columns.CHAT_ROOM_CODE)
    private ChatRoom chatRoom;

    @ManyToOne(fetch = FetchType.LAZY)
    @Setter
    @JoinColumn(name = Columns.GROUP_CHAT_ROOM_CODE)
    private GroupChatRoom groupChatRoom;

    @Column(name = Columns.CONTENT, nullable = false)
    private String content;

    @Column(name = Columns.DATE, nullable = false)
    private LocalDateTime date;

    @Column(name = Columns.IS_READ, nullable = false)
    @Setter
    private boolean isRead;

    @Column(name = Columns.SENDER_ROLE)
    @Enumerated(EnumType.STRING)
    private UserRole senderRole;

    protected ChatMessage() {
    }

    public ChatMessage(ChatRoom chatRoom, String content) {
        this.chatRoom = chatRoom;
        this.content = content;
        this.date = LocalDateTime.now();
        this.isRead = false;
    }

    public ChatMessage(GroupChatRoom groupChatRoom, String content, UserRole senderRole) {
        this.groupChatRoom = groupChatRoom;
        this.content = content;
        this.date = LocalDateTime.now();
        this.isRead = false;
        this.senderRole = senderRole;
    }

    public long getSenderId() {
        if (this.senderRole == UserRole.CLIENT) {
            return this.groupChatRoom != null ? this.groupChatRoom.getBuyerId() : -1;
        } else if (this.senderRole == UserRole.SELLER) {
            return this.groupChatRoom != null ? this.groupChatRoom.getSellerId() : -1;
        } else if (this.senderRole == UserRole.COURIER) {
            return this.groupChatRoom != null ? this.groupChatRoom.getCourierId() : -1;
        } else {
            return this.chatRoom.getSender().getId();
        }
    }

    public long getRecipientId() {
        return this.chatRoom != null ? this.chatRoom.getRecipient().getId() : -1;
    }

    public long getBuyerId() {
        return this.groupChatRoom != null ? this.groupChatRoom.getBuyerId() : -1;
    }

    public long getCourierId() {
        return this.groupChatRoom != null ? this.groupChatRoom.getCourierId() : -1;
    }

    public long getSellerId() {
        return this.groupChatRoom != null ? this.groupChatRoom.getSellerId() : -1;
    }

    public long getOrderId() {
        return this.groupChatRoom != null ? this.groupChatRoom.getOrderId() : -1;
    }
}
