package com.ozius.internship.project.repository;

import com.ozius.internship.project.entity.courier.Courier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CourierRepository extends JpaRepository<Courier, Long> {
    Courier findCourierByAccount_Id(long id);
    Optional<Courier> findCourierByAccount_Email(String email);
}
