//package com.ozius.internship.project.repository;
//
//import com.ozius.internship.project.entity.chat.ChatRoom;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//import java.util.Optional;
//
//@Repository
//public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
//
//    ChatRoom findBySender_IdAndReceiver_Id(long senderId, long receiverId);
//
//    List<ChatRoom> findByChatRoomCode(String chatRoomCode);
//
//}
