package com.ozius.internship.project.repository;

import com.ozius.internship.project.entity.order.FullOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FullOrderRepository extends JpaRepository<FullOrder, Long> {

    @Query("SELECT o FROM FullOrder o WHERE o.buyerEmail = :buyerEmail ORDER BY o.publishDate DESC")
    List<FullOrder> findAllByBuyerEmail(@Param("buyerEmail") String buyerEmail);

}
