package com.ozius.internship.project.controller;

import com.ozius.internship.project.dto.ChatMessageDTO;
import com.ozius.internship.project.dto.ChatNotificationDTO;
import com.ozius.internship.project.dto.GroupChatNotificationDTO;
import com.ozius.internship.project.entity.chat.ChatMessage;
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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class ChatController {

    private final ChatMessageService chatMessageService;
    private final SimpMessagingTemplate messagingTemplate;
    private final ModelMapper modelMapper;

    public ChatController(ChatMessageService chatMessageService, SimpMessagingTemplate messagingTemplate, ModelMapper modelMapper) {
        this.chatMessageService = chatMessageService;
        this.messagingTemplate = messagingTemplate;
        this.modelMapper = modelMapper;
    }

    @MessageMapping("/chat") // app/chat
    public void processMessage(@Payload ChatMessageDTO chatMessageDTO) {

        ChatMessage savedMessage = chatMessageService.saveChatMessage(
                chatMessageDTO.getSenderId(),
                chatMessageDTO.getRecipientId(),
                chatMessageDTO.getContent());

        ChatNotificationDTO cn = new ChatNotificationDTO(
                savedMessage.getId(),
                savedMessage.getContent(),
                savedMessage.getSenderId(),
                savedMessage.getRecipientId()
                );
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
                chatMessageDTO.getContent(),
                chatMessageDTO.getSenderRole()
                );
        List<Long> participantIds = new ArrayList<>(Arrays.asList(
                savedMessage.getBuyerId(),
                savedMessage.getCourierId(),
                savedMessage.getSellerId()
        ));

        switch (chatMessageDTO.getSenderRole()) {
            case SELLER:
                participantIds.remove(savedMessage.getSellerId()); break;
            case COURIER:
                participantIds.remove(savedMessage.getCourierId()); break;
            case CLIENT:
                participantIds.remove(savedMessage.getBuyerId()); break;
        }

        for (Long participantId : participantIds) {
            GroupChatNotificationDTO gcn = new GroupChatNotificationDTO(
                    savedMessage.getId(),
                    savedMessage.getContent(),
                    savedMessage.getBuyerId(),
                    savedMessage.getCourierId(),
                    savedMessage.getOrderId(),
                    savedMessage.getSellerId(),
                    savedMessage.getSenderRole()
            );
            messagingTemplate.convertAndSendToUser(
                    String.valueOf(participantId),
                    "/queue/group-messages",
                    gcn);
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
