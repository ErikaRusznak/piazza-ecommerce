package com.ozius.internship.project.repository;

import com.ozius.internship.project.entity.chat.ChatRoom;
import com.ozius.internship.project.entity.chat.GroupChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface GroupChatRoomRepository extends JpaRepository<GroupChatRoom, Long> {

    GroupChatRoom findByBuyer_IdAndCourier_IdAndSeller_IdAndOrder_Id(long buyerId, long courierId, long sellerId, long orderId);

    @Query("SELECT gcr FROM GroupChatRoom gcr WHERE gcr.groupRoomCode = :groupRoomCode " +
            "AND gcr.buyer.id = :buyerId AND gcr.courier.id = :courierId " +
            "AND gcr.seller.id = :sellerId AND gcr.order.id = :orderId")
    Optional<GroupChatRoom> findByChatRoomCode(long buyerId, long courierId, long sellerId, long orderId, String groupRoomCode);

    @Query("SELECT gcr FROM GroupChatRoom gcr WHERE gcr.courier.email = :courierEmail")
    List<GroupChatRoom> findAllByCourierEmail(String courierEmail);

    @Query("SELECT gcr FROM GroupChatRoom gcr WHERE gcr.buyer.email = :buyerEmail")
    List<GroupChatRoom> findAllByBuyerEmail(String buyerEmail);

    @Query("SELECT gcr FROM GroupChatRoom gcr WHERE gcr.seller.email = :sellerEmail")
    List<GroupChatRoom> findAllBySellerEmail(String sellerEmail);
}
