package com.ozius.internship.project.repository;

import com.ozius.internship.project.entity.user.RequestStatus;
import com.ozius.internship.project.entity.user.SellerRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SellerRequestRepository extends JpaRepository<SellerRequest, Long> {

    Page<SellerRequest> findAll(Pageable pageable);
    SellerRequest findBySellerEmailAndStatus(String email, RequestStatus status);
}
