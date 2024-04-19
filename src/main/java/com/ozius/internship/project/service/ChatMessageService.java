package com.ozius.internship.project.service;

import com.ozius.internship.project.entity.chat.ChatMessage;
import com.ozius.internship.project.entity.chat.ChatRoom;
import com.ozius.internship.project.repository.ChatMessageRepository;
import com.ozius.internship.project.repository.ChatRoomRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomService chatRoomService;
    private final ChatRoomRepository chatRoomRepository;

    public ChatMessageService(ChatMessageRepository chatMessageRepository, ChatRoomService chatRoomService, ChatRoomRepository chatRoomRepository) {
        this.chatMessageRepository = chatMessageRepository;
        this.chatRoomService = chatRoomService;
        this.chatRoomRepository = chatRoomRepository;
    }

    @Transactional
    public ChatMessage saveChatMessage(long senderId, long recipientId, String content) {
        String chatRoomCode = chatRoomService.getChatRoomCode(senderId, recipientId, true)
                .orElseThrow(() -> new IllegalStateException("Chat room code not found"));

        ChatRoom cr = chatRoomRepository.findByChatRoomCodeAndSenderAndRecipient(senderId, recipientId, chatRoomCode)
                .orElseThrow(() -> new IllegalStateException("Chat room not found"));

        ChatMessage chatMessage = new ChatMessage(cr, content);
        chatMessageRepository.save(chatMessage);

        return chatMessage;
    }

    @Transactional
    public List<ChatMessage> findChatMessages(long senderId, long recipientId) {
        var chatRoomCodeOptional = chatRoomService.getChatRoomCode(senderId, recipientId, false);
        if (chatRoomCodeOptional.isPresent()) {
            String chatRoomCode = chatRoomCodeOptional.get();
            List<ChatMessage> chatMessages = chatMessageRepository.findAllByChatRoomCode(chatRoomCode);

            return chatMessages.isEmpty() ? Collections.emptyList() : chatMessages;
        } else {
            return Collections.emptyList();
        }
    }

    @Transactional
    public void markChatAsRead(long senderId, long recipientId) {
        var chatRoomCodeOptional = chatRoomService.getChatRoomCode(senderId, recipientId, false);
        if (chatRoomCodeOptional.isPresent()) {
            String chatRoomCode = chatRoomCodeOptional.get();
            List<ChatMessage> chatMessages = chatMessageRepository.findAllByChatRoomCode(chatRoomCode);
            chatMessages.forEach(message -> message.setRead(true));
        }
    }

}
