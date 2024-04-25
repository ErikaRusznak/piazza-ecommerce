package com.ozius.internship.project.repository;

import com.ozius.internship.project.entity.courier.Courier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CourierRepository extends JpaRepository<Courier, Long> {
    Courier findCouriersByAccount_Id(long id);
    Optional<Courier> findCouriersByAccount_Email(String email);
}
