package com.ozius.internship.project.service;

import com.ozius.internship.project.dto.ChatRoomDTO;
import com.ozius.internship.project.entity.chat.ChatMessage;
import com.ozius.internship.project.entity.chat.ChatRoom;
import com.ozius.internship.project.repository.ChatMessageRepository;
import com.ozius.internship.project.repository.ChatRoomRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomService chatRoomService;
    private final ChatRoomRepository chatRoomRepository;
    private final ModelMapper modelMapper;

    public ChatMessageService(ChatMessageRepository chatMessageRepository, ChatRoomService chatRoomService, ChatRoomRepository chatRoomRepository, ModelMapper modelMapper) {
        this.chatMessageRepository = chatMessageRepository;
        this.chatRoomService = chatRoomService;
        this.chatRoomRepository = chatRoomRepository;
        this.modelMapper = modelMapper;
    }

    @Transactional
    public ChatMessage saveChatMessage(long senderId, long receiverId, String content) {
        String chatRoomCode = chatRoomService.getChatRoomCode(senderId, receiverId, true)
                .orElseThrow(() -> new IllegalStateException("Chat room code not found"));

        ChatRoom cr = chatRoomRepository.findAllByChatRoomCode(chatRoomCode)
                .stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("Chat room not found"));

        ChatMessage chatMessage = new ChatMessage(cr, content);
        chatMessageRepository.save(chatMessage);

        return chatMessage;
    }

    public List<ChatMessage> findChatMessages(long senderId, long receiverId) {
        var chatRoomCodeOptional = chatRoomService.getChatRoomCode(senderId, receiverId, false);
        if (chatRoomCodeOptional.isPresent()) {
            String chatRoomCode = chatRoomCodeOptional.get();
            List<ChatMessage> chatMessages = chatMessageRepository.findAllByChatRoomCode(chatRoomCode);
            return chatMessages.isEmpty() ? Collections.emptyList() : chatMessages;
        } else {
            return Collections.emptyList();
        }
    }

}
