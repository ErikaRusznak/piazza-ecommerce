package com.ozius.internship.project.repository;

import com.ozius.internship.project.entity.chat.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    ChatRoom findBySender_IdAndRecipient_Id(long senderId, long recipientId);

    @Query("SELECT cr FROM ChatRoom cr WHERE cr.chatRoomCode = :chatRoomCode " +
            "AND cr.sender.id = :senderId AND cr.recipient.id = :recipientId")
    Optional<ChatRoom> findByChatRoomCodeAndSenderAndRecipient(long senderId, long recipientId, String chatRoomCode);

}
