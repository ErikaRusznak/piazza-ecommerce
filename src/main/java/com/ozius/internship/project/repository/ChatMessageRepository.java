package com.ozius.internship.project.repository;

import com.ozius.internship.project.entity.chat.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    @Query("SELECT cm FROM ChatMessage cm WHERE cm.chatRoom.chatRoomCode = :chatRoomCode")
    List<ChatMessage> findAllByChatRoomCode(@Param("chatRoomCode") String chatRoomCode);
}
