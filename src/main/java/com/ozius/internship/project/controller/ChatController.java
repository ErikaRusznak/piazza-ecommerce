package com.ozius.internship.project.controller;

import com.ozius.internship.project.dto.ChatMessageDTO;
import com.ozius.internship.project.entity.chat.ChatMessage;
import com.ozius.internship.project.entity.chat.ChatNotification;
import com.ozius.internship.project.repository.ChatNotificationRepository;
import com.ozius.internship.project.service.ChatMessageService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
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
                chatMessageDTO.getRecipientId(),
                chatMessageDTO.getContent());

        ChatNotification cn = new ChatNotification(
                savedMessage.getId(),
                savedMessage.getContent(),
                savedMessage.getSenderId(),
                savedMessage.getRecipientId()
                );
        chatNotificationRepository.save(cn);
//         john/queue/messages
        messagingTemplate.convertAndSendToUser(Long.toString(chatMessageDTO.getRecipientId()),
                "/queue/messages", cn);
    }

    @MessageMapping("/group-chat") // app/group-chat
    public void processMessageGroupChat(@Payload ChatMessageDTO chatMessageDTO) {
        ChatMessage savedMessage = chatMessageService.saveChatMessageForGroupChat(
                chatMessageDTO.getBuyerId(),
                chatMessageDTO.getCourierId(),
                chatMessageDTO.getSellerId(),
                chatMessageDTO.getOrderId(),
                chatMessageDTO.getContent()
                );
        broadcastGroupChatMessage(savedMessage);
    }

    private void broadcastGroupChatMessage(ChatMessage groupChatMessage) {
        // Retrieve all participants of the group chat
        List<Long> participantIds = Arrays.asList(
                groupChatMessage.getBuyerId(),
                groupChatMessage.getCourierId(),
                groupChatMessage.getSellerId()
        );

        // Broadcast the message to each participant
        for (Long participantId : participantIds) {
            messagingTemplate.convertAndSendToUser(
                    String.valueOf(participantId),
                    "/queue/group-messages",
                    groupChatMessage);
        }
    }

    @GetMapping("/messages/{senderId}/{recipientId}")
    public ResponseEntity<List<ChatMessageDTO>> findChatMessages(@PathVariable("senderId") long senderId,
                                                              @PathVariable("recipientId") long recipientId) {

        List<ChatMessage> chatMessages = chatMessageService.findChatMessages(senderId, recipientId);
        List<ChatMessageDTO> chatMessageDTOS = chatMessages.stream()
                .map(chatMessage -> modelMapper.map(chatMessage, ChatMessageDTO.class))
                .collect(Collectors.toList());

        return ResponseEntity.ok(chatMessageDTOS);
    }

    @GetMapping("/group-messages/{buyerId}/{courierId}/{sellerId}/{orderId}")
    public ResponseEntity<List<ChatMessageDTO>> findChatMessagesForGroupChat(
            @PathVariable("buyerId") long buyerId,
            @PathVariable("courierId") long courierId,
            @PathVariable("sellerId") long sellerId,
            @PathVariable("orderId") long orderId) {

        List<ChatMessage> groupChatMessages = chatMessageService.findChatMessagesForGroupChat(
                buyerId, courierId, sellerId, orderId);

        List<ChatMessageDTO> groupChatMessageDTOs = groupChatMessages.stream()
                .map(groupChatMessage -> modelMapper.map(groupChatMessage, ChatMessageDTO.class))
                .collect(Collectors.toList());

        return ResponseEntity.ok(groupChatMessageDTOs);
    }

    @PutMapping("/messages/markAsRead/{senderId}/{recipientId}")
    public void markAsRead(@PathVariable("senderId") long senderId,
                           @PathVariable("recipientId") long recipientId) {

        chatMessageService.markChatAsRead(senderId, recipientId);
    }
}
