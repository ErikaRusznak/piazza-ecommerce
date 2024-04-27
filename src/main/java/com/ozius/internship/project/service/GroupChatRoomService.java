package com.ozius.internship.project.service;

import com.ozius.internship.project.entity.chat.GroupChatRoom;
import com.ozius.internship.project.entity.order.Order;
import com.ozius.internship.project.entity.user.UserAccount;
import com.ozius.internship.project.repository.GroupChatRoomRepository;
import com.ozius.internship.project.repository.OrderRepository;
import com.ozius.internship.project.repository.UserAccountRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GroupChatRoomService {

    private final GroupChatRoomRepository groupChatRoomRepository;
    private final UserAccountRepository userAccountRepository;
    private final OrderRepository orderRepository;

    public GroupChatRoomService(GroupChatRoomRepository groupChatRoomRepository, UserAccountRepository userAccountRepository, OrderRepository orderRepository) {
        this.groupChatRoomRepository = groupChatRoomRepository;
        this.userAccountRepository = userAccountRepository;
        this.orderRepository = orderRepository;
    }

    public Optional<String> getGroupChatRoomCode(long buyerId, long courierId, long sellerId, long orderId, boolean createNewRoomIfNotExists) {
        GroupChatRoom existingRoom = groupChatRoomRepository.findByBuyer_IdAndCourier_IdAndSeller_IdAndOrder_Id(buyerId, courierId, sellerId, orderId);

        if(existingRoom != null) {
            return Optional.of(existingRoom.getGroupRoomCode());
        } else {
            if(createNewRoomIfNotExists) {
                String chatId = createGroupChatCode(buyerId, courierId, sellerId, orderId);
                return Optional.of(chatId);
            } else {
                return Optional.empty();
            }
        }
    }

    private String createGroupChatCode(long buyerId, long courierId, long sellerId, long orderId) {
        var groupChatCode = String.format("%d_%d_%d_%d", buyerId, courierId, sellerId, orderId);

        UserAccount buyer = userAccountRepository.findById(buyerId).orElseThrow();
        UserAccount courier = userAccountRepository.findById(courierId).orElseThrow();
        UserAccount seller = userAccountRepository.findById(sellerId).orElseThrow();
        Order order = orderRepository.findById(orderId).orElseThrow();

        GroupChatRoom groupChatRoom = new GroupChatRoom(groupChatCode, buyer, courier, seller, order);
        groupChatRoomRepository.save(groupChatRoom);
        return groupChatCode;
    }
}
