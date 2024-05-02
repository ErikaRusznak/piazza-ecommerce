package com.ozius.internship.project.repository;

import com.ozius.internship.project.entity.product.Product;
import com.ozius.internship.project.entity.review.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT r FROM Review r WHERE r.product.id = :productId")
    List<Review> getReviewsForProduct(@Param("productId") long productId);

    @Query("SELECT p FROM Product p JOIN p.seller s WHERE s.alias = :sellerAlias")
    List<Product> getAllProductsForSeller(@Param("sellerAlias") String sellerAlias);

}
