package com.ozius.internship.project.entity.order;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ozius.internship.project.entity.Address;
import com.ozius.internship.project.entity.BaseEntity;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Collections;
import java.util.HashSet;
import java.util.Random;
import java.util.Set;

@Entity
@Table(name = FullOrder.TABLE_NAME)
public class FullOrder extends BaseEntity {

    public static final String TABLE_NAME = "full_order";

    interface Columns {
        String PUBLISH_DATE = "PUBLISH_DATE";
        String BUYER_EMAIL = "BUYER_EMAIL";
        String TOTAL_PRICE = "TOTAL_PRICE";
        String ORDER_NUMBER = "ORDER_NUMBER";
    }

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @JoinColumn(name = Order.Columns.ORDER_ID, foreignKey = @ForeignKey(foreignKeyDefinition =
            "FOREIGN KEY (" + Order.Columns.ORDER_ID + ") REFERENCES " + FullOrder.TABLE_NAME + " (" + BaseEntity.ID + ") ON DELETE CASCADE"))
    private Set<Order> orders;

    @Column(name = Columns.PUBLISH_DATE, nullable = false, updatable = false)
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate publishDate;

    @Column(name = Columns.BUYER_EMAIL, nullable = false)
    private String buyerEmail;

    @Column(name = Columns.TOTAL_PRICE, nullable = false)
    private float totalPrice;

    @Column(name = Columns.ORDER_NUMBER, nullable = false)
    private String orderNumber;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "country", column = @Column(name = Order.Columns.COUNTRY, nullable = false)),
            @AttributeOverride(name = "state", column = @Column(name = Order.Columns.STATE, nullable = false)),
            @AttributeOverride(name = "city", column = @Column(name = Order.Columns.CITY, nullable = false)),
            @AttributeOverride(name = "addressLine1", column = @Column(name = Order.Columns.ADDRESS_LINE_1, nullable = false)),
            @AttributeOverride(name = "addressLine2", column = @Column(name = Order.Columns.ADDRESS_LINE_2)),
            @AttributeOverride(name = "zipCode", column = @Column(name = Order.Columns.ZIP_CODE, length = 6, nullable = false))
    })
    private Address shippingAddress;

    protected FullOrder() {

    }

    public FullOrder(String buyerEmail, Address shippingAddress) {
        this.publishDate = LocalDate.now();
        this.orders = new HashSet<>();
        this.buyerEmail = buyerEmail;
        this.shippingAddress = shippingAddress;
        this.totalPrice = 0;
        this.orderNumber = generateRandomOrderNumber();
    }

    public void addOrder(Order order) {
        orders.add(order);
    }

    public Set<Order> getOrders() {
        return Collections.unmodifiableSet(orders);
    }

    public LocalDate getPublishDate() {
        return publishDate;
    }

    public String getBuyerEmail() {
        return buyerEmail;
    }

    public float getTotalPrice() {
        return totalPrice;
    }

    public Address getShippingAddress() {
        return shippingAddress;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setTotalPrice(float totalPrice) {
        this.totalPrice = totalPrice;
    }

    public static String generateRandomOrderNumber() {
        int randomPart = new Random().nextInt(900000) + 100000;
        return String.format("%06d", randomPart);
    }

    public void setTotalPrice() {
        float total = 0f;
        for(Order o : getOrders()) {
            total += o.getTotalPrice();
        }
        setTotalPrice(total);
    }

    @Override
    public String toString() {
        return "FullOrder{" +
                "publishDate=" + publishDate +
                ", buyerEmail='" + buyerEmail + '\'' +
                ", totalPrice=" + totalPrice +
                ", orderNumber='" + orderNumber + '\'' +
                ", shippingAddress=" + shippingAddress +
                '}';
    }
}
