package com.ozius.internship.project.service;

import com.ozius.internship.project.entity.chat.ChatRoom;
import com.ozius.internship.project.entity.user.UserAccount;
import com.ozius.internship.project.repository.ChatRoomRepository;
import com.ozius.internship.project.repository.UserAccountRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ChatRoomService {
    // TODO - change sender id from id into email!!!!

    private final ChatRoomRepository chatRoomRepository;
    private final UserAccountRepository userAccountRepository;

    public ChatRoomService(ChatRoomRepository chatRoomRepository, UserAccountRepository userAccountRepository) {
        this.chatRoomRepository = chatRoomRepository;
        this.userAccountRepository = userAccountRepository;
    }

    public Optional<String> getChatRoomCode(long senderId, long recipientId, boolean createNewRoomIfNotExists) {
        ChatRoom existingRoom = chatRoomRepository.findBySender_IdAndRecipient_Id(senderId, recipientId);

        if (existingRoom != null) {
            return Optional.of(existingRoom.getChatRoomCode());
        } else {
            if (createNewRoomIfNotExists) {
                String chatId = createChatCode(senderId, recipientId);
                return Optional.of(chatId);
            } else {
                return Optional.empty();
            }
        }
    }

    private String createChatCode(long senderId, long recipientId) {

        var chatCode = String.format("%d_%d", senderId, recipientId); // should be something like 2_3
        UserAccount sender = userAccountRepository.findById(senderId).orElseThrow();
        UserAccount recipient = userAccountRepository.findById(recipientId).orElseThrow();
        ChatRoom senderRecipient = new ChatRoom(chatCode, sender, recipient);
        ChatRoom recipientSender = new ChatRoom(chatCode, recipient, sender);
        chatRoomRepository.save(senderRecipient);
        chatRoomRepository.save(recipientSender);
        return chatCode;
    }
}
