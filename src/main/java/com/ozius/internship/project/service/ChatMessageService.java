package com.ozius.internship.project.service;

import com.ozius.internship.project.dto.GroupChatDTO;
import com.ozius.internship.project.entity.chat.ChatMessage;
import com.ozius.internship.project.entity.chat.ChatRoom;
import com.ozius.internship.project.entity.chat.GroupChatRoom;
import com.ozius.internship.project.repository.ChatMessageRepository;
import com.ozius.internship.project.repository.ChatRoomRepository;
import com.ozius.internship.project.repository.GroupChatRoomRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomService chatRoomService;
    private final ChatRoomRepository chatRoomRepository;
    private final GroupChatRoomRepository groupChatRoomRepository;
    private final GroupChatRoomService groupChatRoomService;;

    public ChatMessageService(ChatMessageRepository chatMessageRepository, ChatRoomService chatRoomService, ChatRoomRepository chatRoomRepository, GroupChatRoomRepository groupChatRoomRepository, GroupChatRoomService groupChatRoomService) {
        this.chatMessageRepository = chatMessageRepository;
        this.chatRoomService = chatRoomService;
        this.chatRoomRepository = chatRoomRepository;
        this.groupChatRoomRepository = groupChatRoomRepository;
        this.groupChatRoomService = groupChatRoomService;
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
    public ChatMessage saveChatMessageForGroupChat(long buyerId, long courierId, long sellerId, long orderId, String content) {
        String chatRoomCode = groupChatRoomService.getGroupChatRoomCode(buyerId, courierId, sellerId, orderId, true)
                .orElseThrow(() -> new IllegalStateException("Group chat room code not found"));

        GroupChatRoom cr = groupChatRoomRepository.findByGroupRoomCode(chatRoomCode);

        if(cr == null) {
            throw new IllegalStateException("Group chat room not found");
        }
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
    public List<ChatMessage> findChatMessagesForGroupChat(long buyerId, long courierId, long sellerId, long orderId) {
        var groupChatCodeOptional = groupChatRoomService.getGroupChatRoomCode(buyerId, courierId, sellerId, orderId, false);
        if(groupChatCodeOptional.isPresent()) {
            String groupChatRoomCode = groupChatCodeOptional.get();
            List<ChatMessage> chatMessages = chatMessageRepository.findAllByGroupChatRoomCode(groupChatRoomCode);

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
