package com.ozius.internship.project.repository;

import com.ozius.internship.project.entity.courier.Courier;
import com.ozius.internship.project.entity.order.Order;
import com.ozius.internship.project.entity.order.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findBySellerEmailOrderByOrderDateDesc(String sellerEmail);

    @Query("SELECT o FROM Order o WHERE o.courier = :courier AND o.orderStatus IN :statuses")
    List<Order> findOrdersForCourierWithStatus(@Param("courier") Courier courier, @Param("statuses") List<OrderStatus> statuses);

}
