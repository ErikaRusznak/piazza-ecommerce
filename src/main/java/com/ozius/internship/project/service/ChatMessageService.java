//package com.ozius.internship.project.service;
//
//import com.ozius.internship.project.entity.chat.ChatMessage;
//import com.ozius.internship.project.entity.chat.ChatRoom;
//import com.ozius.internship.project.repository.ChatMessageRepository;
//import com.ozius.internship.project.repository.ChatRoomRepository;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDateTime;
//import java.util.Collections;
//import java.util.List;
//
//@Service
//public class ChatMessageService {
//
//    private final ChatMessageRepository chatMessageRepository;
//    private final ChatRoomService chatRoomService;
//    private final ChatRoomRepository chatRoomRepository;
//
//    public ChatMessageService(ChatMessageRepository chatMessageRepository, ChatRoomService chatRoomService, ChatRoomRepository chatRoomRepository) {
//        this.chatMessageRepository = chatMessageRepository;
//        this.chatRoomService = chatRoomService;
//        this.chatRoomRepository = chatRoomRepository;
//    }
//
//    public ChatMessage saveChatMessage(ChatRoom chatRoom, ChatMessage chatMessage) { // todo - craete a chatmessagedto that has a chatroomdto that has id s
//        String chatRoomCode = chatRoomService
//                .getChatRoomCode(chatRoom.getSender().getId(), chatRoom.getReceiver().getId(), true)
//                .orElseThrow();
//
//        ChatRoom cr = chatRoomRepository.findByChatRoomCode(chatRoomCode).get(0);
//        chatMessage.setChatRoom(cr);
//        chatMessageRepository.save(chatMessage);
//
//        return chatMessage;
//    }
//
//    public ChatMessage saveChatMessage(long senderId, long receiverId, String content, LocalDateTime date) { // todo - craete a chatmessagedto that has a chatroomdto that has id s
//        String chatRoomCode = chatRoomService
//                .getChatRoomCode(senderId, receiverId, true)
//                .orElseThrow();
//
//        ChatRoom cr = chatRoomRepository.findByChatRoomCode(chatRoomCode).get(0);
//        ChatMessage chatMessage = new ChatMessage(cr, content, date);
//        chatMessageRepository.save(chatMessage);
//
//        return chatMessage;
//    }
//
//    public List<ChatMessage> findChatMessages( long senderId, long receiverId) {
//       var chatRoomCode = chatRoomService.getChatRoomCode(senderId, receiverId, false).orElseThrow();
//        List<ChatMessage> chatMessages = chatMessageRepository.findAllByChatRoomCode(chatRoomCode);
//        return chatMessages.isEmpty() ? Collections.emptyList() : chatMessages;
//    }
//}
