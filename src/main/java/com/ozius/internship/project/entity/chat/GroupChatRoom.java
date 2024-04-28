package com.ozius.internship.project.entity.chat;

import com.ozius.internship.project.entity.BaseEntity;
import com.ozius.internship.project.entity.order.Order;
import com.ozius.internship.project.entity.user.UserAccount;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Table(name = GroupChatRoom.TABLE_NAME)
public class GroupChatRoom extends BaseEntity {

    public static final String TABLE_NAME = "GROUP_CHAT_ROOM";

    interface Columns{
        String GROUP_ROOM_CODE = "GROUP_ROOM_CODE";
        String COURIER_ID = "COURIER_ID";
        String SELLER_ID = "SELLER_ID";
        String BUYER_ID = "BUYER_ID";
        String ORDER_ID = "ORDER_ID";
    }

    @Getter
    @Column(name = Columns.GROUP_ROOM_CODE, nullable = false)
    private String groupRoomCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = Columns.ORDER_ID, nullable = false)
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = Columns.COURIER_ID, foreignKey = @ForeignKey(foreignKeyDefinition = "FOREIGN KEY (" + Columns.COURIER_ID + ") REFERENCES " + UserAccount.TABLE_NAME + " (" + BaseEntity.ID + ") ON DELETE SET NULL"))
    private UserAccount courier;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = Columns.SELLER_ID, foreignKey = @ForeignKey(foreignKeyDefinition = "FOREIGN KEY (" + Columns.SELLER_ID + ") REFERENCES " + UserAccount.TABLE_NAME + " (" + BaseEntity.ID + ") ON DELETE SET NULL"))
    private UserAccount seller;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = Columns.BUYER_ID, foreignKey = @ForeignKey(foreignKeyDefinition = "FOREIGN KEY (" + Columns.BUYER_ID + ") REFERENCES " + UserAccount.TABLE_NAME + " (" + BaseEntity.ID + ") ON DELETE SET NULL"))
    private UserAccount buyer;

    protected GroupChatRoom() {
    }

    public GroupChatRoom(String groupRoomCode, UserAccount buyer, UserAccount courier, UserAccount seller, Order order) {
        this.groupRoomCode = groupRoomCode;
        this.order = order;
        this.courier = courier;
        this.seller = seller;
        this.buyer = buyer;
    }

    public long getBuyerId() {
        return buyer.getId();
    }
    public String getBuyerFirstName() {
        return buyer.getFirstName();
    }
    public String getBuyerLastName() {
        return buyer.getLastName();
    }
    public String getBuyerEmail() {
        return buyer.getEmail();
    }

    public long getSellerId() {
        return seller.getId();
    }

    public String getSellerFirstName() {
        return seller.getFirstName();
    }
    public String getSellerLastName() {
        return seller.getLastName();
    }
    public String getSellerEmail() {
        return seller.getEmail();
    }

    public long getCourierId() {
        return courier.getId();
    }
    public String getCourierFirstName() {
        return courier.getFirstName();
    }
    public String getCourierLastName() {
        return courier.getLastName();
    }
    public String getCourierEmail() {
        return courier.getEmail();
    }

    public long getOrderId() {
        return order.getId();
    }
    public String getOrderNumber() {
        return order.getOrderNumber();
    }

    @Override
    public String toString() {
        return "GroupChatRoom{" +
                "groupRoomCode='" + groupRoomCode + '\'' +
                ", order=" + order +
                ", courier=" + courier +
                ", seller=" + seller +
                ", buyer=" + buyer +
                '}';
    }
}
