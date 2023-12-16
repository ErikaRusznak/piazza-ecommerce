package com.ozius.internship.project.repository;

import com.ozius.internship.project.entity.order.FullOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FullOrderRepository extends JpaRepository<FullOrder, Long> {
}
