package com.ozius.internship.project.repository;

import com.ozius.internship.project.entity.chat.ChatNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatNotificationRepository extends JpaRepository<ChatNotification, Long> {
}
