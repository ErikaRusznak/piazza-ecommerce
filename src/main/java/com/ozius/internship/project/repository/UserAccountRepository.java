package com.ozius.internship.project.repository;

import com.ozius.internship.project.entity.user.UserAccount;
import com.ozius.internship.project.entity.user.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {
    UserAccount findByEmail(String username);

    List<UserAccount> findAllByUserRole(UserRole userRole);
}
