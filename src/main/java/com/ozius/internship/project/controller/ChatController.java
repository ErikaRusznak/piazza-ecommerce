package com.ozius.internship.project.controller;

import com.ozius.internship.project.dto.ChatMessageDTO;
import com.ozius.internship.project.entity.chat.ChatMessage;
import com.ozius.internship.project.entity.chat.ChatNotification;
import com.ozius.internship.project.entity.chat.ChatRoom;
import com.ozius.internship.project.repository.ChatRoomRepository;
import com.ozius.internship.project.service.ChatMessageService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class ChatController {

    private final ChatMessageService chatMessageService;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final ChatRoomRepository chatRoomRepository;
    private final ModelMapper modelMapper;

    public ChatController(ChatMessageService chatMessageService, SimpMessagingTemplate simpMessagingTemplate, ChatRoomRepository chatRoomRepository, ModelMapper modelMapper) {
        this.chatMessageService = chatMessageService;
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.chatRoomRepository = chatRoomRepository;
        this.modelMapper = modelMapper;
    }

    @MessageMapping("/chat")
    public void processMessage(@Payload ChatMessageDTO chatMessageDTO) {
        ChatMessage savedMessage = chatMessageService.saveChatMessage(
                chatMessageDTO.getSenderId(),
                chatMessageDTO.getReceiverId(),
                chatMessageDTO.getContent());
        ChatRoom existingRoom = chatRoomRepository.findBySender_IdAndReceiver_Id(
                chatMessageDTO.getSenderId(),
                chatMessageDTO.getReceiverId());

        // john/queue/messages
        simpMessagingTemplate.convertAndSendToUser(Long.toString(existingRoom.getReceiver().getId()),
                "/queue/message",
                new ChatNotification(existingRoom, savedMessage.getContent())
        );
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
