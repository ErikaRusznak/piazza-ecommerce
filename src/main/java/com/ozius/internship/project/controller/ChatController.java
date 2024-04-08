package com.ozius.internship.project.controller;

import com.ozius.internship.project.dto.ChatMessageDTO;
import com.ozius.internship.project.entity.chat.ChatMessage;
import com.ozius.internship.project.entity.chat.ChatNotification;
import com.ozius.internship.project.entity.chat.ChatRoom;
import com.ozius.internship.project.repository.ChatNotificationRepository;
import com.ozius.internship.project.repository.ChatRoomRepository;
import com.ozius.internship.project.service.ChatMessageService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class ChatController {

    private final ChatMessageService chatMessageService;
    private final SimpMessagingTemplate messagingTemplate;
    private final ChatNotificationRepository chatNotificationRepository;
    private final ModelMapper modelMapper;

    public ChatController(ChatMessageService chatMessageService, SimpMessagingTemplate messagingTemplate, ChatNotificationRepository chatNotificationRepository, ModelMapper modelMapper) {
        this.chatMessageService = chatMessageService;
        this.messagingTemplate = messagingTemplate;
        this.chatNotificationRepository = chatNotificationRepository;
        this.modelMapper = modelMapper;
    }

    @MessageMapping("/chat") // app/chat
    public void processMessage(@Payload ChatMessageDTO chatMessageDTO) {
        ChatMessage savedMessage = chatMessageService.saveChatMessage(
                chatMessageDTO.getSenderId(),
                chatMessageDTO.getReceiverId(),
                chatMessageDTO.getContent());

        ChatNotification cn = new ChatNotification(
                savedMessage.getId(),
                savedMessage.getContent(),
                savedMessage.getSenderId(),
                savedMessage.getReceiverId()
                );
//        chatNotificationRepository.save(cn);
        // john/queue/messages
        messagingTemplate.convertAndSendToUser(Long.toString(chatMessageDTO.getSenderId()),
                "/queue/message", cn);

    }

    @GetMapping("/messages/{senderId}/{receiverId}")
    public ResponseEntity<List<ChatMessageDTO>> findChatMessages(@PathVariable("senderId") long senderId,
                                                              @PathVariable("receiverId") long receiverId) {

        List<ChatMessage> chatMessages = chatMessageService.findChatMessages(senderId, receiverId);
        List<ChatMessageDTO> chatMessageDTOS = chatMessages.stream()
                .map(chatMessage -> modelMapper.map(chatMessage, ChatMessageDTO.class))
                .collect(Collectors.toList());

        return ResponseEntity.ok(chatMessageDTOS);
    }
}
