package com.ozius.internship.project.repository;

import com.ozius.internship.project.entity.courier.Courier;
import com.ozius.internship.project.entity.order.Order;
import com.ozius.internship.project.entity.order.OrderStatus;
import com.ozius.internship.project.entity.product.Product;
import com.ozius.internship.project.entity.seller.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query("SELECT r FROM Review r WHERE r.product = :product")
    List<Review> findByProduct(@Param("product") Product product);

}
