package com.ozius.internship.project.entity.order;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ozius.internship.project.entity.BaseEntity;
import com.ozius.internship.project.entity.seller.Review;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = FullOrder.TABLE_NAME)
public class FullOrder extends BaseEntity {

    public static final String TABLE_NAME = "full_order";

    interface Columns {
        String FULL_ORDER_ID = "FULL_ORDER_ID";
        String PUBLISH_DATE = "PUBLISH_DATE";
    }

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @JoinColumn(name = Order.Columns.ORDER_ID, foreignKey = @ForeignKey(foreignKeyDefinition =
            "FOREIGN KEY (" + Order.Columns.ORDER_ID + ") REFERENCES " + FullOrder.TABLE_NAME + " (" + BaseEntity.ID + ") ON DELETE CASCADE"))
    private Set<Order> orders;

    @Column(name = Columns.PUBLISH_DATE, nullable = false, updatable = false)
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate publishDate;

    public FullOrder() {
        this.publishDate = LocalDate.now();
        this.orders = new HashSet<>();
    }

    public void addOrder(Order order) {
        orders.add(order);
        System.out.println("added order");
    }

    public Set<Order> getOrders() {
        return Collections.unmodifiableSet(orders);
    }

    public LocalDate getPublishDate() {
        return publishDate;
    }

    @Override
    public String toString() {
        return "FullOrder{" +
                "publishDate=" + publishDate +
                '}';
    }
}
