package com.ozius.internship.project.repository;

import com.ozius.internship.project.entity.order.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findBySellerEmailOrderByOrderDateDesc(String sellerEmail);
}
