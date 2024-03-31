package com.ozius.internship.project.repository;

import com.ozius.internship.project.entity.chat.ChatRoom;
import com.ozius.internship.project.entity.user.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    ChatRoom findBySender_IdAndReceiver_Id(long senderId, long receiverId);

//    List<ChatRoom> findAllByChatRoomCode(String chatRoomCode);

    @Query("SELECT cr FROM ChatRoom cr WHERE cr.chatRoomCode = :chatRoomCode " +
            "AND cr.sender.id = :senderId AND cr.receiver.id = :receiverId")
    Optional<ChatRoom> findByChatRoomCodeAndSenderAndReceiver(long senderId, long receiverId, String chatRoomCode);

}
