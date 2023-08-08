package com.ozius.internship.project.repository;

import com.ozius.internship.project.entity.cart.CartItem;
import com.ozius.internship.project.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    @Query("SELECT ci FROM CartItem ci WHERE ci.product.name = :productName")
    CartItem findByProductName(@Param("productName") String productName);

    CartItem findByProduct(Product product);
}
