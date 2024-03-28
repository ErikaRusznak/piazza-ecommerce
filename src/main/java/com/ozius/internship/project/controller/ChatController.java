package com.ozius.internship.project.controller;

import com.ozius.internship.project.entity.chat.ChatMessage;
import com.ozius.internship.project.entity.chat.ChatNotification;
import com.ozius.internship.project.entity.chat.ChatRoom;
import com.ozius.internship.project.repository.ChatRoomRepository;
import com.ozius.internship.project.service.ChatMessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ChatController {

    private final ChatMessageService chatMessageService;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final ChatRoomRepository chatRoomRepository;

    public ChatController(ChatMessageService chatMessageService, SimpMessagingTemplate simpMessagingTemplate, ChatRoomRepository chatRoomRepository) {
        this.chatMessageService = chatMessageService;
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.chatRoomRepository = chatRoomRepository;
    }

    @MessageMapping("/chat")
    public void processMessage(@Payload ChatMessage chatMessage) {
        ChatMessage savedMessage = chatMessageService.saveChatMessage(
                chatMessage.getChatRoom().getSender().getId(),
                chatMessage.getChatRoom().getReceiver().getId(),
                chatMessage.getContent(),
                chatMessage.getDate());
        ChatRoom existingRoom = chatRoomRepository.findBySender_IdAndReceiver_Id(chatMessage.getChatRoom().getSender().getId(), chatMessage.getChatRoom().getReceiver().getId());
        // john/queue/messages
        simpMessagingTemplate.convertAndSendToUser(Long.toString(existingRoom.getReceiver().getId()),
                "/queue/message",
                new ChatNotification(existingRoom, savedMessage.getContent())
        );
    }

    @GetMapping("/messages/{senderId}/{receiverId}")
    public ResponseEntity<List<ChatMessage>> findChatMessages(@PathVariable("senderId") long senderId,
                                                              @PathVariable("receiverId") long receiverId) {

        List<ChatMessage> chatMessages = chatMessageService.findChatMessages(senderId, receiverId);
        return ResponseEntity.ok(chatMessages);
    }


}
