package com.ozius.internship.project.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Set;

@Entity
@Table(name = Order.TABLE_NAME)
public class Order extends BaseEntity{

    public static final String TABLE_NAME = "[ORDER]";

    interface Columns{
        String BUYER_EMAIL = "BUYER_EMAIL";
        String SELLER_ID = "SELLER_ID";
        String BUYER_ID = "BUYER_ID";
        String TELEPHONE = "TELEPHONE";
        String ORDER_STATUS = "ORDER_STATUS";
        String ORDER_DATE = "ORDER_DATE";
        String TOTAL_PRICE = "TOTAL_PRICE";
    }

    @Enumerated(EnumType.STRING)
    @Column(name = Columns.ORDER_STATUS, length = 15, nullable = false)
    private OrderStatus orderStatus;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride( name = "country", column = @Column(name = "COUNTRY")),
            @AttributeOverride( name = "state", column = @Column(name = "STATE")),
            @AttributeOverride( name = "city", column = @Column(name = "CITY")),
            @AttributeOverride( name = "addressLine1", column = @Column(name = "ADDRESS_LINE_1")),
            @AttributeOverride( name = "addressLine2", column = @Column(name = "ADDRESS_LINE_2")),
            @AttributeOverride( name = "zipCode", column = @Column(name = "ZIP_CODE"))
    })
    private Address address;

    @ManyToOne
    @JoinColumn(name = Columns.BUYER_ID)
    private Buyer buyer;

    @ManyToOne
    @JoinColumn(name = Columns.SELLER_ID)
    private Seller seller;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = OrderItem.Columns.ORDER_ID, nullable = false)
    private Set<OrderItem> orderItems;

    @Column(name = Columns.BUYER_EMAIL, nullable = false)
    private String buyerEmail;

    @Column(name = Columns.ORDER_DATE, nullable = false)
    private LocalDateTime orderDate;

    @Column(name = Columns.TELEPHONE, nullable = false, length = 10)
    private String telephone;

    @Column(name = Columns.TOTAL_PRICE, nullable = false)
    private float totalPrice;

    protected Order() {
    }

    public Order(Address address, Buyer buyer, Seller seller, String telephone, Set<OrderItem> orderItems) {
        this.orderStatus = OrderStatus.RECEIVED;

        this.address = address;

        this.buyer = buyer;
        this.seller = seller;

        this.orderItems = orderItems;

        this.buyerEmail = buyer.getAccount().getEmail();
        this.orderDate = LocalDateTime.now();

        this.telephone = telephone;

        this.totalPrice = (float) orderItems.stream().mapToDouble(OrderItem::getPrice).sum();
    }

    public OrderStatus getOrderStatus() {
        return orderStatus;
    }

    public Address getAddress() {
        return address;
    }

    public Buyer getBuyerInfo() {
        return buyer;
    }

    public Seller getSellerInfo() {
        return seller;
    }

    public Set<OrderItem> getOrderItems() {
        return Collections.unmodifiableSet(orderItems);
    }

    public String getBuyerEmail() {
        return buyerEmail;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public String getTelephone() {
        return telephone;
    }

    public float getTotalPrice() {
        return totalPrice;
    }
}
